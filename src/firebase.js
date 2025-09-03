
import { initializeApp } from "firebase/app";



import {createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword,signOut} from "firebase/auth";
import {addDoc, collection, getFirestore} from "firebase/firestore";
import { useId } from "react";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyD9N8m9t04dHomRH19EXvSkp5yNJ3ocZOM",
  authDomain: "netflix-clone-14382.firebaseapp.com",
  projectId: "netflix-clone-14382",
  storageBucket: "netflix-clone-14382.firebasestorage.app",
  messagingSenderId: "65664386714",
  appId: "1:65664386714:web:22e5820ba51b387d278123"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async(name ,email,password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db,"user"),{
                uid:user.uid,
                name,
                authProvider:"local",
                email,

        });
    }catch(error){
        console.log(error);
       toast.error(error.code.split('/')[1].split('-').join(" "));

    }

}
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
     toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

const logout=  async()=>{
    try {
    await signOut(auth);
  } catch (error) {
        console.log(error);
     toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

export { auth, db, login, signup, logout };