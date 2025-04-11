import {  StyleSheet, View, Text, FlatList, Modal } from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect } from 'react'
import { useUser } from '@/contexts/UserContext';
import { useData } from '@/contexts/UserDataContext';
import { Item } from '@/interfaces/Item';
import { ListItem } from '@/components/ListItem';

export default function Home() {
  const[ items, setItems ] = useState([])
  const[ modalVisible, setModalVisible ] = useState<boolean>( false )
  const user = useUser()
  // useEffect( () => {
  //   if(!user.current) {
  //     router.navigate('/signup')
  //   }
  // },[user])

  const data = useData()
  useEffect(
    () => {
      setItems( data.current )
      console.log(data)
    },
    [ data.current ]
  )

  return (
    <View style={ styles.container }>
      <Text>Home</Text>
      <FlatList 
      data={items}
      renderItem={ ({item}:any) => <ListItem name={item.name} /> }
      keyExtractor={(item:any) => item.$id }
      />
      <Modal visible={ modalVisible }>
        <View>

        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "hsl(64, 60%, 77%)",
  }
})
