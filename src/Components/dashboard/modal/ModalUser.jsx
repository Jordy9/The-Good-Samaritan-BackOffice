import React from 'react'
import { useForm } from '../../../hooks/useForm'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { startRegister } from '../../../action/auth'

export const ModalUser = () => {

    const [HandledInputChange, Value, Reset] = useForm({
        nombre: '', 
        apellido: '', 
        edad: '',
        fecha: '',
        correo: '',
        direccion: '', 
        pais: '', 
        ciudad: '', 
        numero: '',
        contrasena: '', 
        confirmar: ''
    })

    const {nombre, apellido, correo, contrasena, confirmar} = Value;
    const dispatch = useDispatch()

    const handledSubmit = (e) => {
        e.preventDefault()
        if (contrasena !== confirmar) {
            return Swal.fire('Error', 'Las contraseñas deben ser iguales', 'error');
        }
        dispatch(startRegister(nombre, apellido, correo, contrasena))

        Reset()

    }

    return (
        <>
            <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content shadow bg-dark">
                        <div className="modal-header" style = {{border: 'none'}}>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    <div className="modal-body">
                        <div className="col-12">
                            <div className="mb-3" style = {{border: 'none'}}>
                                <h5 className="text-white text-center mt-2">Detalle de Usuario</h5>
                                <div className="card-body">
                                    <form onSubmit = {handledSubmit} className = 'needs-validation'>
                                        <div className="row">
                                            <div className="col form-group">
                                                <label>Nombre</label>
                                                <input name = 'nombre' type="text" onChange = {HandledInputChange} value = {nombre} placeholder = 'Juan' className = 'form-control bg-transparent text-white' />
                                            </div>

                                            <div className="col form-group">
                                                <label>Apellido</label>
                                                <input name = 'apellido' type="text" onChange = {HandledInputChange} value = {apellido} placeholder = 'Taveras' className = 'form-control bg-transparent text-white' />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col form-group">
                                                <label>Correo Electrónico</label>
                                                <input name = 'correo' type="text" onChange = {HandledInputChange} value = {correo} placeholder = 'Juan123@hotmail.com' className = 'form-control bg-transparent text-white ' />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col form-group">
                                                <label>Contrasena</label>
                                                <input name = 'contrasena' type="text" onChange = {HandledInputChange} value = {contrasena} placeholder = '********' className = 'form-control bg-transparent text-white' />
                                            </div>


                                            <div className="col form-group">
                                                <label>Confirmar Contrasena</label>
                                                <input name = 'confirmar' type="text" onChange = {HandledInputChange} value = {confirmar} placeholder = '********' className = 'form-control bg-transparent text-white' />
                                            </div>
                                        </div>
                                    <button data-bs-dismiss="modal" aria-label="Close" className = 'btn btn-outline-primary form-control'>Crear</button>
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
