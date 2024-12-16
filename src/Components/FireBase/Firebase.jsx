// Firebase.jsx
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore'; // Импортируем необходимые функции

// Ваши данные конфигурации Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDbdt16XudihxRTv-M-XztnSMn9ZFR825o",
  authDomain: "task-9e440.firebaseapp.com",
  projectId: "task-9e440",
  storageBucket: "task-9e440.firebasestorage.app",
  messagingSenderId: "8241484907",
  appId: "1:8241484907:web:88092211f8747a99a44d2e",
  measurementId: "G-LSGQWHCXXQ"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Инициализация Firestore
const db = getFirestore(app);

export { db, addDoc, collection };  // Экспортируем нужные функции
