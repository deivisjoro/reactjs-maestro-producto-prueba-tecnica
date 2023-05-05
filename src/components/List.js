import React, { Fragment, useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import up from '../up.png';
import down from '../down.png';
import trash from '../trash.png';

function List({productos, setModulo, setProductos}) {

    let hrefLink = '#'

    const mostrarProductos = (data) =>{
        return (
            <Fragment>
                {data.map((item, index)=>(
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.nombre}</td>
                        <td>{item.caracteristicas}</td>
                        <td>{item.fecha}</td>
                        <td>{item.email}</td>
                        <td>{item.pais}</td>
                        <td>{item.precio}</td>
                        <td>{item.disponibles}</td>
                        <td>{item.vendidas}</td>
                        <td><img src={item.imagen} alt="imagen producto" className="img-listado" /></td>
                        <td className="d-flex justify-content-end align-items-center">
                            <a href="#">
                                <img src={trash} alt="logo" 
                                     onClick={eliminar} 
                                     data-id={item.id} />    
                            </a>                            
                        </td>
                    </tr>
                ))}
            </Fragment>
        )
    }

    const eliminar = (e)=>{
        e.preventDefault()
        let producto_id = parseInt(e.target.getAttribute("data-id")); 
        
        if(window.confirm(`Desea eliminar eliminar el producto con id ${producto_id}`)){
            let result = products.filter(producto => producto.id !== producto_id);
            setProductos([...result])
        }
    }

    const handleAgregar = (e)=>{
        e.preventDefault();
        setModulo("agregar");
    }

    const [products, setProducts] = useState(productos)

    const [pagina, setPagina] = useState(1)
    const [datos, setDatos] = useState(products)
    const [datosAMostrar, setDatosAMostrar] = useState(products)
    const [paginas, setPaginas] = useState(0)
    const [ordenar, setOrdenar] = useState("id")
    const [orden, setOrden] = useState("ASC")
    

    useEffect(() => {
        setPaginas(datos.length===0 ? 0 : Math.ceil(datos.length / 10)) 
        setPagina(datos.length===0 ? 0 : 1)
        mostrarDatos()
    }, [datos])

    useEffect(() => {
        mostrarDatos()
    }, [pagina])

    useEffect(() => {
        //console.log("se debe actualizar la tabla")
        setProducts(productos)
        setDatos(productos)
    }, [productos])

    const mostrarDatos = ()=>{
        let aux = []
        let inicio = ((pagina-1)*10)+1
        let fin = inicio + 9;
        datos.forEach((item, index)=>{
            const x = index+1
            if(x>=inicio && x<=fin){
                aux.push(item)
            }
        })

        setDatosAMostrar(aux)
    }

    const mostrarNumeros= () =>{

        let numeros = []
        for(let i=1;i<=paginas;i++){
            numeros.push({})
        }

        return (
            <Fragment>
                {numeros.map((item, index)=>(
                    <span 
                        key={index} 
                        className="btn btn-primary m-1"
                        onClick={()=>{setPagina(index+1)}}
                    >
                        {(index+1)}
                    </span>
                ))}
            </Fragment>
        )
    }

    /*const avanzarPagina = ()=>{
        if(pagina===paginas){
            setPagina(1)
        }
        else{
            setPagina(pagina+1)
        }
    }*/

    const buscarPorNombre = (e)=>{
        refFabricante.current.value = ''
        let texto = e.target.value
        if(texto.trim()===''){
            setDatos(products)
        }else{
            let aux = filterNombre(texto)
            setDatos(aux)
        }        
    }

    function filterNombre(query) {
        return products.filter(function(el) {
            return el.nombre.toLowerCase().indexOf(query.toLowerCase()) > -1;
        })
    }

    const buscarPorFabricante = (e)=>{
        refNombre.current.value = ''
        let texto = e.target.value
        if(texto.trim()===''){
            setDatos(products)
        }else{
            let aux = filterFabricante(texto)
            setDatos(aux)
        }        
    }

    function filterFabricante(query) {
        return products.filter(function(el) {
            return el.email.toLowerCase().indexOf(query.toLowerCase()) > -1;
        })
    }

    const refNombre = useRef("")
    const refFabricante = useRef("")

    const clickOrdenarId = (e)=>{
        e.preventDefault()
        if(ordenar==="id"){
            if(orden==="ASC"){
                setOrden("DESC")
            }
            else{
                setOrden("ASC")
            }
        }
        else{
            setOrdenar("id")
            setOrden("ASC")
        }
        
        let _ordenar = (tipo)=>{
            if(tipo==="ASC"){
                return datos.sort(function(a, b) {
                    return b.id - a.id;
                });
            }
            else{
                return datos.sort(function(a, b) {
                    return a.id - b.id;
                });
            }
            
        }        

        let aux = _ordenar(orden)
        setDatos([...aux])
    }

    const clickOrdenarNombre = (e)=>{
        e.preventDefault()

        if(ordenar==="nombre"){
            if(orden==="ASC"){
                setOrden("DESC")
            }
            else{
                setOrden("ASC")
            }
        }
        else{
            setOrdenar("nombre")
            setOrden("ASC")
        }

        var mapped = datos.map(function(el, i) {
            return { index: i, value: el.nombre.toLowerCase() };
        })

        if(orden==="ASC"){
            mapped.sort(function(a, b) {
                if (a.value > b.value) {
                  return 1;
                }
                if (a.value < b.value) {
                  return -1;
                }
                return 0;
            });
        }
        else{
            mapped.sort(function(a, b) {
                if (a.value < b.value) {
                  return 1;
                }
                if (a.value > b.value) {
                  return -1;
                }
                return 0;
            });
        }

        
        
        let aux = mapped.map(function(el){
            return datos[el.index];
        });
        
        setDatos([...aux])
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

                <div>
                    Filtros(Escoger uno): <input type="text" name="nombre" placeholder="buscar por nombre" className="w-25" onChange={buscarPorNombre} ref={refNombre} /> <input type="text" name="fabricante" placeholder="buscar por fabricante" className="w-25" onChange={buscarPorFabricante} ref={refFabricante} />

                </div>

                <table id="table-data" className="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th>
                                <div className="d-flex justify-content-end align-items-center">
                                    <a href="#" className="d-flex justify-content-start align-items-center" onClick={clickOrdenarId}>
                                    ID  
                                    { ordenar === "id" && orden === "ASC" ? <img src={up} alt="logo" className="img-sort " />  : null }

                                    { ordenar === "id" && orden === "DESC" ? <img src={down} alt="logo" className="img-sort" /> : null }
                                    </a>
                                </div>                                 
                            </th>
                            <th>
                            <div className="d-flex justify-content-start align-items-center">
                                    <a href="#" className="d-flex justify-content-end align-items-center" onClick={clickOrdenarNombre}>
                                    Nombre  
                                    { ordenar === "nombre" && orden === "ASC" ? <img src={up} alt="logo" className="img-sort " />  : null }

                                    { ordenar === "nombre" && orden === "DESC" ? <img src={down} alt="logo" className="img-sort" /> : null }
                                    </a>
                                </div> 
                            </th>
                            <th>Caracteristicas</th>
                            <th>Fecha Lanzamiento</th>
                            <th>Correo Fabricante</th>
                            <th>Pais</th>
                            <th>Precio</th>
                            <th>Unidades Disponibles</th>
                            <th>Unidades Vendidas</th>
                            <th>Imagen</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody id="tabla-productos">
                        {mostrarProductos(datosAMostrar)}       
                    </tbody>
                </table>

                <div className="row px-5">
                    <div className="col-md-6">
                        Se encontraron {datos.length} registros
                    </div>
                    <div className="col-md-6 d-flex justify-content-end align-items-center">
                        Pagina {pagina} de {paginas} 
                        &nbsp;
                        {mostrarNumeros()} 
                    </div>
                </div>
            </div>
        </div>
    )
}

List.propTypes = {
    productos: PropTypes.array.isRequired, 
    setModulo: PropTypes.func.isRequired, 
    setProductos: PropTypes.func.isRequired    
}

export default List
