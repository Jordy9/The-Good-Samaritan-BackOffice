import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import h2p from 'html2plaintext'
import { SetActivePetition, startDeletePetition } from '../../../action/petition'
import moment from 'moment'

export const ModalContainer = (props) => {

  const {socket} = useSelector(state => state.sk)

  const {_id, title, date, descripcion, check} = props

    const dispatch = useDispatch()

    const handledSet = () => {
      dispatch(SetActivePetition(props))
    }

    const [checkcont, setCheckcont] = useState(check)

    const handledChangeCheck = () => {
      if (checkcont === false) {
        setCheckcont(true)
      } else {
        setCheckcont(false)
      }
      socket?.emit('check-petitions-pastores', _id)
    }

    const Handleddelete = () => {
      dispatch(SetActivePetition(props))
        Swal.fire({
          title: '¿Esta seguro que desea eliminar este usuario?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Eliminar'
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(startDeletePetition())
          }
        })
      }
    return (
        <>
          <tr style={{backgroundColor: (checkcont) && 'green'}}>
              <th>{title}</th>
              <td>{moment(date).format('MMMM Do YYYY, h:mm a')}</td>
              <td>
                {
                  (h2p(descripcion).length > 9)
                    ?
                  h2p(descripcion).slice(0, 40) + '...'
                    :
                  h2p(descripcion)
                }
              </td>
              <td>
                  <button onClick = {handledSet} className = 'btn btn-outline-primary mr-1 mt-2' data-bs-toggle="modal" data-bs-target="#exampleModal5" style = {{borderRadius: '100%'}}><i className="bi bi-eye" style = {{color: '#0D6EFD'}}></i></button>
                  <button onClick = {Handleddelete} className = 'btn btn-outline-danger ml-1 mt-2' style = {{borderRadius: '100%'}}><i className="bi bi-trash" style = {{color: 'red'}}></i></button>
                  <button onClick={handledChangeCheck} className = 'btn btn-outline-success ml-1 mt-2' style = {{borderRadius: '100%'}}><i className="bi bi-check-lg text-success"></i></button>
              </td>
          </tr>
        </>
    )
}
