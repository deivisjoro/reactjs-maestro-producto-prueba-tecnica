import React, { Fragment } from 'react'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

function List({productos, setModulo}) {

    let hrefLink = '#'

    const mostrarProductos = (datos) =>{
        return (
            <Fragment>
                {datos.map((item, index)=>(
                    <tr key={item.id}>
                        <td>{index+1}</td>
                        <td>{item.id}</td>
                        <td>{item.nombre}</td>
                        <td>{item.descripcion}</td>
                        <td>{item.fecha}</td>
                        <td>{item.email}</td>
                        <td>{item.pais}</td>
                        <td>{item.precio}</td>
                        <td>{item.disponibles}</td>
                        <td>{item.vendidas}</td>
                        <td><img src={item.imagen} alt="imagen producto" className="img-listado" /></td>
                    </tr>
                ))}
            </Fragment>
        )
    }

    const handleAgregar = (e)=>{
        e.preventDefault();
        setModulo("agregar");
    }
    
    return (
        <div>
            <h2 className="text-center">Listado de productos</h2>
            <div className="jumbotron">

                <div className="alert alert-primary p-3">
                    <a href={hrefLink} id="btn-ingresar" onClick={handleAgregar}>
                        <AddCircleOutlineIcon /> Ingresar
                    </a>
                </div>

                <table id="table-data" className="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th>N</th>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripcion</th>
                            <th>Fecha Lanzamiento</th>
                            <th>Correo Fabricante</th>
                            <th>Pais</th>
                            <th>Precio</th>
                            <th>Unidades Disponibles</th>
                            <th>Unidades Vendidas</th>
                            <th>Imagen</th>
                        </tr>
                    </thead>
                    <tbody id="tabla-productos">
                        {mostrarProductos(productos)}       
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default List
