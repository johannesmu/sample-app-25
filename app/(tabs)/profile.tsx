import { Image, StyleSheet, Platform, View, Text, Pressable } from 'react-native';
import { useState, useEffect } from 'react'
// import { useUser } from '@/contexts/UserContext';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const[ email, setEmail ] = useState<any>('')
  // const user = useUser()
  
  // useEffect( () => {
  //   if( user.current ) {
  //     setEmail( user.current.email )
  //   }
  // }, [user])

  const signOut = async () => {
    // await user.logout()
    router.navigate("/signup")
  }
  return (
    <View style={ styles.container}>
      <Text>Profile</Text>
      <Text>{ email }</Text>
      <Pressable onPress={ () => signOut() }>
        <Text>Sign out</Text>
      </Pressable>
      <Pressable onPress={ () => router.navigate("/signup") }>
        <Text>Login Page</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "hsl(64, 60%, 77%)",
  },
})