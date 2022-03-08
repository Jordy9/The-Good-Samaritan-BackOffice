import React from 'react'
import { CreateUser } from './createUser/CreateUser'
import { ModalUpdate } from './modal/Modal'
import { ModalUser } from './modal/ModalUser'
import { UserList } from './userList/UserList'

export const Dashboard = () => {
    return (
        <>
            <h1 style = {{marginTop: '70px'}}>Listado de Usuarios</h1>
            <UserList />
            <CreateUser />
            <ModalUpdate />
            <ModalUser />
        </>
    )
}
