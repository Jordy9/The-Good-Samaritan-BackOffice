import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { ModalOpen, startDeleteUser } from '../../../action/auth'
import { SetActiveUser } from '../../../action/user'
import Flags from 'country-flag-icons/react/3x2'

export const ModalContainer = (props) => {

  const {activeUser} = useSelector(state => state.auth)

  const {name, lastName, email, country, id, biliever, role} = props

  const Flag = Flags[country.slice(0, 2)]

    const dispatch = useDispatch()

    const handledSet = () => {
      dispatch(SetActiveUser(id, props))
      dispatch(ModalOpen(true))
    }

    const Handleddelete = () => {
      dispatch(SetActiveUser(props))
        Swal.fire({
          title: '¿Esta seguro que desea eliminar este usuario?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Eliminar'
        }).then((result) => {
          if (activeUser?.role === 'Administrador') {
            if (result.isConfirmed) {
              dispatch(startDeleteUser(props))
            }
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
              title: 'No tiene el privilegio de eliminar este usuario'
            })
          }
        })
      }
    return (
        <>
          <tr>
              <th>{name}</th>
              <td>{lastName}</td>
              <td>{email}</td>
              <td>{country.slice(3)}{<Flag className = 'flag ml-2' />}</td>
              {
                (biliever !== undefined)
                  &&
                <td className='text-primary'><strong>Usuario</strong></td>
              }

              {
                (role === 'Administrador')
                  &&
                <td className='text-success'><strong>Administrador</strong></td>
              }

              {
                (role === 'Gestorcontenido')
                  &&
              <td className='text-warning'><strong>Gestor de contenido</strong></td>
              }

              {
                (role === 'Colaborador')
                  &&
                <td className='text-info'><strong>Colaborador</strong></td>
              }
              <td>
                  <button onClick = {handledSet} className = 'btn btn-outline-primary mr-1 ' style = {{borderRadius: '100%'}}><i className="bi bi-eye"></i></button>
                  <button onClick = {Handleddelete} className = 'btn btn-outline-danger ml-1 ' style = {{borderRadius: '100%'}}><i className="bi bi-trash" style = {{color: 'red'}}></i></button>
              </td>
          </tr>
        </>
    )
}
