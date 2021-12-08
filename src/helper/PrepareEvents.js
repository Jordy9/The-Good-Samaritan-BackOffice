import moment from 'moment'

export const prepareEvents = (events) => {
    return events.map(
        (e) => ({
            ...e,
            date: moment(e.date).toDate(),
        })
    )
}