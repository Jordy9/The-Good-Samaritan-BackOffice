import React from 'react'
import { CreateUser } from './createUser/CreateUser'
import { Modal } from './modal/Modal'
import { ModalUser } from './modal/ModalUser'
import { UserList } from './userList/UserList'

export const Dashboard = () => {

    // const peticion = fetch('https://api.scripture.api.bible/v1/bibles/592420522e16049f-01/verses/MAT.1.12-MAT.1.20', {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'api-key': '4d7c87e0dd898c03754be9b1fc64665a'
    //     }
    // })

    // peticion.then(resp => resp.json().then(data => console.log(data)))
    // const [NuevoTesamento] = Nuevotestamento()

    // console.log(NuevoTesamento)
    return (
        <>
            <h1 style = {{marginTop: '70px'}}>Listado de Usuarios</h1>
            <UserList />
            <CreateUser />
            <Modal />
            <ModalUser />
        </>
    )
}
