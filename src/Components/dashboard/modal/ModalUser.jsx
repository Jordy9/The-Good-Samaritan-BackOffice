import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ModalCloseCreate, startRegister } from '../../../action/auth'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import MaskedInput from 'react-text-mask'
import moment from 'moment'
import Swal from 'sweetalert2'
import { Modal } from 'react-bootstrap'
import countryList from 'react-select-country-list'

export const ModalUser = () => {

    const {activeUser, modalOpenCreate} = useSelector(state => state.auth)

    const newDate = moment().format('yyyy-MM-DDTHH:mm')

    const dispatch = useDispatch()

    const options = useMemo(() => countryList().getData(), [])

    const {handleSubmit, resetForm, getFieldProps, touched, errors} = useFormik({
        initialValues: {
            name: '', 
            lastName: '', 
            age: '',
            date: '',
            email: '',
            role: '',
            address: '',
            country: '',
            city: '',
            number: '',
            password: '',
            confirmPassword: ''
        },
        enableReinitialize: true,
        onSubmit: ({name, lastName, age, date, email, role, address, country, city, number, password}) => {
            if (activeUser?.role === 'Administrador') {

                dispatch(startRegister(name, lastName, age, date, email, role, address, country, city, number, password))
                resetForm({
                    name: '', 
                    lastName: '', 
                    age: '',
                    date: '',
                    email: '',
                    role: '',
                    address: '',
                    country: '',
                    city: '',
                    number: '',
                    password: '',
                    confirmPassword: ''
                })
            } else {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  return Toast.fire({
                    icon: 'error',
                    title: 'No tiene el privilegio de crear un usuario'
                  })
            }

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
            role: Yup.string()
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
                        .min(8, 'Debe de tener 8 caracteres o más')
                        .matches(/(?=.*[A-Z])/, "Debe contener como mínimo una letra mayúscula")
                        .matches(/(?=.*[a-z])/, "Debe contener como mínimo una letra minuscula")
                        .matches(/(?=.*[0-9])/, "Debe contener como mínimo un número")
                        .matches(/(?=.*[@$!%*#?&])/, "Debe contener como mínimo un caracter especial @$!%*#?&")
                        .required('Requerido'),
            confirmPassword: Yup.string()
                        .oneOf([Yup.ref('password')], 'Las contraseñas deben ser iguales')
                        .required('Requerido')
        })
    })

    const dispHide = () => {
        dispatch(ModalCloseCreate(false))
    }

    return (
        <>
            <Modal
                contentClassName='bg-dark'
                centered
                size="lg"
                show={modalOpenCreate}
                onHide={() => dispHide()}
                aria-labelledby="example-modal-sizes-title-lg"
            >
            <Modal.Header id='modal-header-video' closeButton>
            </Modal.Header>

            <Modal.Title className='text-center'>Crear Usuario</Modal.Title>
            <Modal.Body> 
                <div className="col-12">
                    <div className="mb-3" style = {{border: 'none'}}>
                        <form onSubmit = {handleSubmit}>
                            <div className="row">
                                <div className="col form-group">
                                    <label>Nombre</label>
                                    <input autoComplete='off' type="text" {...getFieldProps('name')} placeholder = 'Juan' className = 'form-control bg-transparent text-white' />
                                    {touched.name && errors.name && <span style={{color: 'red'}}>{errors.name}</span>}
                                </div>

                                <div className="col form-group">
                                    <label>Apellido</label>
                                    <input autoComplete='off' type="text" {...getFieldProps('lastName')} placeholder = 'Taveras' className = 'form-control bg-transparent text-white' />
                                    {touched.lastName && errors.lastName && <span style={{color: 'red'}}>{errors.lastName}</span>}
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="col form-group">
                                    <label>Edad</label>
                                    <input autoComplete='off' type="number" {...getFieldProps('age')} placeholder = '25' className = 'form-control bg-transparent text-white' />
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
                                    <input autoComplete='off' type="text" {...getFieldProps('email')} placeholder = 'Juan123@hotmail.com' className = 'form-control bg-transparent text-white ' />
                                    {touched.email && errors.email && <span style={{color: 'red'}}>{errors.email}</span>}
                                </div>

                                <div className="col">
                                    <label>Rol</label>
                                    <select {...getFieldProps('role')} id='select-rol' className="form-select form-control bg-transparent text-white">
                                        <option selected>Seleccione una opción</option>
                                        <option id='option-rol' value="Administrador">Administrador</option>
                                        <option value="Gestorcontenido">Gestor de contenido</option>
                                        <option value="Colaborador">Colaborador</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col form-group">
                                    <label>Dirección</label>
                                    <input autoComplete='off' type="text" {...getFieldProps('address')} placeholder = 'Los Santos' className = 'form-control bg-transparent text-white' />
                                    {touched.address && errors.address && <span style={{color: 'red'}}>{errors.address}</span>}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col form-group">
                                    <label>País</label>
                                    <select {...getFieldProps('country')} id='select-rol' className="form-select form-control bg-transparent text-white">
                                        <option selected>Seleccione una opción</option>
                                        {
                                            options.map(option => {
                                                return (
                                                    <option key={option.value} value = {[option.value, option.label]}>{option.label}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    {touched.country && errors.country && <span style={{color: 'red'}}>{errors.country}</span>}
                                </div>

                                <div className="col form-group">
                                    <label>Ciudad</label>
                                    <input autoComplete='off' type="text" {...getFieldProps('city')} placeholder = 'Bonao' className = 'form-control bg-transparent text-white' />
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
                                    <input autoComplete='off' type="text" {...getFieldProps('password')} placeholder = '********' className = 'form-control bg-transparent text-white' />
                                    {touched.password && errors.password && <span style={{color: 'red'}}>{errors.password}</span>}
                                </div>


                                <div className="col form-group">
                                    <label>Confirmar Contrasena</label>
                                    <input autoComplete='off' type="text" {...getFieldProps('confirmPassword')} placeholder = '********' className = 'form-control bg-transparent text-white' />
                                    {touched.confirmPassword && errors.confirmPassword && <span style={{color: 'red'}}>{errors.confirmPassword}</span>}
                                </div>
                            </div>
                            <button type='submit' className = 'btn btn-outline-primary form-control'>Crear</button>
                        </form>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </>
    )
}
