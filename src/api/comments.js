import {baseUrl} from "../apiConstants.js";
import {getFormElements} from "../helper/formDataParser.js";


export async function createComment(data, postId) {
    try {

        const token = localStorage.getItem('token');
        const newComment = await fetch(`${baseUrl}/comments/create/${postId}`,
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
        return await newComment.json();
    } catch (e) {
        throw new Error(e);
    }
}

export async function editComment(data, commentId){
    try {
        const token = localStorage.getItem('token');
        const updatedComment = await fetch(`${baseUrl}/comments/update/${commentId}`,
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
        return await updatedComment.json();
    } catch (e) {
        throw new Error(e);
    }
}

export async function getComment(commentId){
    try {
        const token = localStorage.getItem('token');
        const updatedComment = await fetch(`${baseUrl}/comments/view/${commentId}`,
            {
                headers:
                    {
                        'Content-Type': 'application/json',
                        'authorization': 'bearer ' + token,
                    },
                method: 'GET',
                mode: 'cors',
            });
        return await updatedComment.json();
    } catch (e) {
        throw new Error(e);
    }
}

export async function updateComment(data, commentId){
    try {
        const token = localStorage.getItem('token');
        const updatedComment = await fetch(`${baseUrl}/comments/update/${commentId}`,
            {
                headers:
                    {
                        'Content-Type': 'application/json',
                        'authorization': 'bearer ' + token,
                    },
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(getFormElements(data))
            });
        return await updatedComment.json();
    } catch (e) {
        throw new Error(e);
    }
}

export async function deleteComment(postId, commentId){
    try {
        const token = localStorage.getItem('token');
        const updatedComment = await fetch(`${baseUrl}/comments/delete/${postId}/comment/${commentId}`,
            {
                headers:
                    {
                        'Content-Type': 'application/json',
                        'authorization': 'bearer ' + token,
                    },
                method: 'POST',
                mode: 'cors',
            });
        return await updatedComment.json();
    } catch (e) {
        throw new Error(e);
    }
}