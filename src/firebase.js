import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyC69Ee2SlPzSD4xvl0HVIED3OVp15FYUG0',
	authDomain: 'todolistprogect.firebaseapp.com',
	projectId: 'todolistprogect',
	storageBucket: 'todolistprogect.firebasestorage.app',
	messagingSenderId: '191473204233',
	appId: '1:191473204233:web:91e3db7f038c09f33a8cd8',
	databaseURL: 'https://todolistprogect-default-rtdb.europe-west1.firebasedatabase.app',
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
