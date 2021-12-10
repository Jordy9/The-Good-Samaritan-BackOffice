import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { useForm } from '../../hooks/useForm'
import { startCreateGallery } from '../../action/gallery'

export const GalleryImages = () => {
    const [handledInputChange, Value] = useForm({
        title: ''

    })

    const {title} = Value

    const [fileupload, setFileUpload] = useState()

    const dispatch = useDispatch()

    const [imag, setimag] = useState()

    const handledFileXhange = (e) => {
        const reader = new FileReader()
        const file = e.target.files[0]


        
        if (file) {
            setFileUpload(file)
            reader.readAsDataURL(file)
            setimag(URL.createObjectURL(file) || '')
        } else {
            Swal.fire('Error', 'Por favor Inserte una imagen para Guardar el bosquejo', 'error')
        }
        
    }

    const hanldedSubmit = (e) => {
        e.preventDefault()

        if (title.trim().length > 3) {
            dispatch(startCreateGallery(title, fileupload))
        } else {
            Swal.fire('Error', 'Los campos, Titulo, Fecha y la descripcion, deben de contener un minimo de 3 letras para poder guardar el bosquejo', 'error')
        }
    }

    return (
        <form onSubmit = {hanldedSubmit}>
            <h1 style={{marginTop: '70px'}}>Galería</h1>
            <div className = 'row'>
                <div className="col-6">
                    <div className="form-group">
                        <label>Título</label>
                        <input onChange = {handledInputChange} value = {title} placeholder = 'El amor al Señor' name = 'title' type="text" className = 'form-control' />
                    </div> 
                </div>

                <div className="col-6">
                    <div className="form-group">
                        <label>Imagen</label>
                        <input onChange = {handledFileXhange} type="File" className = 'form-control' />
                    </div> 
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="form-group  d-flex justify-content-center">
                        {/* <img src = {imag} style = {{ cursor: 'pointer', height: '200px', maxWidth: '400px' }} className = 'img-fluid rounded' alt=''/> */}
                        <img src = {imag || ''} className="img-fluid rounded" alt="" style = {{ cursor: 'pointer', maxHeight: '225px'}} />
                    </div> 
                </div>
            </div>
            <button className = 'btn btn-outline-primary form-control my-3'>Guardar</button>
        </form>
    )
}
