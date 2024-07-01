const Post = require('../models/post');
const PostRevision = require('../models/postrevision');
const PostCommentService = require('./postCommentService');
const db = require('../infra/database');
const fs = require('node:fs')
const ft = require("file-type")

exports.create = async (createData) => {
    let post = await Post(db).create(createData);
    if (!post)
        return { error: true, message: 'Falha ao criar Post' }
    post = JSON.parse(JSON.stringify(post));
    const postRevision = await saveRevision(createData, post.id);
    return {
        ...post,
        title: postRevision.title,
        content: postRevision.content,
        revisionId: postRevision.id,
        revisionCreatedAt: postRevision.createdAt,
    }
};

exports.update = async (updateData) => {
    const post = await Post(db).findOne({ where: { id: updateData.id }})
    if (!post)
        return { error: true, message: 'Post não encontrado' };
    const postRevision = await saveRevision(updateData, post.id);
    return JSON.stringify({ ...post, ...postRevision})
}

exports.delete = async (deleteData) => {
    const post = await Post(db).findByPk(deleteData.postId);
    if (post.userId != deleteData.userId)
        return {
            error: true,
            message: 'Sem permissão',
            status: 403,
        }
    await post.destroy();
    return { success: true }
}

exports.get = async (postId, countView = false) => {
    const post = await Post(db).findOne({ where: { id: postId }});
    const postRevision = await post.lastRevision;
    if (!postRevision)
        return { error: true, message: 'Post não encontrado' }
    if (countView) {
        if (!post.viewCount) post.viewCount = 0;
        post.viewCount = post.viewCount+1;
        await post.save();
    }

    return {
        ...JSON.parse(JSON.stringify(post)),
        title: postRevision.title,
        content: postRevision.content,
    }
}

const saveRevision = async (createData, postId) => {
    const postRevisionModel = await PostRevision(db).create(
        {
            postId: postId,
            title: createData.title,
            content: createData.content,
        }
    );
    if (!postRevisionModel)
        return { error: true, message: 'Falha ao criar Post' };
    const postRevision = JSON.parse(JSON.stringify(postRevisionModel));

    if (createData.image) {
        // var base64Data = createData.image.replace(/^data:image\/png;base64,/, "");
        var base64Data = createData.image;
        try {
            if (!fs.existsSync("./storage"))
                fs.mkdirSync("./storage");
            if (!fs.existsSync("./storage/images"))
                fs.mkdirSync("./storage/images");
            if (!fs.existsSync("./storage/images/posts"))
                fs.mkdirSync("./storage/images/posts");
        } catch (err) {
            console.log('erro ao tentar criar pasta de imagens:')
            console.log(err)
        }

        const fileName = `post_${postId}_${postRevision.id}`
        const filePathName = `./storage/images/posts/${fileName}`
        fs.writeFile(
            filePathName,
            base64Data,
            'base64',
            async function(err) {
                if (err) {
                    console.log('erro ao salvar arquivo!')
                    console.log(err);
                    return;
                }
                let mime = await ft.fromFile(filePathName);
                fs.renameSync(filePathName, `${filePathName}.${mime.ext}`);
                postRevisionModel.image = `${fileName}.${mime.ext}`;
                await postRevisionModel.save();
            }
        );
    }
    return postRevisionModel;
}

exports.like = async (postId) => {
    const post = await Post(db).findByPk(postId);
    if (!post)
        return { error: true, message: 'Post não encontrado' }
    post.likeCount = post.likeCount+1;
    await post.save();
    return post;
}

exports.dislike = async (postId) => {
    const post = await Post(db).findByPk(postId);
    if (!post)
        return { error: true, message: 'Post não encontrado' }
    post.dislikeCount = post.dislikeCount+1;
    await post.save();
    return post;
}

exports.report = async () => {
    const posts = await Post(db).findAll();
    return Promise.all(posts.map(async (p) => {
            const _p = await p.get();
            const postRevision = await _p.lastRevision;
            const postComments = await PostCommentService.getByPost(p.id);
            return {
                ..._p,
                title: postRevision.title,
                content: postRevision.content,
                commentCount: postComments.length,
            }
        })
    );
}

exports.getByUser = async (userId) => {
    const posts = await Post(db).findAll({
        where: { userId: userId },
        order: [ ['createdAt', 'DESC'] ],
    });
    return Promise.all(posts.map(async (p) => {
        const _p = await p.get();
        const postRevision = await _p.lastRevision;
        const postComments = await PostCommentService.getByPost(p.id);
        return {
            ..._p,
            countRevision: await _p.countRevision,
            title: postRevision.title,
            content: postRevision.content,
            commentCount: postComments.length,
        }
    }));
}