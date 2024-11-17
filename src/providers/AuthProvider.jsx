import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import { GoogleAuthProvider } from 'firebase/auth';
import useAxiosPublic from "../hooks/useAxiosPublic";



export const AuthContext = createContext(null)
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider ();
    const axiosPublic = useAxiosPublic ();

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


    const updateUserProfile = (name,photo) => {
      return  updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
          })
    }

    // google login

    const googleLogin = () => {
        setLoading (true)
        return signInWithPopup (auth,googleProvider)
    }

    // logout 
    const logOut = () => {
        setLoading (false)
        return signOut (auth)
    }


    useEffect ( () => {
        const unSubscribe = onAuthStateChanged (auth, currentUser => {
            setUser (currentUser);
             if (currentUser) {
                const userInfo = { email: currentUser.email };
                axiosPublic.post ('/jwt', userInfo)
                .then (res => {
                    if (res.data.token) {
                        localStorage.setItem ('access-token', res.data.token);
                    }
                })
             }
             else {
                localStorage.removeItem ('access-token')
             }
            setLoading (false)
        });
        return () => {
            return unSubscribe ();
        }
    } , [axiosPublic])
    const authInfo = {
           user,
           loading,
           crateUser,
           signIn,
           logOut,
           googleLogin,
           updateUserProfile
    }
  
    return (
       <AuthContext.Provider value={authInfo}>
             {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;