import React from 'react'
import { useSelector } from 'react-redux'
import { Spinner } from '../../spinner/Spinner'
import { ModalContainer } from './ModalContainer'

export const ModalListContainer = ({title}) => {
    const {Capsules} = useSelector(state => state.ca)
    return (
        <>
            {
                (Capsules)
                    ?
                    Capsules.filter(Capsules => (title === '') ? Capsules : (Capsules.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,""))) && Capsules
                    ).map(Capsule => {
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
