import { ID } from "react-native-appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { account } from "@/lib/appwrite";

const UserContext = createContext<any>(null);

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider(props:any) {
  const [user, setUser] = useState(null);

  async function login(email:string, password:string) {
    const loggedIn:any = await account.createEmailPasswordSession(email, password);
    setUser(loggedIn);
  }

  async function logout() {
    await account.deleteSession("current");
    setUser(null);
    // toast('Logged out');
  }

  async function register(email:string, password:string) {
    await account.create(ID.unique(), email, password);
    await login(email, password);
    // toast('Account created');
    return( user )
  }

  async function init() {
    try {
      const loggedIn:any = await account.get();
      setUser(loggedIn);
    //   toast('Welcome back. You are logged in');
    } catch (err) {
      setUser(null);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider value={{ current: user, login, logout, register }}>
      {props.children}
    </UserContext.Provider>
  );
}