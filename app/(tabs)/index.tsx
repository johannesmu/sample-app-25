import { Image, StyleSheet, Platform, View, Text } from 'react-native';
import { useState, useEffect } from 'react'
//import { useUser } from '@/contexts/UserContext';

export default function HomeScreen() {
  const[ email, setEmail ] = useState<any>('')
  //const user = useUser()
  
  // useEffect( () => {
  //   setEmail( user )
  // }, [user])
  return (
    <View style={ styles.container }>
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "hsl(64, 60%, 77%)",
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
