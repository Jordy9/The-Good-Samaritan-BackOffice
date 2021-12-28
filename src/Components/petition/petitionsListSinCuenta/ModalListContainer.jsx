import React from 'react'
import { useSelector } from 'react-redux'
import { Spinner } from '../../spinner/Spinner'
import { ModalContainerSinCuenta } from './ModalContainer'

export const ModalListContainerSinCuenta = () => {
    const {PeticionSinCuenta} = useSelector(state => state.pt)
    return (
        <>
            {
                (PeticionSinCuenta)
                    ?
                    PeticionSinCuenta.map(Peticion => {
                        return (
                            <ModalContainerSinCuenta key = {Peticion.id} {...Peticion} />
                        )
                    })
                    :
                    <Spinner />
            }
        </>
    )
}
