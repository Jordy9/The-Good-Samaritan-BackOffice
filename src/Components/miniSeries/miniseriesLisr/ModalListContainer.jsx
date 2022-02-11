import React from 'react'
import { useSelector } from 'react-redux'
import { Spinner } from '../../spinner/Spinner'
import { ModalContainer } from './ModalContainer'

export const ModalListContainer = ({title}) => {
    const {miniSeries} = useSelector(state => state.mi)
    return (
        <>
            {
                (miniSeries)
                    ?
                    miniSeries.filter(miniSeries => (title === '') ? miniSeries : (miniSeries.title.toLowerCase().includes(title.toLowerCase())) && miniSeries
                    ).map(series => {
                        return (
                            <ModalContainer key = {series._id} {...series} />
                        )
                    })
                    :
                    <Spinner />
            }
        </>
    )
}
