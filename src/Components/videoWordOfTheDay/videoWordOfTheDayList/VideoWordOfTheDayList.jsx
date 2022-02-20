import React from 'react'
import { VideoWordOfTheDayModal } from '../modal/VideoWordOfTheDayModalModal';
import { ModalListContainer } from './ModalListContainer';

export const videoWordOfTheDayList = () => {

    return (
        <>
          <h1 style = {{marginTop: '70px'}}>Listado de Palabra Del Día</h1>
          <div className="table-responsive">
            <table className="table text-white bg-dark text-center">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Video</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                <ModalListContainer />
              </tbody>
            </table>
          </div>

             <VideoWordOfTheDayModal />
        </>
    )
}
