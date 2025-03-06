import { Client, Databases, Account } from "react-native-appwrite"

const client = new Client()
.setProject('67c0e32f002cdb733d1f')
.setPlatform('au.edu.nsw.ait.testapp');

export const account = new Account(client);
export const databases = new Databases(client);