import React from 'react'
import { useSelector } from 'react-redux'
import { Spinner } from '../../spinner/Spinner'
import { ModalContainer } from './ModalContainer'

export const ModalListContainer = () => {
    const {Contactos} = useSelector(state => state.co)
    return (
        <>
            {
                (Contactos)
                    ?
                    Contactos.map(Contacto => {
                        return (
                            <ModalContainer key = {Contacto.id} {...Contacto} />
                        )
                    })
                    :
                    <Spinner />
            }
        </>
    )
}
