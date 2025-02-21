import { View, Text, StyleSheet } from 'react-native'
import { Link } from 'expo-router'
export default function Login() {
    return(
        <View>
            <Text>Login</Text>
            <Link href="/signup">
                <Text>Go to Sign up</Text>
            </Link>
        </View>
    )
}