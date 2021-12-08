import React from 'react'

export const LivesZoom = () => {
    return (
        <>
            <h1 style = {{marginTop: '70px'}}>Reunion de zoom</h1>
            <form>
                <div className = 'row'>
                    <div className="col-4">
                        <div className="form-group">
                            <label>Título de la reunión</label>
                            <input placeholder = 'Oración congregacional' type="text" className = 'form-control' />
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
                    <div className="col-3">
                        <div className="form-group">
                            <label>Fecha</label>
                            <input type="date" className = 'form-control' />
                        </div> 
                    </div>
                </div>
            </form>
        </>
    )
}
