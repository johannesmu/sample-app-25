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
  const data = useData()

  useEffect(
    () => {
      setItems( data.current )
      console.log( data.current )
    },
    [ data.current ]
  )

  const Separator = () => {
    return(
      <View style={ styles.separator }></View>
    )
  }

  return (
    <View style={ styles.container }>
      <Text>Home</Text>
      <FlatList 
      data={items}
      renderItem={ 
        ({item}:any) => <ListItem name={item.name} id={item.$id }/> 
      }
      keyExtractor={(item:any) => item.$id }
      ItemSeparatorComponent={Separator}
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
  },
  separator: {
    height: 1,
    backgroundColor: "hsl(0, 0.00%, 50.60%)",

  },
})
