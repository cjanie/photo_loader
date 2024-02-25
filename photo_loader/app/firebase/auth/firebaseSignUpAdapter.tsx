import { User } from "@/app/gateways/LoginGateway"
import { UserCredential, createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase-config"

export const firebaseSignUpAdapter = {
    signUp: (email: string, password: string) : Promise<User> => {
        return signUp(email, password)
    }
}

// https://medium.com/@chrissgodden/firebase-authentication-with-nextjs-ad7cafa095d
const signUp = async (email: string, password: string) : Promise<User> => {
    const userCredentials: UserCredential = await createUserWithEmailAndPassword(auth, email, password)
    if (userCredentials.user.email === null) {
        throw new Error("email null")
    } else {
        const user = {email: userCredentials.user.email}
        return user
    }
}