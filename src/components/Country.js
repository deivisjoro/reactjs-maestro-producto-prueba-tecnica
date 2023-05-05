import React from 'react'

function Country({paises, handleChange, pais}) {

    return (
        <select name="pais" id="pais" className="form-control" onChange={handleChange} value={pais}>
            {
                paises.map(item=>{
                    return (
                        <option value={item.alpha2Code} key={item.alpha2Code}>{item.name}</option>
                    )
                })
            }
        </select>
    )
}

export default Country
