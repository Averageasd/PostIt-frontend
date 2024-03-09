import './App.css'
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import {Home} from "./Home.jsx";
import {useEffect, useState} from "react";
import {allPosts, createPost, deletePost, updatePost} from "./api/posts.js";
import {login} from "./api/login.js";
import {Login} from "./Login.jsx";
import {Signup} from "./Signup.jsx";
import {CreateBlog} from "./CreateBlog.jsx";
import {logout} from "./api/logout.js";
import {Logout} from "./Logout.jsx";
import {PostDetail} from "./PostDetail.jsx";
import {EditBlog} from "./EditBlog.jsx";
import {DeleteBlog} from "./DeleteBlog.jsx";
import {ErrorPage} from "./ErrorPage.jsx";
import {createComment, deleteComment, editComment, getComment, updateComment} from "./api/comments.js";
import {signup} from "./api/signup.js";
import {AiFillNotification} from "react-icons/ai";
import {Nav} from "./Nav.jsx";

function App() {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);
    const [loggedInNav, setLoggedInNav] = useState(false);
    const [token, setToken] = useState(null);
    const [canFetchAllPost, setCanFetchAllPost] = useState(true);
    const [selectedPost, setSelectedPost] = useState(null);
    const [editingComment, setEditingComment] = useState(null);
    const [typingComments, setTypingComments] = useState({});
    const [errorMsg, setErrorMsg] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPosts() {
            if (canFetchAllPost) {
                const fetchedPosts = await allPosts();
                const curPosts = [];
                for (const post of fetchedPosts) {
                    curPosts.push({
                        id: post._id,
                        title: post.title,
                        text: post.text,
                        date: post.date,
                        comments: post.comments,
                        user: post.user,
                    })
                    if (selectedPost && selectedPost.id === post._id) {
                        setSelectedPost({
                            id: post._id,
                            title: post.title,
                            text: post.text,
                            date: post.date,
                            comments: post.comments,
                            user: post.user,
                        })
                        localStorage.setItem('selectedPost', JSON.stringify({
                            id: post._id,
                            title: post.title,
                            text: post.text,
                            date: post.date,
                            comments: post.comments,
                            user: post.user,
                        }));
                    }
                }
                setPosts(curPosts);
                setCanFetchAllPost(false);
            }
        }

        fetchPosts();
        return () => {
            setCanFetchAllPost(false);
        }
    }, [canFetchAllPost]);

    useEffect(() => {
        console.log('call this useEffect')
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
            setLoggedInNav(true);
        }
        if (localStorage.getItem("user")) {
            setUser(JSON.parse(localStorage.getItem("user")));
        }

        if (localStorage.getItem('selectedPost')) {
            setSelectedPost(JSON.parse(localStorage.getItem('selectedPost')));
        }
    }, []);

    async function loginHandler(e) {
        e.preventDefault();
        const auth = await login(e);
        if (auth.status === 200) {
            setUser(auth.user);
            setToken(auth.token);
            navigate('home');
            setLoggedInNav(true);
            localStorage.setItem('user', JSON.stringify(auth.user));
            localStorage.setItem('token', auth.token);
            setErrorMsg(null);
        } else {
            setErrorMsg(auth.msg);
            navigate('error');
        }
    }

    async function signupHandler(e) {
        e.preventDefault();
        const newUser = await signup(e);
        if (newUser.status === 200) {
            navigate('login');
            setErrorMsg(null);
        } else {
            setErrorMsg(newUser.msg);
            navigate('error');
        }
    }

    async function createPostHandler(e) {
        e.preventDefault();
        const newPost = await createPost(e);
        if (newPost.status === 200) {
            setCanFetchAllPost(true);
            navigate('home');
            setErrorMsg(null);
        } else {
            setErrorMsg(newPost.msg);
            navigate('error');
        }
    }

    async function deletePostHandler(e, id) {
        e.stopPropagation();
        const deletedPost = await deletePost(id);
        if (deletedPost.status === 200) {
            if (selectedPost && deletePost.postId === selectedPost.id) {
                setSelectedPost(null);
                localStorage.removeItem('selectedPost');
            }
            setCanFetchAllPost(true);
            navigate('home');
            setErrorMsg(null);
        } else {
            setErrorMsg(deletedPost.msg);
            navigate('error');
        }

    }

    async function logoutHandler() {
        await logout();
        setUser(null);
        setToken(null);
        setLoggedInNav(false);
        localStorage.removeItem('user');
        setSelectedPost(null);
        setErrorMsg(null);
        localStorage.removeItem('token');
        navigate('login');
    }

    async function viewPostHandler(id) {
        setErrorMsg(null);
        setSelectedPost(getClickedPost(id));
        if (!typingComments[id]) {
            const updatedTypingComments = {...typingComments};
            updatedTypingComments[id] = "";
            setTypingComments(updatedTypingComments);
        }
        localStorage.setItem('selectedPost', JSON.stringify(getClickedPost(id)));
        navigate('post-detail');
    }

    function getClickedPost(id) {
        console.log(posts.find((post) => post.id === id));
        return posts.find((post) => post.id === id);
    }

    async function navigateToPostEditPage(e, id) {
        e.stopPropagation();
        setSelectedPost(getClickedPost(id));
        setErrorMsg(null);
        localStorage.setItem('selectedPost', JSON.stringify(getClickedPost(id)));
    }

    async function editPostHandler(e, id) {
        e.preventDefault();
        await updatePost(e, id);
        setErrorMsg(null);
        setCanFetchAllPost(true);
        navigate('post-detail');
    }

    async function createCommentHandler(e, postId) {
        e.preventDefault();
        const newComment = await createComment(e, postId);
        if (newComment.status === 200) {
            typingComments[postId] = "";
            setCanFetchAllPost(true);
            setErrorMsg(null);
        } else {
            setErrorMsg(newComment.msg);
            navigate('error');
        }
    }

    async function setEditingCommentHandler(id) {
        const comment = await getComment(id);
        if (comment.status === 200) {
            setEditingComment(comment.comment);
            setErrorMsg(null);
        } else {
            setErrorMsg(comment.msg);
            navigate('error');
        }
    }

    function cancelEditingCommentHandler() {
        if (editingComment) {
            setEditingComment(null);
        }
    }

    async function editCommentHandler(e, commentId) {
        const updatedComment = await updateComment(e, commentId);
        if (updatedComment.status === 200) {
            setEditingComment(null);
            setErrorMsg(null);
            setCanFetchAllPost(true);
        } else {
            setErrorMsg(updatedComment.msg);
            navigate('error');
        }
    }

    async function deleteCommentHandler(postId, commentId) {
        const deletedComment = await deleteComment(postId, commentId);
        if (deletedComment.status === 200) {
            setEditingComment(null);
            setErrorMsg(null);
            setCanFetchAllPost(true);
        } else {
            setErrorMsg(deletedComment.msg);
            navigate('error');
        }
    }

    return (
        <>
            <header>
                <Nav loggedInNav={loggedInNav} logoutHandler={logoutHandler} user={user}/>
            </header>

            <main>
                <Routes>
                    <Route path="home" element={<Home user={user} posts={posts} viewPostHandler={viewPostHandler}
                                                      navigateToPostEditPage={navigateToPostEditPage}
                                                      deletePostHandler={deletePostHandler}/>}/>
                    <Route path="" index element={<Home user={user} posts={posts} viewPostHandler={viewPostHandler}
                                                        navigateToPostEditPage={navigateToPostEditPage}/>}></Route>
                    <Route path="error" element={<ErrorPage errorMsg={errorMsg}></ErrorPage>}/>
                    <Route path="signup" element={<Signup signupHandler={signupHandler}/>}/>
                    <Route path="login" element={<Login loginHandler={loginHandler}/>}/>
                    <Route path="create-blog" element={<CreateBlog createPostHandler={createPostHandler}/>}/>
                    <Route path="edit-blog"
                           element={<EditBlog selectedPost={selectedPost} editPostHandler={editPostHandler}/>}/>
                    <Route path="/home/edit-blog"
                           element={<EditBlog selectedPost={selectedPost} editPostHandler={editPostHandler}/>}/>
                    <Route path="/post-detail/edit-blog"
                           element={<EditBlog selectedPost={selectedPost} editPostHandler={editPostHandler}/>}/>
                    <Route path="delete-blog" element={<DeleteBlog/>}/>
                    <Route path="home/delete-blog" element={<DeleteBlog/>}/>
                    <Route path="post-detail/delete-blog" element={<DeleteBlog/>}/>
                    <Route path="logout" element={<Logout/>}/>
                    <Route path="post-detail"
                           element={<PostDetail
                               selectedPost={selectedPost}
                               user={user}
                               createCommentHandler={createCommentHandler}
                               editCommentHandler={editCommentHandler}
                               deleteCommentHandler={deleteCommentHandler}
                               setEditingCommentHandler={setEditingCommentHandler}
                               cancelEditingCommentHandler={cancelEditingCommentHandler}
                               editingComment={editingComment}
                               setTypingComments={setTypingComments}
                               typingComments={typingComments}
                               navigateToPostEditPage={navigateToPostEditPage}
                               deletePostHandler={deletePostHandler}
                           />}
                    />
                </Routes>
            </main>
        </>
    )
}

export default App
