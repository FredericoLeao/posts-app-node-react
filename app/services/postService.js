const Post = require('../models/post');
const PostRevision = require('../models/postrevision');
const db = require('../infra/database');
const fs = require('node:fs')

exports.create = async (createData) => {
    let post = await Post(db).create(createData);
    if (!post)
        return { error: true, message: 'Falha ao criar Post' }
    post = JSON.parse(JSON.stringify(post));
    let postRevision = await PostRevision(db).create(
        {
            postId: post.id,
            title: createData.title,
            content: createData.content,
        }
    );
    if (!postRevision)
        return { error: true, message: 'Falha ao criar Post' };
    postRevision = JSON.parse(JSON.stringify(postRevision));

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
        // console.log('- get type from buffer -');
        // console.log(fileTypeFromBuffer(base64Data));
        const fileName = `post_${post.id}_${postRevision.id}.png`
        fs.writeFile(
            `./storage/images/posts/${fileName}`,
            base64Data,
            'base64',
            function(err) {
                console.log('erro ao salvar arquivo!')
                console.log(err);
            }
        );
        // TODO: salvar nome do arquivo na tabela
    }

    return {
        ...post,
        title: postRevision.title,
        content: postRevision.content,
        revisionId: postRevision.id,
        revisionCreatedAt: postRevision.createdAt,
    }
};
