import React from 'react'
import { useSelector } from 'react-redux'
import { Spinner } from '../../spinner/Spinner'
import { ModalContainer } from './ModalContainer'

export const ModalListContainer = () => {
    const {Peticiones} = useSelector(state => state.pt)
    return (
        <>
            {
                (Peticiones)
                    ?
                    Peticiones.map(Peticion => {
                        return (
                            <ModalContainer key = {Peticion.id} {...Peticion} />
                        )
                    })
                    :
                    <Spinner />
            }
        </>
    )
}
