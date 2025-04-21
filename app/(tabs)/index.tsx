import { StyleSheet, View, Text, FlatList, Modal } from 'react-native';
import { Link, router } from 'expo-router';
import { useState, useEffect } from 'react'
import { useUser } from '@/contexts/UserContext';
import { useData } from '@/contexts/UserDataContext';
import { Item } from '@/interfaces/Item';
import { ListItem } from '@/components/ListItem';

export default function Home() {
  const [items, setItems] = useState([])
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const user = useUser()
  const data = useData()

  useEffect(
    () => {
      setItems(data.current)
    },
    [data.current]
  )

  const Separator = () => {
    return (
      <View style={styles.separator}></View>
    )
  }

  const Empty = () => {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>You don't have any items</Text>
        <Link style={styles.addButton} href="/(tabs)/add">Add an item</Link>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={ styles.header }>
        <Text style={ styles.headerText }>Home</Text>
      </View>

      <FlatList
        style={styles.list}
        data={items}
        renderItem={
          ({ item }: any) => <ListItem name={item.name} id={item.$id} />
        }
        keyExtractor={(item: any) => item.$id}
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={<Empty />}
      />
      <Modal visible={modalVisible}>
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
  header: {
    backgroundColor: "#f1f7b7",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 22,
  },
  list: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: "hsl(0, 0.00%, 50.60%)",
  },
  empty: {
    height: "100%",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 24,
    color: "hsl(0, 0.00%, 50.60%)",
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "hsl(64, 60%, 50%)",
    padding: 5,
  },
})
