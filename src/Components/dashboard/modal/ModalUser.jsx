import React from 'react'
import { useDispatch } from 'react-redux'
import { startRegister } from '../../../action/auth'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import MaskedInput from 'react-text-mask'
import moment from 'moment'

export const ModalUser = () => {

    const newDate = moment().format('yyyy-MM-DDTHH:mm')

    const dispatch = useDispatch()

    const {handleSubmit, resetForm, getFieldProps, touched, errors} = useFormik({
        initialValues: {
            name: '', 
            lastName: '', 
            age: '',
            date: '',
            email: '',
            address: '',
            country: '',
            city: '',
            number: '',
            biliever: false,
            discipleship: false,
            tracking: false,
            password: '',
            confirmPassword: ''
        },
        enableReinitialize: true,
        onSubmit: ({name, lastName, age, date, email, address, country, city, number, biliever, discipleship, tracking, password}) => {
            dispatch(startRegister(name, lastName, age, date, email, address, country, city, number, biliever, discipleship, tracking, password))
            resetForm({
                name: '', 
                lastName: '', 
                age: '',
                date: '',
                email: '',
                address: '',
                country: '',
                city: '',
                number: '',
                biliever: false,
                discipleship: false,
                tracking: false,
                password: '',
                confirmPassword: ''
            })
        },
        validationSchema: Yup.object({
            name: Yup.string()
                        .max(50, 'Debe de tener 50 caracteres o menos')
                        .min(3, 'Debe de tener 3 caracteres o más')
                        .required('Requerido'),
            lastName: Yup.string()
                        .max(50, 'Debe de tener 50 caracteres o menos')
                        .min(3, 'Debe de tener 3 caracteres o más')
                        .required('Requerido'),
            age: Yup.string()
                        .required('Requerido'),
            date: Yup.string()
                        .required('Requerido'),
            email: Yup.string()
                        .email('La dirección de email no es válida')
                        .required('Requerido'),
            address: Yup.string()
                        .max(100, 'Debe de tener 100 caracteres o menos')
                        .required('Requerido'),
            country: Yup.string()
                        .max(50, 'Debe de tener 50 caracteres o menos')
                        .required('Requerido'),
            city: Yup.string()
                        .max(50, 'Debe de tener 50 caracteres o menos')
                        .required('Requerido'),
            number: Yup.string()
                        .min(10, 'Debe de tener 10 dígitos')
                        .required('Requerido'),
            password: Yup.string()
                        .min(6, 'Debe de tener 6 caracteres o más')
                        .required('Requerido'),
            confirmPassword: Yup.string()
                        .oneOf([Yup.ref('password')], 'Las contraseñas deben ser iguales')
                        .required('Requerido')
        })
    })

    return (
        <>
            <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content shadow bg-dark">
                        <div className="modal-header" style = {{border: 'none'}}>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    <div className="modal-body">
                        <div className="col-12">
                            <div className="mb-3" style = {{border: 'none'}}>
                                <h5 className="text-white text-center mt-2">Crear Usuario</h5>
                                <div className="card-body">
                                    <form onSubmit = {handleSubmit}>
                                    <div className="row">
                                        <div className="col form-group">
                                            <label>Nombre</label>
                                            <input type="text" {...getFieldProps('name')} placeholder = 'Juan' className = 'form-control bg-transparent text-white' />
                                            {touched.name && errors.name && <span style={{color: 'red'}}>{errors.name}</span>}
                                        </div>

                                        <div className="col form-group">
                                            <label>Apellido</label>
                                            <input type="text" {...getFieldProps('lastName')} placeholder = 'Taveras' className = 'form-control bg-transparent text-white' />
                                            {touched.lastName && errors.lastName && <span style={{color: 'red'}}>{errors.lastName}</span>}
                                        </div>
                                    </div>
                                    
                                    <div className="row">
                                        <div className="col form-group">
                                            <label>Edad</label>
                                            <input type="number" {...getFieldProps('age')} placeholder = '25' className = 'form-control bg-transparent text-white' />
                                            {touched.age && errors.age && <span style={{color: 'red'}}>{errors.age}</span>}
                                        </div>

                                        <div className="col form-group">
                                            <label>Fecha de nacimiento</label>
                                            <input type="date" min={newDate} {...getFieldProps('date')} placeholder = '26/8/1996' className = 'form-control bg-transparent text-white ' />
                                            {touched.date && errors.date && <span style={{color: 'red'}}>{errors.date}</span>}
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col form-group">
                                            <label>Correo Electrónico</label>
                                            <input type="text" {...getFieldProps('email')} placeholder = 'Juan123@hotmail.com' className = 'form-control bg-transparent text-white ' />
                                            {touched.email && errors.email && <span style={{color: 'red'}}>{errors.email}</span>}
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col form-group">
                                            <label>Dirección</label>
                                            <input type="text" {...getFieldProps('address')} placeholder = 'Los Santos' className = 'form-control bg-transparent text-white' />
                                            {touched.address && errors.address && <span style={{color: 'red'}}>{errors.address}</span>}
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col form-group">
                                            <label>País</label>
                                            <input type="text" {...getFieldProps('country')} placeholder = 'República Dominicana' className = 'form-control bg-transparent text-white' />
                                            {touched.country && errors.country && <span style={{color: 'red'}}>{errors.country}</span>}
                                        </div>

                                        <div className="col form-group">
                                            <label>Ciudad</label>
                                            <input type="text" {...getFieldProps('city')} placeholder = 'Bonao' className = 'form-control bg-transparent text-white' />
                                            {touched.city && errors.city && <span style={{color: 'red'}}>{errors.city}</span>}
                                        </div>

                                        <div className="col form-group">
                                            <label >Número de teléfono</label>
                                            <MaskedInput
                                                {...getFieldProps('number')}
                                                className = 'form-control bg-transparent text-white'
                                                placeholder = '(809)-222-3333)'
                                                mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                            />
                                            {touched.number && errors.number && <span style={{color: 'red'}}>{errors.number}</span>}
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col form-group">
                                            <label>Contrasena</label>
                                            <input type="text" {...getFieldProps('password')} placeholder = '********' className = 'form-control bg-transparent text-white' />
                                            {touched.password && errors.password && <span style={{color: 'red'}}>{errors.password}</span>}
                                        </div>


                                        <div className="col form-group">
                                            <label>Confirmar Contrasena</label>
                                            <input type="text" {...getFieldProps('confirmPassword')} placeholder = '********' className = 'form-control bg-transparent text-white' />
                                            {touched.confirmPassword && errors.confirmPassword && <span style={{color: 'red'}}>{errors.confirmPassword}</span>}
                                        </div>
                                    </div>
                                    <button type='submit' className = 'btn btn-outline-primary form-control'>Crear</button>
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
