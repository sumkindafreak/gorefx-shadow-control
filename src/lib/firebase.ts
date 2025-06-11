
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AlzaSyCbBK1hwavHkKopd6cycSXOc8QQQhVPWYU",
  projectId: "hauntsync-forum-b99d2",
  projectNumber: "1039278802707"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
