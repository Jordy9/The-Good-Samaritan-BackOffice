import React from 'react'
import { useForm } from '../../../hooks/useForm'
import MaskedInput from 'react-text-mask'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { clearSetActive, startUpdateUser } from '../../../action/auth'

export const Modal = () => {

    const dispatch = useDispatch()

    const {activeUser} = useSelector(state => state.auth)

    const [HandledInputChange, Value] = useForm(activeUser || '')

    const {name, lastName, email, password } = Value
    
    console.log(Value)

    const handledSubmit = (e) => {
        e.preventDefault()
        dispatch(startUpdateUser(Value))
        dispatch(clearSetActive())

    }

    return (
        <>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content shadow bg-dark">
                        <div className="modal-header" style = {{border: 'none'}}>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    <div className="modal-body">
                        <div className="col-12">
                            <div className="mb-3" style = {{border: 'none'}}>
                                <h5 className="text-white text-center mt-2">Ver/Editar usuario</h5>
                                <div className="card-body">
                                    <form onSubmit = {handledSubmit} className = 'needs-validation'>
                                        <div className="row">
                                            <div className="col form-group">
                                                <label>Nombre</label>
                                                <input name = 'name' type="text" onChange = {HandledInputChange} value = {name} placeholder = 'Juan' className = 'form-control bg-transparent text-white' />
                                            </div>

                                            <div className="col form-group">
                                                <label>Apellido</label>
                                                <input name = 'lastName' type="text" onChange = {HandledInputChange} value = {lastName} placeholder = 'Taveras' className = 'form-control bg-transparent text-white' />
                                            </div>
                                        </div>
                                            
                                        {/* <div className="row">
                                            <div className="col form-group">
                                                <label>Edad</label>
                                                <input name = 'edad' type="text" onChange = {HandledInputChange} value = {edad} placeholder = '25' className = 'form-control bg-transparent text-white' />
                                            </div>

                                            <div className="col form-group">
                                                <label>Fecha de nacimiento</label>
                                                <input name = 'fecha' type="date" onChange = {HandledInputChange} value = {fecha} placeholder = '26/8/1996' className = 'form-control bg-transparent text-white ' />
                                            </div>
                                        </div> */}

                                        <div className="row">
                                            <div className="col form-group">
                                                <label>Correo Electrónico</label>
                                                <input name = 'email' type="text" onChange = {HandledInputChange} value = {email} placeholder = 'Juan123@hotmail.com' className = 'form-control bg-transparent text-white ' />
                                            </div>

                                            {/* <div className="col form-group">
                                                <label>Nombre de usuario</label>
                                                <input name = 'usuario' type="text" onChange = {HandledInputChange} value = {usuario} placeholder = 'Juan123' className = 'form-control bg-transparent text-white' />
                                            </div> */}
                                        </div>

                                        {/* <div className="row">
                                            <div className="col form-group">
                                                <label>Dirección</label>
                                                <input name = 'direccion' type="text" onChange = {HandledInputChange} value = {direccion} placeholder = 'Los Santos' className = 'form-control bg-transparent text-white' />
                                            </div>
                                        </div> */}

                                        {/* <div className="row">
                                            <div className="col form-group">
                                                <label>País</label>
                                                <input name = 'pais' type="text" onChange = {HandledInputChange} value = {pais} placeholder = 'República Dominicana' className = 'form-control bg-transparent text-white' />
                                            </div>

                                            <div className="col form-group">
                                                <label>Ciudad</label>
                                                <input name = 'ciudad' type="text" onChange = {HandledInputChange} value = {ciudad} placeholder = 'Bonao' className = 'form-control bg-transparent text-white' />
                                            </div>

                                            <div className="col form-group">
                                                <label>Numero de teléfono</label>
                                                <MaskedInput
                                                    name = 'numero'
                                                    value = {numero}
                                                    onChange = {HandledInputChange}
                                                    className = 'form-control bg-transparent text-white'
                                                    placeholder = '(809)-222-3333'
                                                    mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                                />
                                            </div> 
                                        </div> */}

                                        <div className="row">
                                            <div className="col form-group">
                                                <label>Contrasena</label>
                                                <input name = 'password' type="text" onChange = {HandledInputChange} value = {password} placeholder = '********' className = 'form-control bg-transparent text-white' />
                                            </div>


                                            {/* <div className="col form-group">
                                                <label>Confirmar Contrasena</label>
                                                <input name = 'confirmar' type="text" onChange = {HandledInputChange} value = {confirmar} placeholder = '********' className = 'form-control bg-transparent text-white' />
                                            </div> */}
                                        </div>
                                        <button className = 'btn btn-outline-primary form-control' data-bs-dismiss="modal" aria-label="Close">Guardar</button>
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
