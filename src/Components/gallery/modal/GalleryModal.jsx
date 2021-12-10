import React, { useState } from 'react'
import { useForm } from '../../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { startUpdateGallery } from '../../../action/gallery'

export const GalleryModal = () => {
    const {activeGallery} = useSelector(state => state.ga)

    const [HandledInputChange, Value] = useForm(activeGallery)

    const {title} = Value

    const [fileupload, setFileUpload] = useState()

    const dispatch = useDispatch()

    const [imag, setimag] = useState()

    const handledFileXhange = (e) => {
        const reader = new FileReader()
        const file = e.target.files[0]


        reader.readAsDataURL(file)
        setimag(URL.createObjectURL(file) || '')

        if (file) {
            setFileUpload(file)
        }
        
    }

    const hanldedSubmit = (e) => {
        e.preventDefault()

        dispatch(startUpdateGallery(title, fileupload))
    }


    return (
        <>
            <div className="modal fade" id="exampleModal8" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content shadow bg-dark">
                        <div className="modal-header" style = {{border: 'none'}}>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    <div className="modal-body">
                        <div className="col-12">
                            <div className="mb-3" style = {{border: 'none'}}>
                                <h5 className="text-white text-center mt-2">Editar Bosquejo</h5>
                                <div className="card-body">
                                    <form onSubmit = {hanldedSubmit} className = 'needs-validation'>
                                        <div className="row">
                                            <div className="col form-group">
                                                <label>Título</label>
                                                <input name = 'title' type="text" onChange = {HandledInputChange} value = {title || activeGallery.title} placeholder = 'El amor del Señor' className = 'form-control bg-transparent text-white' />
                                            </div>

                                            <div className="col-5">
                                                <div className="form-group">
                                                    <label>Imagen</label>
                                                    <input onChange = {handledFileXhange} type="File" className = 'form-control' />
                                                </div> 
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-12">
                                                <div className="form-group  d-flex justify-content-center">
                                                    <img src = {imag || activeGallery.image || ''} className="img-fluid rounded" alt="" style = {{ cursor: 'pointer', maxHeight: '225px'}} />
                                                </div> 
                                            </div>
                                        </div>

                                        <button className = 'btn btn-outline-primary form-control mt-4'>Guardar</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}
