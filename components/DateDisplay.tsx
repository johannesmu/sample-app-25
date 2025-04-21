import { Text } from "react-native"

export function DateDisplay( props:any ) {
    const dt = new Date( props.date )
    const y = dt.getFullYear()
    const m = dt.getMonth()
    const d = dt.getDate()
    const dy = dt.getDay()
    return (
        <Text>{`${dy}, ${dy} ${d}/${m}/${y}`}</Text>
    )
}