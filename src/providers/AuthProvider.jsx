import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "../firebase/firebase.config";



export const AuthContext = createContext(null)
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    // create user
    const crateUser = (email,password) => {
        setLoading (true);
   return  createUserWithEmailAndPassword (auth,email,password)
    }
  
    //  login
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // logout 
    const logOut = () => {
        setLoading (false)
        return signOut (auth)
    }


    useEffect ( () => {
        const unSubscribe = onAuthStateChanged (auth, currentUser => {
            setUser (currentUser);
            console.log ('current user', currentUser)
            setLoading (false)
        });
        return () => {
            return unSubscribe ();
        }
    } , [])
    const authInfo = {
           user,
           loading,
           crateUser,
           signIn,
           logOut
    }
  
    return (
       <AuthContext.Provider value={authInfo}>
             {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;