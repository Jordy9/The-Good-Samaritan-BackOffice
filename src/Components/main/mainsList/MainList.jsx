import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { startGetMains } from '../../../action/main';
import { MainModal } from '../modal/MainModal';
import { ModalListContainer } from './ModalListContainer';

export const MainList = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startGetMains())

  }, [dispatch])

    return (
        <>
          <h1 style = {{marginTop: '70px'}}>Listado del carrusel</h1>
          <table className="table text-white bg-dark text-center">
            <thead>
              <tr>
                <th>Título</th>
                <th>Descripción</th>
                <th>Imagen</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              <ModalListContainer />
            </tbody>
          </table>

             <MainModal />
        </>
    )
}
