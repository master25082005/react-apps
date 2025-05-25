import logo from './logo.svg';
import './App.css';
import React, { useState , useEffect, use} from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { ref, set, onValue } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyAj2MSyezFTl13RZ9nsJ2OSPoxuytKUxOA",
  authDomain: "tytapp-c0387.firebaseapp.com",
  databaseURL: "https://tytapp-c0387-default-rtdb.firebaseio.com",
  projectId: "tytapp-c0387",
  storageBucket: "tytapp-c0387.firebasestorage.app",
  messagingSenderId: "87894773217",
  appId: "1:87894773217:web:ad533459adcf6ec797d6a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


function App() {
   const [count, setCount] = useState(0);
   const [discount, setDiscount] = useState(0);

  // Read count from DB
  useEffect(() => {
    const countRef = ref(database, 'count');
    onValue(countRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setCount(data);
      }
    });
  }, []);
  useEffect(() => {
    const discountref = ref(database,'discount');
    onValue(discountref, (snapshot)=>{
      const discountData = snapshot.val();
      if (discountData !== null) {
        setDiscount(discountData);
      } 
    });
  },[]);
   const handleClick = () => {
    set(ref(database, 'count'), count + 1);
  };
  const dislikehandler = () => {
    set(ref(database, 'discount'), discount + 1);
  }
  return (
   <>    
   <h1>Welcome to React</h1>
  <h1>Likes 👍: {count}</h1>
  <h1>Dislikes 👎: {discount}</h1>
  <button onClick={handleClick}>Like</button>
  <button onClick={dislikehandler}>Dislike</button>
  
    </>

  );
}

export default App;
