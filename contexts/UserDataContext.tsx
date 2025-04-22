import { ID, Permission, Role, Query } from "react-native-appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { databases } from "@/lib/appwrite";



export const USER_DATABASE_ID = "67ca3cc50035cb355681"; // Replace with your database ID
export const USER_COLLECTION_ID = "67ca3cdf00293f88ebd3"; // Replace with your collection ID

const DataContext = createContext<any>(null);

export function useData() {
  return useContext(DataContext);
}

export function DataProvider(props:any) {
  //const [ideas, setIdeas] = useState<any>([]);
  const [things, setThings ] = useState<any>([])


  async function add(item:any) {
    const response = await databases.createDocument(
      USER_DATABASE_ID,
      USER_COLLECTION_ID,
      ID.unique(),
      item,
      [
        Permission.write(Role.user(item.userId)),
        Permission.read(Role.user(item.userId)),
        Permission.update(Role.user(item.userId)),
        Permission.delete(Role.user(item.userId))
      ]
    );
    setThings((items:any) => [response, ...items].slice(0, 10));
  }

  async function remove(id:string) {
    await databases.deleteDocument(USER_DATABASE_ID, USER_COLLECTION_ID, id);
    setThings((things:any) => things.filter((thing:any) => thing.$id !== id));
    await init(); // Refetch ideas to ensure we have 10 items
  }
  // function to retrieve a single document
  async function getDoc( id:string ) {
    const result = await databases.getDocument(
      USER_DATABASE_ID,
      USER_COLLECTION_ID,
      id
    )
    return result
  }
  // function to update a document
  async function updateDoc( id:string, data:any ) {
    const update = await databases.updateDocument(
      USER_DATABASE_ID,
      USER_COLLECTION_ID,
      id,
      data
    )
    let items = [...things]
    items.forEach( (item:any, index:number) => {
      if( item.id == id ) {
        items[index] = update
      }
    })
    setThings( items )
    await init()
    //setThings((items:any) => [update, ...items].slice(0, 10))
  }


  async function init() {
    const response = await databases.listDocuments(
      USER_DATABASE_ID,
      USER_COLLECTION_ID,
      [Query.orderDesc("$createdAt"), Query.limit(10)]
    );
    setThings(response.documents);
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <DataContext.Provider value={{ current: things, add, remove, getDoc, updateDoc }}>
      {props.children}
    </DataContext.Provider>
  );
}
