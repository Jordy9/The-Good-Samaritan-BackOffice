import React from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { SetActiveVideoWordOfTheDay, startDeleteVideoWordOfTheDay } from '../../../action/VideoWordOfTheDay'

export const ModalContainer = (props) => {

  const {title} = props

    const dispatch = useDispatch()

    const handledSet = () => {
      dispatch(SetActiveVideoWordOfTheDay(props))
    }

    const Handleddelete = () => {
      dispatch(SetActiveVideoWordOfTheDay(props))
        Swal.fire({
          title: '¿Esta seguro que desea eliminar este video?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Eliminar'
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(startDeleteVideoWordOfTheDay())
          }
        })
      }
    return (
        <>
          <tr>
              <th>{title}</th>
              <td>
                  <button onClick = {handledSet} className = 'btn btn-outline-primary mr-1 mt-2' data-bs-toggle="modal" data-bs-target="#exampleModalVideoWordOfTheDayModal" style = {{borderRadius: '100%'}}><i className="bi bi-eye" style = {{color: '#0D6EFD'}}></i></button>
                  <button onClick = {Handleddelete} className = 'btn btn-outline-danger ml-1 mt-2' style = {{borderRadius: '100%'}}><i className="bi bi-trash" style = {{color: 'red'}}></i></button>
              </td>
          </tr>
        </>
    )
}
