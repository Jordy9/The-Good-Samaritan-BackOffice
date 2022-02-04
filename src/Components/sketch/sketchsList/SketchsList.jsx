import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { startGetPaginateBosquejos } from '../../../action/sketch';
import { SketchModal } from '../modal/SketchModal';
import { PaginateSketch } from '../paginate/PaginateSketch';
import { ModalListContainer } from './ModalListContainer';

export const SketchsList = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startGetPaginateBosquejos())
  }, [dispatch])

    return (
        <>
          <h1 style = {{marginTop: '70px'}}>Listado de Bosquejos</h1>
          <div className="table-responsive">
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
          </div>

             <SketchModal />

             <PaginateSketch />
        </>
    )
}
