import React, { useState } from 'react'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DataTable from 'react-data-table-component'

function List({productos, setModulo}) {

    let hrefLink = '#'

    const handleAgregar = (e)=>{
        e.preventDefault();
        setModulo("agregar");
    }
  
    const columnas = [
        {
            name: "ID",
            selector: "id",
            sortable: true
        },
        {
            name: "Nombre",
            selector: "nombre",
            sortable: true
        },
        {
            name: "Caracteristicas",
            selector: "caracteristicas",
            sortable: true
        },
        {
            name: "Fecha Lanzamiento",
            selector: "fecha",
            sortable: true
        },
        {
            name: "Correo Fabricante",
            selector: "email",
            sortable: true
        },
        {
            name: "Pais",
            selector: "pais",
            sortable: true
        },
        {
            name: "Precio",
            selector: "precio",
            sortable: true
        },
        {
            name: "Unidades Disponibles",
            selector: "disponibles",
            sortable: true
        },
        {
            name: "Unidades Vendidas",
            selector: "vendidas",
            sortable: true
        },
        {
            name: "Imagen",
            selector: "imagen",
            sortable: false
        }
    ]

    const paginacionOpciones = {
        rowsPerPageText: "Registros por pagina",
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsItemText: "Todos"
    }

    const [data, setData] = useState([])

    const cargarDatos = ()=>{
        const auxiliar = []
        productos.forEach((item, index)=>{
            auxiliar.push(item)
        })
        setData(auxiliar)
    }

    cargarDatos();

    productos.map(item=>{
        item.imagen = <img src={item.imagen} alt="imagen producto" className="img-listado" />
        return item
    })

    
    return (
        <div>
            <h2 className="text-center">Listado de productos</h2>
            <div className="jumbotron">

                <div className="alert alert-primary p-3">
                    <a href={hrefLink} id="btn-ingresar" onClick={handleAgregar}>
                        <AddCircleOutlineIcon /> Ingresar
                    </a>
                </div>

                <DataTable columns={columnas} data={productos} title="Productos" pagination paginationComponentOptions={paginacionOpciones} fixedHeader fixedHeaderScrollHeight="600px" striped />

            </div>
        </div>
    )
}

export default List
