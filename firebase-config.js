// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCq7DRmXMX2r979gSEzJJjx-FyBCN76DYI',
  authDomain: 'advik-marketing.firebaseapp.com',
  projectId: 'advik-marketing',
  storageBucket: 'advik-marketing.firebasestorage.app',
  messagingSenderId: '226601983329',
  appId: '1:226601983329:web:2fbff7f53b982ea6bdf920',
  measurementId: 'G-1Y2FHHVQ09',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
