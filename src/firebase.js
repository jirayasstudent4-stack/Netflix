import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCWNmJ_JFwkyefLEHZVeKRQegmbXWRHqLs",
  authDomain: "netflix-3849d.firebaseapp.com",
  projectId: "netflix-3849d",
 storageBucket: "netflix-3849d.appspot.com",
  messagingSenderId: "319298890059",
  appId: "1:319298890059:web:0a82f5fdfe5fd8099860ce"
};
const app = initializeApp(firebaseConfig);

const auth= getAuth(app);
const db= getFirestore(app);

const signup = async(name,email,password)=>{
    try {
        const res =await createUserWithEmailAndPassword(auth,email,password);
        const user=res.user;
        await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider:"local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));

    }
}
const login =async(email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error);
         toast.error(error.code .split('/')[1].split('-').join(' '));
    }
}
const logout=()=>{
    signOut(auth);
}
export {auth,db,login,signup,logout};
