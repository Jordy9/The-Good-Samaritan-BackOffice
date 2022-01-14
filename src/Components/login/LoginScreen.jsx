import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { startLogin } from '../../action/auth'
import { useForm } from '../../hooks/useForm'

export const LoginScreen = () => {

    const [HandledInputChange, {correo, contrasena, recuerdame}] = useForm({
        correo: '',
        contrasena: '', 
        recuerdame: '', 
    })

    const dispatch = useDispatch();

    const handledSubmit = (e) => {
        e.preventDefault()

        dispatch(startLogin(correo, contrasena));
    }

    return (
        <>
            <div className="container">
                <div className="row my-5">
                    <div className="col-12 my-5 d-flex justify-content-center">
                        <div className = 'shadow p-2 mt-2 bg-dark rounded-lg flex-column text-white' style = {{width: '400px', height: '525px'}}>
                            <h4 className = 'text-center my-4'>Login</h4>
                            <div className="container card-body">
                                <form onSubmit = {handledSubmit} className = 'my-4'>
                                    <div className="row">

                                        <div className="col form-group">
                                            <label>Correo electrónico</label>
                                            <input name = 'correo' type="text" onChange = {HandledInputChange} value = {correo} placeholder = 'Juan@hotmail.com' className = 'form-control bg-transparent text-white' />
                                        </div>

                                    </div>

                                    <div className="row">

                                        <div className="col form-group">
                                            <label>Contraseña</label>
                                            <input name = 'contrasena' type="password" onChange = {HandledInputChange} value = {contrasena} placeholder = '********' className = 'form-control bg-transparent text-white' />
                                        </div>

                                    </div>

                                    <div className="form-check">
                                        <input name = 'recuerdame' value = {recuerdame} type="checkbox" className="form-check-input" id="exampleCheck1" />
                                        <label className="form-check-label">Recuerdame</label>
                                    </div>

                                    <button className = 'btn btn-outline-primary form-control my-3' style = {{borderRadius: '50px'}}>Iniciar sesión</button>
                                </form>
                                
                                <div className = 'text-center'>
                                    <NavLink to = '/Home' style = {{borderRadius: '50px', textDecoration: 'none'}}>¿Olvidaste tu contraseña?</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>   
        </>
    )
}
