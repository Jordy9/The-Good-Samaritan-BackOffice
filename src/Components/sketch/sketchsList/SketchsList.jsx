import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { startGetBosquejos } from '../../../action/sketch';
import { SketchModal } from '../modal/SketchModal';
import { ModalListContainer } from './ModalListContainer';

export const SketchsList = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startGetBosquejos())
  }, [dispatch])

    return (
        <>
          <h1 style = {{marginTop: '70px'}}>Listado de Bosquejos</h1>
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

             <SketchModal />
        </>
    )
}
