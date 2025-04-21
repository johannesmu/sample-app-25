import { Text } from "react-native"

export function DateDisplay( props:any ) {
    // create a date object from timestamp
    const dt = new Date( props.date )
    // extract the full year eg 2025
    const y = dt.getFullYear()
    // get the month 0-11 for Jan - Dec
    let m = (dt.getMonth()).toString()
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    // replace m with month name
    m = monthNames[ parseInt(m)]
    // get the date
    const d = dt.getDate()
    // get the day of the week as a number 0-6 for Sunday-Saturday
    let dy = (dt.getDay()).toString()
    const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    dy = dayNames[ parseInt(dy) ]
    return (
        <Text>{`${dy}, ${d} ${m} ${y}`}</Text>
    )
}