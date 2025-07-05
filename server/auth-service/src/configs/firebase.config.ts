import admin from 'firebase-admin';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import dotenv from 'dotenv';
dotenv.config();

const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG_ADMIN as string);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const auth = admin.auth();

const serviceClient = JSON.parse(process.env.FIREBASE_CONFIG_CLIENT as string);
const app = initializeApp(serviceClient);
const authentication = getAuth(app);

export { auth, authentication };
