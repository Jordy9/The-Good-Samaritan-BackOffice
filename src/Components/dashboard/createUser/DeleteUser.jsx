import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { startDeleteUser } from '../../../action/auth'
import './DeleteUser.css'

export const DeleteUser = () => {
    const dispatch = useDispatch()

    const {activeUser} = useSelector(state => state.auth)

    const Handleddelete = () => {
        Swal.fire({
          title: '¿Esta seguro que desea eliminar este usuario?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Eliminar'
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(startDeleteUser(activeUser))
            Swal.fire(
              'Eliminado!',
              'Usuario eliminado exitosamente',
              'success'
            )
          }
        })
      }
    return (
        <i className="bi bi-x-circle fabDelete" onClick = {Handleddelete}></i>
    )
}
