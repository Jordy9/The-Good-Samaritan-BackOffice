import React from 'react'
import { useSelector } from 'react-redux'
import { Spinner } from '../../spinner/Spinner'
import { ModalContainer } from './ModalContainer'

export const ModalListContainer = () => {
    const {miniSeries} = useSelector(state => state.mi)
    return (
        <>
            {
                (miniSeries)
                    ?
                    miniSeries.map(series => {
                        return (
                            <ModalContainer key = {series.id} {...series} />
                        )
                    })
                    :
                    <Spinner />
            }
        </>
    )
}
