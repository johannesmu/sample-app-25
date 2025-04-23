import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import { useState, useEffect } from 'react'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FormLabel } from '@/components/FormLabel'
import { useUser } from '@/contexts/UserContext'
import { router } from 'expo-router'

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [validPassword, setValidPassword] = useState(false)
    const [validEmail, setValidEmail] = useState(false)
    const [loading, setLoading] = useState<any>(false)

    const user = useUser()

    useEffect(() => {
        if (user.current) {
            router.navigate('/(tabs)')
        }
    }, [user])

    useEffect(() => {
        if (!loading && user.current) {
            router.navigate('/(tabs)')
            setLoading(true)
        }
    })

    useEffect(() => {
        // check password length
        if (password.length >= 8) {
            setValidPassword(true)
        }
        else {
            setValidPassword(false)
        }
    }, [password])

    useEffect(() => {
        if (email.includes('@') && email.indexOf('@') > 0) {
            setValidEmail(true)
        }
        else {
            setValidEmail(false)
        }
    }, [email])

    const signIn = async () => {
        await user.login(email, password)
        router.navigate('/(tabs)')
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.title}>Login to your account</Text>
                <FormLabel color="black" bg="transparent" text="Email" />
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={(val) => setEmail(val)}
                />
                <FormLabel color="black" bg="transparent" text="Password" />
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(val) => setPassword(val)}
                />
                <Pressable
                    style={(validPassword && validEmail) ? styles.button : styles.buttonDisabled}
                    disabled={(validPassword && validEmail) ? false : true}
                    onPress={() => signIn()}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>
                <Text>Don't have an account?</Text>
                <Link href="/signup">
                    <Text>Create an account</Text>
                </Link>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "hsl(64, 60%, 77%)"
    },
    form: {
        marginTop: 50,
        marginHorizontal: 40,
    },
    title: {
        fontSize: 32,
        textAlign: "center",
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
})