import admin from 'firebase-admin';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import config from './env.config';

admin.initializeApp({
  credential: admin.credential.cert(config.firebase.adminConfig),
});
const auth = admin.auth();

const app = initializeApp(config.firebase.clientConfig);
const authentication = getAuth(app);

export { auth, authentication };
