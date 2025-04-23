import { StyleSheet, View, Text, FlatList, Modal } from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect } from 'react'
import { useUser } from '@/contexts/UserContext';
import { useData } from '@/contexts/UserDataContext';
import { Item } from '@/interfaces/Item';
import { ListItem } from '@/components/ListItem';

export default function Home() {
  const [items, setItems] = useState([])
  const user = useUser()


  const data = useData()
  useEffect(
    () => {
      setItems(data.current)
    },
    [data.current]
  )
  useEffect(() => {
    console.log(user)
  }, [user])
  // separator component for the list
  const Separator = () => {
    return(
      <View style={{height:1,backgroundColor: "hsl(64, 60%, 35%)"}}></View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>List</Text>
      </View>

      <FlatList
        data={items}
        renderItem={({ item }: any) => <ListItem name={item.name} id={ item.$id } />}
        keyExtractor={(item: any) => item.$id}
        ItemSeparatorComponent={Separator}
      />
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
  },
  headerText: {
    fontSize: 22,
    textAlign: "center",
  },
})
