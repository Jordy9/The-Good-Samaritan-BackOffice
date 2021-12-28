import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { startGetEventos } from '../../../action/event';
import { EventModal } from '../modal/EventModal';
import { ModalListContainer } from './ModalListContainer';

export const EventsList = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startGetEventos())

  }, [dispatch])

    return (
        <>
          <h1 style = {{marginTop: '70px'}}>Listado de Eventos</h1>
          <table className="table text-white bg-dark text-center">
            <thead>
              <tr>
                <th>Título</th>
                <th>Fecha</th>
                <th>Descripción</th>
                <th>Imagen</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              <ModalListContainer />
            </tbody>
          </table>

             <EventModal />
        </>
    )
}
