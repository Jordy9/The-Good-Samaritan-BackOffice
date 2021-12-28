import React from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { ActiverUser, startDeleteUser } from '../../../action/auth'
import { SetActiveUser } from '../../../action/user'

export const ModalContainer = (props) => {

  const {name, lastName, email, id} = props

    const dispatch = useDispatch()

    const handledSet = () => {
      dispatch(SetActiveUser(id, props))
    }

    const Handleddelete = () => {
      dispatch(SetActiveUser(props))
      dispatch(ActiverUser(props))
        Swal.fire({
          title: '¿Esta seguro que desea eliminar este usuario?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Eliminar'
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(startDeleteUser(props))
          }
        })
      }
    return (
        <>
          <tr>
              <th>{name}</th>
              <td>{lastName}</td>
              <td>{email}</td>
              <td>
                  <button data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick = {handledSet} className = 'btn btn-outline-primary mr-1 ' style = {{borderRadius: '100%'}}><i className="bi bi-eye"></i></button>
                  <button onClick = {Handleddelete} className = 'btn btn-outline-danger ml-1 ' style = {{borderRadius: '100%'}}><i className="bi bi-trash" style = {{color: 'red'}}></i></button>
              </td>
          </tr>
        </>
    )
}
