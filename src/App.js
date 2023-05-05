import { Fragment, useState, useEffect } from 'react';
import './App.css';

import Header from './components/Header'
import List from './components/List'
import FormAdd from './components/FormAdd'

import jsonData from './productos.json';

function App() {

  const handleInicio= (e) => {
    if(modulo!=="inicio"){
      setModulo("inicio");
    }    
  }
  
  const handleListado= (e) => {
    if(modulo!=="listado"){
      setModulo("listado");
    } 
  }

  const [modulo, setModulo] = useState("inicio")
  const [productos, setProductos] = useState([])
  const [consultar, guardarConsultar] = useState(false)

  let flag = true

  const getData = ()=>{
    if(flag){
      flag = false
      const loadData = [...jsonData]; 
      setProductos(loadData)      
    }
    
  }

  useEffect(() => {
    guardarConsultar(false)
    getData();        
  }, [consultar]);

  let componente;
  
  if(modulo==="inicio"){
    componente = null
  }
  else if(modulo==="listado"){
    componente = <List productos={productos} setProductos={setProductos} setModulo={setModulo} />
  }
  else if(modulo==="agregar"){
    componente = <FormAdd setModulo={setModulo} productos={productos} setProductos={setProductos} />
  }

  return (
    <Fragment>
      <Header handleListado={handleListado} handleInicio={handleInicio} />
      <div className="p-3">
        {componente}  
      </div>
    </Fragment>      
  );
}

export default App;