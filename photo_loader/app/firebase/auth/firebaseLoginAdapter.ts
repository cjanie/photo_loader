import { LoginGateway, User } from "@/app/gateways/LoginGateway";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithCredential, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { use } from "react";


export const firebaseLoginAdapter: LoginGateway = {
    login: (email: string, password: string): Promise<User> => {
        return login(email, password)
    }
}

const login = async (email: string, password: string): Promise<User> => {

    const userCredentials = await signInWithEmailAndPassword(auth, email, password)
    if(userCredentials.user.email === null) {
        throw new Error('email null')
    } else {
        const user = {email: userCredentials.user.email}
        return user
    }
}