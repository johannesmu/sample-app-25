import {View,Text,StyleSheet} from 'react-native'
export default function Home() {
    return(
        <View style={ styles.container }>
            <Text>Home</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "hsl(64, 60%, 77%)",
    }
})