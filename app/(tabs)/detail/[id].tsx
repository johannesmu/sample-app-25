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
    const [name,setName] = useState<string>(defaultItem.name)
    const [description,setDescription] = useState<string>(defaultItem.description)
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
    

    useEffect(() => {
        // set item to default
        setItem(defaultItem)
        // show the spinner while loading
        setLoading(true)
        // get document when id changes
        data.getDoc(id)
            .then((res: any) => {
                setItem(res)
                setName( res.name )
                setDescription( res.description )
                setLoading(false)
            })

    }, [id])

    const updateData = () => {
    
    }
    // conditional view
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
                    <Text style={ styles.title }>Name</Text>
                    <TextInput 
                    style={ styles.input } 
                    value={name} 
                    onChangeText={(val) => setName(val) }
                    />
                    <Text style={ styles.title }>Description</Text>
                    <TextInput 
                        value={description} 
                        style={ styles.input }
                        multiline={true}
                        textAlignVertical='top'
                        onChangeText={(val) => setDescription(val)}
                    />
                    <Text style={ styles.title }>Created</Text>
                    <Text style={ styles.input }>
                        { item.created }
                    </Text>
                    <Pressable onPress={ () => updateData() }>
                        <Text>Update</Text>
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
})