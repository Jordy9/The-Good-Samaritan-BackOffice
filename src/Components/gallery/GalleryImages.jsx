import React from 'react'

export const GalleryImages = () => {
    return (
        <>
            <h1 style = {{marginTop: '70px'}}>Galería de imagenes</h1>

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
        </>
    )
}
