import {baseUrl} from "./apiConstants.js";

export function EditBlog({selectedPost, editPostHandler}) {
    return (
        <section className="section">
            {selectedPost &&
                <form className="create-edit-post-form" method="POST" action={`${baseUrl}/posts/update/${selectedPost.id}`} onSubmit={(e) => {
                    editPostHandler(e, selectedPost.id)
                }}>
                    <div>
                        <label></label>
                        <input name="title" defaultValue={selectedPost.title} className="create-edit-post-form__title" type="text" minLength={3} maxLength={20}
                               required={true}/>
                    </div>
                    <div>
                        <label></label>
                        <textarea name="text" defaultValue={selectedPost.text} rows={12} minLength={3} required={true}/>
                    </div>
                    <button className="submit-btn" type="submit">Update</button>
                </form>}
        </section>
    )
}