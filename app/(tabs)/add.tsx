import { Image, StyleSheet, Platform, View, Text, TextInput, Pressable } from 'react-native';
import { useState, useEffect } from 'react'
import { useUser } from '@/contexts/UserContext';
import { useData } from '@/contexts/UserDataContext';
import { Item } from '@/interfaces/Item';
import { router } from 'expo-router';

export default function AddScreen() {
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [userUid, setUserUid] = useState<any>()

    const user = useUser()
    const data = useData()

    useEffect( () => {
        if( user.current ) {
            setUserUid( user.current.$id)
        }
        else {
            router.navigate('/signup')
        }
    }, [user])

    const addItem = () => {
        const time: number = new Date().getTime()
        const obj: Item = { name: name, description: description, created: time, userId : userUid }
        //data.add({ name:name, description:description,created:time })
        data.add(obj)
        router.navigate('/(tabs)')
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add a new item</Text>
            <View style={styles.form}>
                <Text>Item name (4 or more characters)</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={(val) => setName(val)}
                />
                <Text>Item description</Text>
                <TextInput
                    style={styles.input}
                    value={description}
                    onChangeText={(val) => setDescription(val)}
                />
                <Pressable 
                    style={(name.length > 3)? styles.button: styles.buttonDisabled}
                    onPress={ () => addItem() }
                    disabled={ (name.length > 3) ? false: true }
                >
                    <Text style={styles.buttonText}>Add</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "hsl(64, 60%, 77%)",
    },
    title: {
        fontSize: 18,
        marginHorizontal: 20,
        textAlign: "center",
    },
    form: {
        backgroundColor: "white",
        marginHorizontal: 10,
        padding: 20,
        marginVertical: 30,
    },
    input: {
        fontSize: 18,
        backgroundColor: "white",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "black",
        padding: 5,
    },
    button: {
        marginVertical: 15,
        padding: 10,
        backgroundColor: "hsl(64, 60%, 30%)",
    },
    buttonText: {
        textAlign: "center",
        color: "hsl(64, 60%, 90%)"
    },
    buttonDisabled: {
        backgroundColor: "hsl(64, 60%, 50%)",
        marginVertical: 15,
        padding: 10,
    }
});
