import {baseUrl} from "./apiConstants.js";

export function CreateBlog({createPostHandler}) {
    return (
        <section className="section">
            <form className="create-edit-post-form" method="POST" action={`${baseUrl}/posts/create`} onSubmit={createPostHandler}>
                <div>
                    <label></label>
                    <input placeholder="post title..." className="create-edit-post-form__title" name="title" type="text" minLength={3} maxLength={20} required = {true}/>
                </div>
                <div>
                    <label></label>
                    <textarea placeholder="post body..." name="text" rows={12} minLength={3} required = {true}/>
                </div>
                <button className="submit-btn" type="submit">Post</button>
            </form>
        </section>
    )
}