import axiosApi from "../Plugins/axios"


export function usePost () {

    const deletePost = (postId) => {
        return axiosApi.delete(
            `/post/${postId}`,
            { headers: { Authorization: sessionStorage.getItem('postsapp-login-token') } }
        )
    }

    return { deletePost }
}
