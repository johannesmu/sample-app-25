import { Image, StyleSheet, Platform, View, Text, Pressable, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react'
import { useUser } from '@/contexts/UserContext';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const [email, setEmail] = useState<any>('')
  const user = useUser()

  useEffect(() => {
    if (user.current) {
      setEmail(user.current.email)
    }
  }, [user])

  const signOut = async () => {
    await user.logout()
    router.navigate("/signup")
  }
  if (email) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Profile</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Email</Text>
          <Text style={styles.input}>{email}</Text>
          <Pressable onPress={() => signOut()}>
            <Text>Sign out</Text>
          </Pressable>
        </View>

      </View>
    )
  }
  else {
    <View style={styles.loading}>
      <ActivityIndicator size={25} />
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "hsl(64, 60%, 77%)",
  },
  header: {
    backgroundColor: "#f1f7b7",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 22,
  },
  content: {
    padding: 10,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "hsl(64, 60%, 77%)",
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