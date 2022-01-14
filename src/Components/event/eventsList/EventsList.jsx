import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { startGetPaginateEventos } from '../../../action/event';
import { EventModal } from '../modal/EventModal';
import { PaginateEvents } from '../paginate/PaginateEvents';
import { ModalListContainer } from './ModalListContainer';

export const EventsList = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startGetPaginateEventos())

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

             <PaginateEvents />
        </>
    )
}
