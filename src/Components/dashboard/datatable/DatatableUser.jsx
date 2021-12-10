import React from 'react'
import Datatable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux'
import { SetActive } from '../../../action/auth'
import { Spinner } from '../../spinner/Spinner'

export const DatatableUser = () => {

  const {users} = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const handledSelectRow = (e) => {

  }

    const columns = [
        {
          name: 'Nombre',
          selector: (users) => {
            return users.name
          },
          sortable: true
        },
        {
          name: 'Apellido',
          selector: (users) => {
            return users.lastName
          },
          sortable: true,
        },
        {
          name: 'Correo',
          selector: (users) => {
            return users.email
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
            {
              (users)
              ?
              <Datatable
              customStyles = {customStyles}
              columns = {columns}
              theme = "dark"
              data={users}
              pagination
              paginationComponentOptions = {paginationOptions}
              fixedHeader
              fixedHeaderScrollHeight = '500px'
              responsive
              selectableRows
              selectableRowsNoSelectAll
              onSelectedRowsChange = {handledSelectRow}
              selectableRowsSingle = {true}
            />

            :
            
            <Spinner />
            }

            {/* <div className="card">
              <div className="row">
                <div className="col-2">
                  <div style = {{backgroundColor: 'black', height: '100%'}}>
                  <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                      <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Antiguo</button>
                      <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Nuevo</button>
                    </div>
                  </nav>
                  <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                      <Antiguo />
                    </div>
                    <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                      <Nuevo />
                    </div>
                  </div>
                  </div>
                </div>
                <div className="col-10">
                  <div className="card-body">
                    {
                      AntiguoTestamento[0].map(Ant => console.log(Ant))
                    }
                  </div>
                </div>
              </div>
            </div> */}
        </>
    )
}
