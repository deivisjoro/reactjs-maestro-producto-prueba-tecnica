import React, { useState, useEffect, useRef } from 'react'
import Country from './Country';
import CurrencyInput from 'react-currency-input-field'
import { useFormik } from 'formik'
import * as Yup from 'yup'

function FormAdd({setModulo, setProductos, productos}) {

    const [paises, guardarPaises] = useState([])
    const [consultar, guardarConsultar] = useState(false)
    
    const refFile = useRef("")

    const fetchData = () => {

        fetch("https://restcountries.eu/rest/v2/all")
        .then(res=>res.json())
        .then(datos=>{
            guardarPaises(datos);       
        })
        .catch((error)=>{
            console.log(`Hubo un problema en la peticion fetch: ${error.message}`)
        })
    }
    
    useEffect(() => {
        guardarConsultar(false)
        fetchData();        
    }, [consultar]);

    const handleCerrar = (e)=>{
        e.preventDefault();   
        setModulo("listado");     
    }

    const formik = useFormik({
        initialValues: {
            id: '',
            nombre: '',
            caracteristicas: '',
            fecha: '',
            email: '',
            pais: '',
            precio: '',
            disponibles: '',
            vendidas: '',
            imagen: ''    
        },
        validationSchema: Yup.object({
            id: Yup.number("EL id debe ser un numero entero").required("El id es obligatorio"),
            nombre: Yup.string().required("El nombre del producto es obligatorio"),
            caracteristicas: Yup.string().required("Las caracteristicas del producto son obligatorias"),
            fecha: Yup.string().required("Debe seleccionar una fecha"),
            email: Yup.string().email("Debe ingresar un email valido").required("El email es obligatorio"),
            pais: Yup.string().required("Debe seleccionar un pais"),
            precio: Yup.string().required("Debe ingresar un precio"),
            disponibles: Yup.number().required("Debe ingresar la cantidad de unidades disponibles"),
            vendidas: Yup.number().required("Debe ingresar la cantidad de unidades vendidas"),
            imagen: Yup.string().required("Debe seleccionar una imagen")
        }),
        onSubmit: (formData)=>{
            formData.imagen = URL.createObjectURL(refFile.current.files[0])
            formData.id = parseInt(formData.id)
            setProductos([...productos, formData])
            setModulo("listado");
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="card">
                <div className="card-header bg-dark">
                    <h5 className="text-center text-white">Datos del Producto</h5>
                </div>
                <div className="card-body">
                    <div className="alert alert-warning">Todos los datos son obligatorios</div>
                    <div className="row">
                        <div className="col-md-3 form-group">
                            <label htmlFor="id">ID</label>
                            <input type="text" name="id" id="id" className="form-control" onChange={formik.handleChange}
                            value={formik.values.id} />
                            {formik.errors.id && formik.touched.id && (
            <p><span className="badge badge-danger">{formik.errors.id}</span></p>
          )}
                        </div>
                        <div className="col-md-9 form-group">
                            <label htmlFor="nombre">Nombre</label>
                            <input type="text" name="nombre" id="nombre" className="form-control" onChange={formik.handleChange}
                            value={formik.values.nombre}  />
                            {formik.errors.nombre && formik.touched.nombre && (
            <p><span className="badge badge-danger">{formik.errors.nombre}</span></p>
          )}
                        </div>
                    </div>  
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <label htmlFor="caracteristicas">Caracteristicas</label>
                            <textarea className="form-control" name="caracteristicas" id="caracteristicas" onChange={formik.handleChange} 
                            value={formik.values.caracteristicas}></textarea>
                            {formik.errors.caracteristicas && formik.touched.caracteristicas && (
            <p><span className="badge badge-danger">{formik.errors.caracteristicas}</span></p>
          )}
                        </div>
                    </div> 
                    <div className="row">
                        <div className="col-md-4 form-group">
                            <label htmlFor="fecha">Fecha de Lanzamiento</label>
                            <input type="date" name="fecha" id="fecha" className="form-control" onChange={formik.handleChange}
                            value={formik.values.fecha} />
                            {formik.errors.fecha && formik.touched.fecha && (
            <p><span className="badge badge-danger">{formik.errors.fecha}</span></p>
          )}
                        </div>
                        <div className="col-md-4 form-group">
                            <label htmlFor="email">Correo del Fabricante</label>
                            <input type="email" name="email" id="email" className="form-control" onChange={formik.handleChange} 
                            value={formik.values.email} />
                            {formik.errors.email && formik.touched.email && (
            <p><span className="badge badge-danger">{formik.errors.email}</span></p>
          )}
                        </div>
                        <div className="col-md-4 form-group">
                            <label htmlFor="pais">Pais de Fabricacion</label>
                            <Country paises={paises} valor={formik.values.id} handleChange={formik.handleChange} />                        
                            {formik.errors.pais && formik.touched.pais && (
            <p><span className="badge badge-danger">{formik.errors.pais}</span></p>
          )}
                        </div>
                    </div>  
                    <div className="row">
                        <div className="col-md-3 form-group">
                            <label htmlFor="precio">Precio</label>
                            <CurrencyInput
                                id="precio"
                                name="precio"
                                prefix="$"
                                decimalSeparator=","
                                groupSeparator="."
                                decimalsLimit={2}
                                className="form-control"
                                onChange={formik.handleChange}
                                value={formik.values.precio}
                            />
                            {formik.errors.precio && formik.touched.precio && (
            <p><span className="badge badge-danger">{formik.errors.precio}</span></p>
          )}
                        </div>
                        <div className="col-md-3 form-group">
                            <label htmlFor="disponibles">Unidades Disponibles</label>
                            <input type="text" name="disponibles" id="disponibles" className="form-control" onChange={formik.handleChange} 
                            value={formik.values.disponibles} />
                            {formik.errors.disponibles && formik.touched.disponibles && (
            <p><span className="badge badge-danger">{formik.errors.disponibles}</span></p>
          )}
                        </div>
                        <div className="col-md-3 form-group">
                            <label htmlFor="vendidas">Unidades Vendidas</label>
                            <input type="text" name="vendidas" id="vendidas" className="form-control" onChange={formik.handleChange} 
                            value={formik.values.vendidas} />
                            {formik.errors.vendidas && formik.touched.vendidas && (
            <p><span className="badge badge-danger">{formik.errors.vendidas}</span></p>
          )}
                        </div>
                        <div className="col-md-3 form-group">
                            <label htmlFor="imagen">Imagen</label>
                            <input type="file" name="imagen" id="imagen" className="form-control" onChange={formik.handleChange} ref={refFile} />
                            {formik.errors.imagen && formik.touched.imagen && (
            <p><span className="badge badge-danger">{formik.errors.imagen}</span></p>
          )}
                        </div>
                    </div>               
                </div>
                <div className="card-footer">
                    <div className="row">
                        <div className="col-md-6 d-flex align-items-center">
                            <button type="submit" className="btn btn-primary btn-block">Guardar</button>
                        </div>
                        <div className="col-md-6 d-flex align-items-center">
                            <button className="btn btn-danger btn-block" onClick={handleCerrar}>Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default FormAdd
