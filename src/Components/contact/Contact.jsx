import React from 'react'
import { ContactList } from './contactList/ContactList'

export const Contact = () => {
    return (
        <>
            <h1 style={{marginTop: '70px'}}>Listado de contáctos</h1>
            <ContactList />
        </>
    )
}
