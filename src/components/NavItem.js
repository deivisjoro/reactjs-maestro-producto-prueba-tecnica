import React from 'react'

function NavItem({texto, url, clase, Icono, handle}) {

    return (
        <li className={`nav-item ${clase}`}>
            <a href={url} onClick={handle} className="nav-link p-3 d-flex align-items-center">
                <Icono /> &nbsp;
                {texto}
            </a>
        </li>
    )
}

export default NavItem

