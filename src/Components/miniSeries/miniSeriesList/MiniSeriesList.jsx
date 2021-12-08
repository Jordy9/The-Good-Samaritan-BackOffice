import React from 'react'
import Datatable from 'react-data-table-component'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Spinner } from '../../spinner/Spinner';
import { MiniSerieModal } from '../modal/MiniSerieModal';
import {SetActiveSerie} from '../../../action/miniSerie'
import { DeleteSerie } from '../series/DeleteSerie';
import { SeeSerie } from '../series/SeeSerie';

export const MiniSeriesList = () => {

  const {miniSeries, activeSerie} = useSelector(state => state.mi)

  const dispatch = useDispatch()

  const handledSelectRow = (e) => {
    dispatch(SetActiveSerie(e.selectedRows[0]))
  }

    const columns = [
        {
          name: 'Título',
          selector: (miniSeries) => {
            return miniSeries.title
          },
          sortable: true
        },
        {
          name: 'Fecha',
          selector: (miniSeries) => {
            return miniSeries.date
          },
          sortable: true,
        },
        {
          name: 'Descripción',
          selector: (miniSeries) => {
            return miniSeries.descripcion
          },
          sortable: true,
        },
        {
          name: 'Imagen',
          selector: (miniSeries) => {
            return <img src={miniSeries.image} className = 'img-fluid' style = {{height: '60px', width: '60px'}} alt={miniSeries.title} />
          },
          sortable: true,
        },
      ]

      const paginationOptions = {
          rowsPerPageText: 'Filas por página',
          rangeSeparatorText: 'de',
          selectAllRowsItem: true,
          selectAllRowsItemText: 'Todos',
  
  
      }
  
      const customStyles = {
          rows: {
              style: {
                  background: 'rgb(33,37,41)', // override the row height
              },
          },
          headCells: {
              style: {
                  background: 'rgb(33,37,41)',
                  fontWeight: '700'
              },
          },
          cells: {
              style: {
                 background: 'rgb(33,37,41)'
              },
          },
          pagination: {
              style: {
                 background: 'rgb(33,37,41)'
              }
          }
      };

    return (
        <>
          <h1 style = {{marginTop: '70px'}}>Listado de Mini Series</h1>
          {
            (miniSeries)
              ?
              <>
            <Datatable
                customStyles = {customStyles}
                columns = {columns}
                theme = "dark"
                data={miniSeries}
                pagination
                paginationComponentOptions = {paginationOptions}
                fixedHeader
                fixedHeaderScrollHeight = '500px'
                responsive
                selectableRows
                onSelectedRowsChange = {handledSelectRow}
                selectableRowsSingle = {true}
                selectableRowsNoSelectAll
                
             />
             {/* <MiniSerieModal /> */}
             {
               (activeSerie)
                &&
                <>
                <DeleteSerie />
                <SeeSerie />
                </>
             }
             </>

              :
              <Spinner />
          }
        </>
    )
}
