import React from 'react'
import { useSelector } from 'react-redux'
import { Spinner } from '../../spinner/Spinner'
import { ModalContainerSinCuenta } from './ModalContainer'

export const ModalListContainerSinCuenta = ({title}) => {
    const {PeticionSinCuenta} = useSelector(state => state.pt)
    return (
        <>
            {
                (PeticionSinCuenta)
                    ?
                    PeticionSinCuenta.filter(PeticionSinCuenta => (title === '') ? PeticionSinCuenta : (PeticionSinCuenta.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,""))) && PeticionSinCuenta
                    ).map(Peticion => {
                        return (
                            <ModalContainerSinCuenta key = {Peticion._id} {...Peticion} />
                        )
                    })
                    :
                    <Spinner />
            }
        </>
    )
}
