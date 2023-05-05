import React from 'react'
import Navbar from './Navbar'
import logo from '../logo.png';

function Header({handleListado, handleInicio}) {

    let hrefLink = '#'

    return (
        <header className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand marca" href={hrefLink}>
                <img src={logo} alt="logo" /> 
                MaestroProductos
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <Navbar handleListado={handleListado} handleInicio={handleInicio} />            

        </header>
    )
}

export default Header
