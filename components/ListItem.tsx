import { View, Text, StyleSheet } from 'react-native'
export function ListItem ( props:any ) {
    return(
        <View>
            <Text>{ props.name }</Text>
        </View>
    )
}