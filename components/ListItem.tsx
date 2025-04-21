import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
export function ListItem ( props:any ) {
    return(
        <View style={ styles.itemContainer }>
            <Text>{ props.name }</Text>
            <Text>{ props.id }</Text>
            <Ionicons name="chevron-forward" size={24}/>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        padding: 5,
        paddingVertical: 15,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    }
})