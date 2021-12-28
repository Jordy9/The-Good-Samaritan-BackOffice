import moment from 'moment'

export const prepareEvents = (events) => {
    console.log(events[0].date)
    return events.map(
        (e) => ({
            ...e,
            date: moment(e.date).toDate()
        })
    )
}