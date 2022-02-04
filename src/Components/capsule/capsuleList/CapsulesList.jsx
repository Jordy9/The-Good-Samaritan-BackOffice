import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { startGetPaginateCapsules } from '../../../action/capsule';
import { CapsuleModal } from '../modal/CapsuleModal';
import { PaginateCapsule } from '../paginate/PaginateCapsule';
import { ModalListContainer } from './ModalListContainer';

export const CapsulesList = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startGetPaginateCapsules())

  }, [dispatch])

    return (
        <>
          <h1 style = {{marginTop: '70px'}}>Listado de Cápsulas</h1>
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

             <CapsuleModal />

             <PaginateCapsule />
        </>
    )
}
