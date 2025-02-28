import {View, Text, StyleSheet} from 'react-native'

export function FormLabel( props:any ) {
    const styles = StyleSheet.create({
        label: {
            marginTop: 10,
            marginBottom: 3,
            backgroundColor: props.bg,
        }
    })
    return (
        <View style={ styles.label }>
            <Text style={{ color: props.color }}>{ props.text }</Text>
        </View>
    )
}

