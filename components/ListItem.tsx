import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'

export function ListItem(props: any) {

    return (
        <Link href={{
            pathname: '/(tabs)/detail/[id]',
            params: { id: props.id }
        }}>
            <View style={styles.itemContainer}>
                <Text>{props.name}</Text>
                <Ionicons name="chevron-forward" size={24} />
            </View>
        </Link>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        minWidth: "100%",
        padding: 5,
        paddingVertical: 15,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    }
})