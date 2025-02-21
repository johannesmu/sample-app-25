import { View, Text, StyleSheet } from 'react-native'
import { Link } from 'expo-router'
export default function Signup() {
    return (
        <View>
            <Text>Signup</Text>
            <Link href="/">
                <Text>Go to Login</Text>
            </Link>
        </View>
    )
}