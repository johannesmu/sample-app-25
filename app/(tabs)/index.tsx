import {  StyleSheet, View, Text } from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect } from 'react'
import { useUser } from '@/contexts/UserContext';

export default function Home() {
  const user = useUser()

  useEffect( () => {
    if(!user.current) {
      router.navigate('/signup')
    }
  },[user])


  return (
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
