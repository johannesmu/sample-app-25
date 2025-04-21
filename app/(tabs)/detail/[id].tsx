import { Text, View, StyleSheet, Pressable, TextInput, ActivityIndicator } from 'react-native'
import { useLocalSearchParams, Link, useNavigation } from 'expo-router'
import { useEffect, useContext, useState } from 'react'
import { Item } from '@/interfaces/Item'
import { useData } from '@/contexts/UserDataContext'
import { Ionicons } from '@expo/vector-icons'

export default function DetailScreen(props: any) {
    // default item
    const defaultItem: Item = { name: "", description: "", created: 0 }
    // state to store document
    const [item, setItem] = useState<Item>(defaultItem)
    // state for the inputs
    const [name, setName] = useState<string>(defaultItem.name)
    const [description, setDescription] = useState<string>(defaultItem.description)
    // state for the document if edited
    const [edited,setEdited] = useState<boolean>( false )
    // set to true to show spinner
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

    // handle document loading when id changes
    useEffect(() => {
        // set item to default
        setItem(defaultItem)
        // show the spinner while loading
        setLoading(true)
        // get document when id changes
        data.getDoc(id)
            .then((res: any) => {
                setItem(res)
                setName(res.name)
                setDescription(res.description)
                setLoading(false)
            })

    }, [id])

    // update item when name or description changes
    useEffect(() => {
        if (item.name != name || item.description != description) {
            let itemCopy = item
            itemCopy.name = name
            itemCopy.description = description
            setItem(itemCopy)
            setEdited( true )
        }
        else {
            setEdited( false )
        }
    }, [name, description])

    const updateData = () => {
        data.updateDoc(id,{name: name, description: description, created: item.created })
        .then( (res:any) => console.log(res))
    }
    // conditional view show spinner while loading is true
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
                    <Ionicons name="chevron-back" size={25} />
                    <Link href="/(tabs)">
                        <Text>Go back to list</Text>
                    </Link>
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>Name</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={(val) => setName(val)}
                    />
                    <Text style={styles.title}>Description</Text>
                    <TextInput
                        value={description}
                        style={styles.input}
                        multiline={true}
                        textAlignVertical='top'
                        onChangeText={(val) => setDescription(val)}
                    />
                    <Text style={styles.title}>Created</Text>
                    <Text style={styles.input}>
                        {item.created}
                    </Text>
                    <Pressable 
                        style={ (edited) ? styles.button : styles.buttonDisabled }
                        onPress={() => updateData()}
                    >
                        <Text style={ styles.buttonText }>Update</Text>
                    </Pressable>
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
        padding: 15,
    },
    container: {
        flex: 1,
        backgroundColor: "hsl(64, 60%, 77%)",
    },
    itemHeader: {
        backgroundColor: "#f1f7b7",
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        fontSize: 22,
        marginBottom: 5,
    },
    input: {
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor: "hsl(64, 60%, 95%)",
        marginBottom: 10,
    },
    button: {
        backgroundColor: "hsl(64, 60%, 35%)",
        marginVertical: 10,
        padding: 10,
    },
    buttonText: {
        color: "hsl(64, 60%, 95%)",
        textAlign: "center",
    },
    buttonDisabled: {
        backgroundColor: "hsl(64, 60%, 65%)",
        marginVertical: 10,
        padding: 10,
    }
})