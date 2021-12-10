import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { startCreateZoom } from '../../action/zoom'
import { useForm } from '../../hooks/useForm'

export const LivesZoom = () => {
    
    const {Zoom} = useSelector(state => state.zm)

    const zoom = Zoom[0]

    const [handledInputChange, Value] = useForm({
        title: '',
        date: '',

    })

    const {title, date} = Value

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

        if (title.trim().length > 3 && date.trim().length > 3) {
            dispatch(startCreateZoom(title, date, fileupload))
        } else {
            Swal.fire('Error', 'Los campos, Titulo, Fecha y la descripcion, deben de contener un minimo de 3 letras para poder guardar el bosquejo', 'error')
        }
    }

    return (
        <div style = {{marginTop: '70px'}} className='row'>
            <div className="col-8">
                <form onSubmit = {hanldedSubmit}>
                    <h1>Zoom</h1>
                    <div className = 'row'>
                        <div className="col-4">
                            <div className="form-group">
                                <label>Título</label>
                                <input onChange = {handledInputChange} value = {title} placeholder = 'El amor al Señor' name = 'title' type="text" className = 'form-control' />
                            </div> 
                        </div>

                        <div className="col-4">
                            <div className="form-group">
                                <label>Imagen</label>
                                <input onChange = {handledFileXhange} type="File" className = 'form-control' />
                            </div> 
                        </div>

                        <div className="col-4">
                            <div className="form-group">
                                <label>date</label>
                                <input onChange = {handledInputChange} value = {date} name = 'date' type="date" className = 'form-control' />
                            </div> 
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="form-group  d-flex justify-content-center">
                                <img src = {imag || ''} className="img-fluid rounded" alt="" style = {{ cursor: 'pointer', maxHeight: '350px'}} />
                            </div> 
                        </div>
                    </div>
                    <button className = 'btn btn-outline-primary form-control my-3'>Guardar</button>
                </form>
            </div>

            <div className="col-4">
                <h1>Zoom actual</h1>
                <div className = 'shadow d-flex justify-content-center align-items-center p-4 my-2 bg-dark rounded-lg flex-column'>

                <div className="person-name my-3">
                    <h3 className = 'text-white'>{zoom?.title}</h3>
                </div>

                <div className="my-3">
                    <h6 className = 'text-white'>{zoom?.date}</h6>
                </div>

                <div className="info my-3">
                    <img className='img-fluid rounded'style={{height: '350px'}} src={zoom?.image} alt="" />
                </div>

                </div>  
            </div>
        </div>
    )
}
