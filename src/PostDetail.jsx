import {baseUrl} from "./apiConstants.js";
import {Link} from "react-router-dom";
import {IconEdit, IconMessage2, IconTrash} from "@tabler/icons-react";
import {returnTimeDiff} from "./helper/dateDiffCal.js";
import {memo} from "react";

export function PostDetail({
                               selectedPost,
                               user,
                               createCommentHandler,
                               editCommentHandler,
                               deleteCommentHandler,
                               setEditingCommentHandler,
                               cancelEditingCommentHandler,
                               editingComment,
                               setTypingComments,
                               typingComments,
                               navigateToPostEditPage,
                               deletePostHandler
                           }) {
    return (
        <section className="section">
            {selectedPost && (
                <>
                    <section className="post" key={selectedPost.id} onClick={
                        (e) => {
                            e.preventDefault()
                            viewPostHandler(post.id)
                        }
                    }>
                        <div className="post__header">
                            <h2>{selectedPost.title}</h2>
                            {user && user.username === selectedPost.user.username && (
                                <div className="post__edit-delete">
                                    <Link to='delete-blog' onClick={(e) => {
                                        deletePostHandler(e, selectedPost.id)
                                    }}><IconTrash size={20} style={{color: "#f50a0a"}}/></Link>
                                    <br/>
                                    <Link to='edit-blog' href onClick={(e) => {
                                        navigateToPostEditPage(e, selectedPost.id)
                                    }}><IconEdit size={20}/></Link>
                                </div>
                            )}
                        </div>

                        <div className="post__poster-info">
                            <p className="post__username">{selectedPost.user.username}</p>
                            <p className="post__time">{returnTimeDiff(selectedPost.date)}</p>
                        </div>
                        <p className="post__body">{selectedPost.text}</p>
                    </section>
                    <section className="comment-section">
                        <p className="comment-section__comment-count">Comments: {selectedPost.comments.length}</p>
                        <form className="comment-section__form"
                              method="POST"
                              action={`${baseUrl}/comments/create/${selectedPost.id}`}
                              onSubmit={(e) => {
                                  createCommentHandler(e, selectedPost.id)
                              }}>
                            <textarea rows={5} required={true} placeholder="What you think?"
                                      value={typingComments[selectedPost.id] ? typingComments[selectedPost.id] : ""}
                                      name="text" onChange={(e) => {
                                const updateTypingComments = {...typingComments}
                                updateTypingComments[selectedPost.id] = e.target.value;
                                setTypingComments(updateTypingComments);
                            }}/>
                            <button className="submit-btn" type="submit">Comment</button>
                        </form>
                        <ul className="comments">
                            {selectedPost.comments.map((comment) => {
                                return (editingComment !== null && comment._id === editingComment._id ?
                                        (<form key={editingComment._id}
                                               action={`${baseUrl}/comments/update/${comment._id}`}
                                               onSubmit={(e) => {
                                                   e.preventDefault();
                                                   editCommentHandler(e, comment._id)
                                               }}>
                                        <textarea rows={5} name="text" minLength={1} required={true}
                                                  defaultValue={editingComment.text}></textarea>
                                            <button className="submit-btn" type="submit">confirm</button>
                                            <button className="submit-btn cancel-btn"
                                                    onClick={cancelEditingCommentHandler} type="button">cancel
                                            </button>
                                        </form>)
                                        :
                                        (
                                            <>
                                                <li className="comments__comment" key={comment._id}>
                                                    <div className="comments__header">
                                                        <p className="comments__info"><span
                                                            className="comments__username">{comment.user.username}</span><span
                                                            className="comments__time">{returnTimeDiff(comment.date)}</span>
                                                        </p>
                                                        {user && comment.user._id === user._id &&
                                                            <div className="comments__edit-delete">
                                                                <a onClick={() => {
                                                                    deleteCommentHandler(selectedPost.id, comment._id)
                                                                }}><IconTrash size={18} style={{color: "#f50a0a"}}/></a>
                                                                <a onClick={() => {
                                                                    setEditingCommentHandler(comment._id)
                                                                }}><IconEdit size={18}/></a>
                                                            </div>
                                                        }
                                                    </div>
                                                    <p>{comment.text}</p>
                                                </li>
                                                <hr/>
                                            </>)
                                )
                            })}
                        </ul>
                    </section>
                </>
            )}
        </section>
    )
}