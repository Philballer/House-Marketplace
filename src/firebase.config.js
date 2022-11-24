import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAisX2nFAOeWeNpYRQfLUcZCYJbA5Ae1nY',
  authDomain: 'house-marketplaceapp-bf5a2.firebaseapp.com',
  projectId: 'house-marketplaceapp-bf5a2',
  storageBucket: 'house-marketplaceapp-bf5a2.appspot.com',
  messagingSenderId: '36595816208',
  appId: '1:36595816208:web:330252568e058e5d427795',
  measurementId: 'G-FPN2SSTGEG',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore();
