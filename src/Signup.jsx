import {baseUrl} from "./apiConstants.js";

export function Signup({signupHandler}) {
    return (
        <section className="section signup-login-section">
            <h2 className="section__title">Signup form</h2>
            <form
                className="signup-login-form"
                method="POST"
                action={`${baseUrl}/user/signup`}
                onSubmit={(e) => {
                    signupHandler(e)
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
                <button className="submit-btn" type="submit">Register</button>
            </form>
        </section>
    )
}