// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAPbV6Ie-wEjs-T83i6QX4NLIfSXkg5b-8',
  authDomain: 'proshop-1a17e.firebaseapp.com',
  projectId: 'proshop-1a17e',
  storageBucket: 'proshop-1a17e.appspot.com',
  messagingSenderId: '484055063221',
  appId: '1:484055063221:web:fbaa543139296003b83cfc',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
