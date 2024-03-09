import {Link} from "react-router-dom";
import {returnTimeDiff} from "./helper/dateDiffCal.js";
import {IconEdit, IconMessage2, IconTrash} from "@tabler/icons-react";
import {memo} from "react";

export function Home({user, posts, viewPostHandler , navigateToPostEditPage, deletePostHandler}) {
    return (
        <section className="section">
            <ul className="posts">
                {posts.map((post) => {
                    return (
                        <li className="post" key={post.id} onClick={
                            (e) => {
                                e.preventDefault()
                                viewPostHandler(post.id)
                            }
                        }>
                            <div className="post__header">
                                <h2>{post.title}</h2>
                                {user && user.username === post.user.username && (
                                    <div className="post__edit-delete">
                                        <Link to='delete-blog' onClick={(e)=>{
                                            deletePostHandler(e, post.id)
                                        }}><IconTrash size={20} style={{color:"#f50a0a"}} /></Link>
                                        <br/>
                                        <Link to='edit-blog' href onClick={(e) => {
                                            navigateToPostEditPage(e,post.id)
                                            console.log('edit');
                                        }}><IconEdit size={20} /></Link>
                                    </div>
                                )}
                            </div>

                            <div className="post__poster-info">
                                <p className="post__username">{post.user.username}</p>
                                <p className="post__time">{returnTimeDiff(post.date)}</p>
                            </div>
                            <p></p>

                            <p className="post__body post__body--ellipsis">{post.text}</p>
                            <div className="post__comment">
                                <IconMessage2 size={20} />
                                <p>{post.comments.length}</p>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}