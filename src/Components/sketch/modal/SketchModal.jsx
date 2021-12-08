import React from 'react'
import { useForm } from '../../../hooks/useForm'
import MaskedInput from 'react-text-mask'

export const SketchModal = () => {

    const [HandledInputChange, {nombre, apellido, edad, fecha, correo, usuario, direccion, pais, ciudad, numero, contrasena, confirmar}] = useForm({
        nombre: '', 
        apellido: '', 
        edad: '',
        fecha: '',
        correo: '',
        usuario: '', 
        direccion: '', 
        pais: '', 
        ciudad: '', 
        numero: '',
        contrasena: '', 
        confirmar: ''
    })

    return (
        <>
            <div className="modal fade" id="exampleModal5" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content shadow bg-dark">
                        <div className="modal-header" style = {{border: 'none'}}>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    <div className="modal-body">
                        <div className="col-12">
                            <div className="mb-3" style = {{border: 'none'}}>
                                <h5 className="text-white text-center mt-2">Crear Usuario</h5>
                                <div className="card-body">
                                    <form className = 'needs-validation'>
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
                                                <label>Edad</label>
                                                <input name = 'edad' type="text" onChange = {HandledInputChange} value = {edad} placeholder = '25' className = 'form-control bg-transparent text-white' />
                                            </div>

                                            <div className="col form-group">
                                                <label>Fecha de nacimiento</label>
                                                <input name = 'fecha' type="date" onChange = {HandledInputChange} value = {fecha} placeholder = '26/8/1996' className = 'form-control bg-transparent text-white ' />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col form-group">
                                                <label>Correo Electrónico</label>
                                                <input name = 'correo' type="text" onChange = {HandledInputChange} value = {correo} placeholder = 'Juan123@hotmail.com' className = 'form-control bg-transparent text-white ' />
                                            </div>

                                            <div className="col form-group">
                                                <label>Nombre de usuario</label>
                                                <input name = 'usuario' type="text" onChange = {HandledInputChange} value = {usuario} placeholder = 'Juan123' className = 'form-control bg-transparent text-white' />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col form-group">
                                                <label>Dirección</label>
                                                <input name = 'direccion' type="text" onChange = {HandledInputChange} value = {direccion} placeholder = 'Los Santos' className = 'form-control bg-transparent text-white' />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col form-group">
                                                <label>País</label>
                                                <input name = 'pais' type="text" onChange = {HandledInputChange} value = {pais} placeholder = 'República Dominicana' className = 'form-control bg-transparent text-white' />
                                            </div>

                                            <div className="col form-group">
                                                <label>Ciudad</label>
                                                <input name = 'ciudad' type="text" onChange = {HandledInputChange} value = {ciudad} placeholder = 'Bonao' className = 'form-control bg-transparent text-white' />
                                            </div>

                                            <div className="col form-group">
                                                <label cl>Numero de teléfono</label>
                                                <MaskedInput
                                                    name = 'numero'
                                                    value = {numero}
                                                    onChange = {HandledInputChange}
                                                    className = 'form-control bg-transparent text-white'
                                                    placeholder = '(809)-222-3333'
                                                    mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                                />
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
                                    </form>
                                    <button className = 'btn btn-outline-primary form-control'>Crear</button>
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
