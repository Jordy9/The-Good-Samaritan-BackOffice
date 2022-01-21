import React from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import h2p from 'html2plaintext'
import moment from 'moment'
import { SetActiveContact, startDeleteContact } from '../../../action/contact'

export const ModalContainer = (props) => {

  const {name, email, date, descripcion} = props

    const dispatch = useDispatch()

    const handledSet = () => {
      dispatch(SetActiveContact(props))
    }

    const Handleddelete = () => {
      dispatch(SetActiveContact(props))
        Swal.fire({
          title: '¿Esta seguro que desea eliminar este usuario?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Eliminar'
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(startDeleteContact())
          }
        })
      }
    return (
        <>
          <tr>
              <th>{name}</th>
              <td>{moment(date).format('MMMM Do YYYY, h:mm a')}</td>
              <td>{email}</td>
              <td>{h2p(descripcion).slice(0, 40) + '...'}</td>
              <td>
                {
                    <button onClick = {handledSet} className = 'btn btn-outline-primary mr-1 mt-2' data-bs-toggle="modal" data-bs-target="#exampleModal5" style = {{borderRadius: '100%'}}><i className="bi bi-eye" style = {{color: '#0D6EFD'}}></i></button>
                }
                  <button onClick = {Handleddelete} className = 'btn btn-outline-danger ml-1 mt-2' style = {{borderRadius: '100%'}}><i className="bi bi-trash" style = {{color: 'red'}}></i></button>
              </td>
          </tr>
        </>
    )
}
