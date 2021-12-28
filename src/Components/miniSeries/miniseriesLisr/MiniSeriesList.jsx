import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { startGetMiniSeries } from '../../../action/miniSerie';
import { MiniSerieModal } from '../modal/MiniSerieModal';
import { ModalListContainer } from './ModalListContainer';

export const MiniSeriesList = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startGetMiniSeries())

  }, [dispatch])

    return (
        <>
          <h1 style = {{marginTop: '70px'}}>Listado de Mini Series</h1>
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

             <MiniSerieModal />
        </>
    )
}
