import React from 'react'
import './SeeSerie.css'
import { useHistory } from 'react-router'

export const SeeSerie = () => {

    const history = useHistory()

    const go = () => {
        history.push('/MiniSerie')
    }
    return (
        <>
            <i onClick = {go} className="bi bi-eye fabView"></i>
        </>
    )
}
