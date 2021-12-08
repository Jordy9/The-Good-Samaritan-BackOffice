import React from 'react'
import { EditorComponent } from '../../dashboard/editorComponent/EditorComponent'

export const FormPetition = () => {
    return (
        <form>
            <div className = 'row'>
                <div className="col-3">
                    <div className="form-group">
                        <label>Título</label>
                        <input type="text" className = 'form-control' />
                    </div> 
                </div>

                <div className="col-2">
                    <div className="form-group">
                        <label>Fecha</label>
                        <input type="date" className = 'form-control' />
                    </div> 
                </div>

                <div className="col-2">
                    <div className="form-group">
                        <label>Pastor</label>
                        <input type="text" className = 'form-control' />
                    </div> 
                </div>

                <div className="col-5">
                    <div className="form-group">
                        <label>Imagen</label>
                        <input type="File" className = 'form-control' />
                    </div> 
                </div>
            </div>

            <div className = 'row'>
                <div className="col-12">
                    <EditorComponent />
                </div>
            </div>
        </form>
    )
}
