import React from 'react'

export const ImagesHome = () => {
    return (
        <>
            <h1 style = {{marginTop: '70px'}}>Imagenes Home</h1>
            
            <div className="row">
                <div className="col-4">
                    <div className="form-group">
                        <label>Título del carrusel</label>
                        <input placeholder = 'Amor al Señor' type="text" className = 'form-control' />
                    </div> 
                </div>

                <div className="col-8">
                    <div className="form-group">
                        <label>Imagen</label>
                        <input type="File" className = 'form-control' />
                    </div> 
                </div>
                
            </div>

            <div className="row">
                <div className="col-4">
                    <div className="form-group">
                        <label>Descripción</label>
                        <input placeholder = 'El señor se ha glorificado' type="text" className = 'form-control' />
                    </div> 
                </div>
            </div>
        </>
    )
}
