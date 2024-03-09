import {baseUrl} from "../apiConstants.js";
import {getFormElements} from "../helper/formDataParser.js";

export async function allPosts() {
    try {
        const env = await import.meta.env;
        console.log(import.meta.env.VITE_BASE_URL);
        console.log(baseUrl);
        const posts = await fetch(`${baseUrl}/posts/viewAll`);
        const postsRes = await posts.json();
        return postsRes.posts;
    } catch (e) {
        throw new Error(e);
    }
}

export async function createPost(data) {
    try {
        const token = localStorage.getItem('token');
        const newPost = await fetch(`${baseUrl}/posts/create`,
            {
                headers:
                    {
                        'Content-Type': 'application/json',
                        'authorization': 'bearer ' + token,
                    },
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(getFormElements(data)),
            });
        return await newPost.json();
    } catch (e) {
        throw new Error(e);
    }
}

export async function updatePost(data, id) {
    try {
        const token = localStorage.getItem('token');
        const newPost = await fetch(`${baseUrl}/posts/update/${id}`,
            {
                headers:
                    {
                        'Content-Type': 'application/json',
                        'authorization': 'bearer ' + token,
                    },
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(getFormElements(data)),
            });
        return await newPost.json();
    } catch (e) {
        throw new Error(e);
    }
}

export async function deletePost(id) {
    try {
        const token = localStorage.getItem('token');
        const deletePostId = await fetch(`${baseUrl}/posts/delete/${id}`,
            {
                headers:
                    {
                        'Content-Type': 'application/json',
                        'authorization': 'bearer ' + token,
                    },
                method: 'POST',
                mode: 'cors',
            });
        return await deletePostId.json();
    } catch (e) {
        throw new Error(e);
    }
}

export async function getPost(id){
    try {
        const token = localStorage.getItem('token');
        const newPost = await fetch(`${baseUrl}/posts/view/${id}`,
            {
                headers:
                    {
                        'Content-Type': 'application/json',
                        'authorization': 'bearer ' + token,
                    },
                method: 'GET',
                mode: 'cors',
            });
        return await newPost.json();
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
}