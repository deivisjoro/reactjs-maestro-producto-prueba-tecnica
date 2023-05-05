import React from 'react'
import NavItem from './NavItem'
import HomeIcon from '@material-ui/icons/Home'
import AllInboxIcon from '@material-ui/icons/AllInbox';

import profile from '../profile.svg';
import SettingsIcon from '@material-ui/icons/Settings';
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function Navbar({handleListado, handleInicio}) {

    let hrefLink = '#'

    return (
        <nav className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto mr-5 d-flex align-items-center">
                
                <NavItem texto="Inicio" handle={handleInicio} url="#" clase="active" Icono={HomeIcon} />
                <NavItem texto="Productos" handle={handleListado} url="#" clase="" Icono={AllInboxIcon} />          
                
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle p-3 d-flex align-items-center" href={hrefLink} id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img src={profile} className="img-profile" alt="profile" /> 
                        Deivis Rodriguez
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item text-center" href={hrefLink}>
                            <img src={profile} className="img-profile-2" alt="profile" /> 
                        </a>
                        <a className="dropdown-item" href={hrefLink}>
                            <SettingsIcon />&nbsp; 
                            Configuracion
                        </a>
                        <a className="dropdown-item" href={hrefLink}>
                            <FlipCameraAndroidIcon />&nbsp; 
                            Actualizar datos
                        </a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item bg-danger text-white" href={hrefLink}>
                            <ExitToAppIcon />&nbsp; Cerrar Sesion
                        </a>
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
