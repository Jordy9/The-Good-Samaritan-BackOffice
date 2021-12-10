import React from 'react'
import { GalleryModal } from '../modal/GalleryModal';
import { ModalListContainer } from './ModalListContainer';

export const GalleryList = () => {

    return (
        <>
          <h1 style = {{marginTop: '70px'}}>Listado de la galería</h1>
          <table className="table text-white bg-dark text-center">
            <thead>
              <tr>
                <th>Título</th>
                <th>Imagen</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              <ModalListContainer />
            </tbody>
          </table>

             <GalleryModal />
        </>
    )
}
