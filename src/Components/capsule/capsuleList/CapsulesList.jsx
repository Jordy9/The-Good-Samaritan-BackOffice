import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { startGetCapsules } from '../../../action/capsule';
import { CapsuleModal } from '../modal/CapsuleModal';
import { ModalListContainer } from './ModalListContainer';

export const CapsulesList = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startGetCapsules())

  }, [dispatch])

    return (
        <>
          <h1 style = {{marginTop: '70px'}}>Listado de Cápsulas</h1>
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

             <CapsuleModal />
        </>
    )
}
