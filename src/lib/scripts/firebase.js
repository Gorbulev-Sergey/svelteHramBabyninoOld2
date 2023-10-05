import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyDqpVHXmSEggGVi0YFugdvEoloTfgmUSPU',
	authDomain: 'hramkuksha.firebaseapp.com',
	databaseURL: 'https://hramkuksha-default-rtdb.firebaseio.com',
	projectId: 'hramkuksha',
	storageBucket: 'hramkuksha.appspot.com',
	messagingSenderId: '361128708836',
	appId: '1:361128708836:web:539e4ad77d70703d097af1',
	measurementId: 'G-ZWLBYZXV33'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
auth.languageCode = 'ru';
export const db = getDatabase(app);
export const storage = getStorage(app);
