import {Link} from "react-router-dom";
import {IconMenu2} from "@tabler/icons-react";
import {useEffect, useState} from "react";
import {NavBar} from "./NavBar.jsx";

export function Nav({loggedInNav, user, logoutHandler}) {
    const [isMobile, setIsMobile] = useState(false);
    const [showSideBar, setShowSideBar] = useState(false);
    useEffect(() => {
        if (window.screen.width < 768) {
            setIsMobile(true);
        }
        const windowSizeChangeListener = (e) => {
            if (e.matches) {
                setIsMobile(false);
                setShowSideBar(false);
            } else {
                setIsMobile(true);
            }
        }
        window.matchMedia("(min-width: 768px)").addEventListener('change', windowSizeChangeListener);
        return () => {
            window.removeEventListener('change', windowSizeChangeListener);
        };
    }, []);
    function toggleSideBar() {
        setShowSideBar(!showSideBar);
    }
    return (
        <section>
            {isMobile ? (
                <>
                    <IconMenu2 style={{color:'white'}} onClick={toggleSideBar}/>
                    <NavBar isMobile = {isMobile} loggedInNav={loggedInNav} user={user} showSideBar={showSideBar} logoutHandler={logoutHandler}/>
                </>
            ) : <NavBar isMobile = {isMobile} loggedInNav={loggedInNav} user={user} showSideBar={showSideBar} logoutHandler={logoutHandler}/>}

        </section>

    )
}