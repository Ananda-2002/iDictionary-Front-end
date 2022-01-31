import React from 'react'
import logo from '../img/todoicon.jpg'
import LightModeIcon from '@mui/icons-material/LightMode';
import AppsIcon from '@mui/icons-material/Apps';
const Navbar = () => {

    return (
        <>
            <nav>
                <div className="logo_title">
                    <img src={logo} alt="logo" />
                    <span>iDictionary</span>
                </div>
                <div className="menu_list">
                    <LightModeIcon />
                    <AppsIcon />
                </div>
            </nav>
        </>
    )
}

export default Navbar;