import {Link} from "react-router-dom";

export function NavBar({isMobile, loggedInNav, user, showSideBar, logoutHandler}) {
    return (
        <>
            {isMobile && (
                <>
                    {showSideBar && (
                        <>
                            {!loggedInNav ? (
                                <nav>
                                    <ul>
                                        <li>
                                            <Link to="home">Home</Link>
                                        </li>
                                        <li>
                                            <Link to="login">Login</Link>
                                        </li>
                                        <li>
                                            <Link to="signup">Signup</Link>
                                        </li>
                                    </ul>
                                </nav>
                            ) : (
                                <nav>
                                    <ul>
                                        <li>
                                            <Link to="home">Home</Link>
                                        </li>
                                        <li>
                                            <Link to="logout" onClick={logoutHandler}>Log out</Link>
                                        </li>
                                        <li>
                                            <Link to="create-blog">Write</Link>
                                        </li>
                                    </ul>
                                </nav>
                            )}
                        </>

                    )}
                </>
            )}
            {! isMobile && (
                <>
                    {!loggedInNav ? (
                        <nav>
                            <ul className="nav__links">
                                <li>
                                    <Link to="home">Home</Link>
                                </li>
                                <li>
                                    <Link to="login">Login</Link>
                                </li>
                                <li>
                                    <Link to="signup">Signup</Link>
                                </li>
                            </ul>
                        </nav>
                    ) : (
                        <nav >
                            <ul className="nav__links">
                                <li>
                                    <Link to="home">Home</Link>
                                </li>
                                <li>
                                    <Link to="logout" onClick={logoutHandler}>Log out</Link>
                                </li>
                                <li>
                                    <Link to="create-blog">Write</Link>
                                </li>
                            </ul>
                        </nav>
                    )}
                </>
            )}
        </>
    )
}