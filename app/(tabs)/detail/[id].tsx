import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams, Link, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function DetailScreen(props: any) {
    // receive the id in the params
    const { id } = useLocalSearchParams()
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Link href="/(tabs)">
                    <Ionicons size={24} name="chevron-back" />
                    <Text style={styles.headerText}>Return to list</Text>
                </Link>
            </View>
            <Text>Detail for {id}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "hsl(64, 60%, 77%)",
    },
    header: {
        padding: 10,
        backgroundColor: "hsl(64, 60%, 55%)",
        flexDirection: "row",
        alignItems: "center",
    },
    headerText: {
        fontSize: 22,
        textAlign: "center",
    },
})