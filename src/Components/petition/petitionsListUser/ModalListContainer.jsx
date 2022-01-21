import React from 'react'
import { useSelector } from 'react-redux'
import { Spinner } from '../../spinner/Spinner'
import { ModalContainerUser } from './ModalContainer'

export const ModalListContainerUser = () => {
    const {PeticionesUser} = useSelector(state => state.pt)
    return (
        <>
            {
                (PeticionesUser)
                    ?
                    PeticionesUser.map(Peticion => {
                        return (
                            <ModalContainerUser key = {Peticion._id} {...Peticion} />
                        )
                    })
                    :
                    <Spinner />
            }
        </>
    )
}
