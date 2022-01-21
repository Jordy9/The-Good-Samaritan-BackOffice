import React from 'react'
import { useSelector } from 'react-redux'
import { Spinner } from '../../spinner/Spinner'
import { ModalContainer } from './ModalContainer'

export const ModalListContainer = () => {
    const {Capsules} = useSelector(state => state.ca)
    return (
        <>
            {
                (Capsules)
                    ?
                    Capsules.map(Capsule => {
                        return (
                            <ModalContainer key = {Capsule._id} {...Capsule} />
                        )
                    })
                    :
                    <Spinner />
            }
        </>
    )
}
