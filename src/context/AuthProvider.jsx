import { createContext, useEffect, useState, useCallback } from "react";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut, 
    GoogleAuthProvider, 
    signInWithPopup,
    updateProfile
} from "firebase/auth";
import app from "../firebase/firebase.config.js";
import axios from 'axios';
import { configureInterceptors } from '../api/axiosSecure';

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    //Server URL
    const serverURL = import.meta.env.VITE_SERVER_URL; 

    // Register with Email/Password
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, password);
    };

    // Login with Email/Password
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Update User Profile
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        });
    };

    // Google Login
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // Logout function wrapped in useCallback for dependency optimization
    const logOut = useCallback(() => {
        setLoading(true);
        return axios.post(`${serverURL}/logout`, {}, { withCredentials: true }) 
            .then(res => {
                console.log('Logged out from server and token removed', res.data);
                return signOut(auth);
            })
            .catch(error => {
                console.error("Logout error (server side):", error);
                return signOut(auth);
            });
    }, [serverURL]);

    
    useEffect(() => {
       
        configureInterceptors(logOut); 
    }, [logOut]);

    // Auth State Observer
    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            if (loading) {
                setLoading(false);
                console.log("Loading stopped by timeout.");
            }
        }, 5000);

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            clearTimeout(loadingTimeout);

            if (currentUser) { 
                const userInfo = { email: currentUser.email };
                axios.post(`${serverURL}/jwt`, userInfo, { withCredentials: true })
                    .then(res => {
                        setLoading(false);
                    })
                    .catch(error => {
                        console.error("JWT creation error:", error);
                        setLoading(false);
                    });
            } else {
                setLoading(false);
            }
        });

        return () => {
            unsubscribe();
            clearTimeout(loadingTimeout);
        };
    }, [serverURL]);


    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        googleSignIn,
        updateUserProfile
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;