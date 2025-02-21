import { View, Text, TextInput, StyleSheet } from 'react-native'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
export default function Signup() {
    return (

        <SafeAreaView style={ styles.container }>
            <View style={ styles.form }>
                <Text style={ styles.title }>Sign up for an account</Text>
                <Link href="/">
                    <Text>Go to Login</Text>
                </Link>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e3e8a2"
    },
    form: {
        marginTop: 50,
    },
    title: {
        fontSize: 32,
        textAlign: "center",
    },
})