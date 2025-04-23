import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'

export function ListItem ( props:any ) {
    return(
        <Link href={{
            pathname: "/(tabs)/detail/[id]",
            params: { id: props.id }
        }}>
            <View style={ styles.item }>
                <Text>{ props.name }</Text>
                <Ionicons name="chevron-forward" size={25} />
            </View>
        </Link>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: "hsl(64, 60%, 85%)",
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    },
})