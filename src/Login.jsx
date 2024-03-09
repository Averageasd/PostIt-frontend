import {baseUrl} from "./apiConstants.js";

export function Login({loginHandler}) {
    return (
        <section className="section signup-login-section">
            <h2 className="section__title">Login form</h2>
            <form className="signup-login-form"
                method="POST"
                action={`${baseUrl}/user/login`}
                onSubmit={(e) => {
                    loginHandler(e)
                }}
            >

                <div>
                    <label>username</label>
                    <input name="username" type="text" required={true} minLength="3" maxLength="20"/>
                </div>
                <div>
                    <label>password</label>
                    <input name="password" type="password" required={true} minLength="8"/>
                </div>
                <button className="submit-btn" type="submit">Login</button>
            </form>
        </section>
    )
}