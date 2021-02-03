import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
//import { db } from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    async function signup(username, email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
        /*.then(() => {
            db.collection("users").doc(auth.currentUser.uid)
            .set({
                Userame: username
        })
    })*/
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    /*const fetchName=async()=>{
        const response=db.collection('users').doc(auth.currentUser.uid)
        const data=await response.get()
        data.docs.setName(data())
    }*/

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            //fetchName()
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        //fetchName
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
