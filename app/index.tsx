import { View, Text, StyleSheet } from 'react-native'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useUser } from '@/contexts/UserContext'

export default function Login() {
    const user = useUser()
    return(
        <SafeAreaView>
            <View>
                <Text>Login</Text>
                <Link href="/signup">
                    <Text>Go to Sign up and test</Text>
                </Link>
            </View>
        </SafeAreaView>
    )
}
