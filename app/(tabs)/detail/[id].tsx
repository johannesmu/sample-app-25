import { Text, View, StyleSheet, Pressable, TextInput, ActivityIndicator } from 'react-native'
import { useLocalSearchParams, Link, useNavigation } from 'expo-router'
import { useEffect, useContext, useState } from 'react'
import { Item } from '@/interfaces/Item'
import { useData } from '@/contexts/UserDataContext'

export default function DetailScreen(props: any) {
    // default item
    const defaultItem: Item = { name: "", description: "", created: 0 }
    // state to store document
    const [item, setItem] = useState<Item>(defaultItem)
    const [loading, setLoading] = useState<boolean>(true)
    // access data context via hook
    const data = useData()
    // access navigation object via hook
    const navigation = useNavigation()
    // set screen options
    useEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [navigation])


    const { id }: any = useLocalSearchParams()
    const { name }: any = useLocalSearchParams()

    useEffect(() => {
        // set item to default
        setItem(defaultItem)
        setLoading(true)
        // get document when id changes
        data.getDoc(id)
            .then((res: any) => {
                setItem(res)
                console.log(res)
                setLoading(false)
            })

    }, [id])
    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size={25} />
            </View>
        )
    }
    else {
        return (
            <View style={styles.container}>
                <View style={styles.itemHeader}>
                    <Link href="/(tabs)" style={styles.backButton}>
                        <Text>Go back to list</Text>
                    </Link>
                    <Text style={styles.itemHeaderText}>{item.name}</Text>
                </View>
                <View style={styles.content}>
                    <Text>Item Name</Text>
                    <Text>{item.name}</Text>
                    <Text>Item Description</Text>
                    <Text>{item.description}</Text>
                    <Text>Created</Text>
                    <Text>{item.created}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "hsl(64, 60%, 77%)",
    },
    content: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: "hsl(64, 60%, 77%)",
    },
    itemHeader: {
        backgroundColor: "#f1f7b7",
        padding: 10,
    },
    itemHeaderText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    backButton: {
        padding: 12,
    },
    editButton: {
        padding: 10,
        backgroundColor: "darkblue",
        marginVertical: 20,
    },
    editButtonText: {
        color: "white",
        textAlign: "center"
    },
    editButtonDisabled: {
        display: "none"
    }
})