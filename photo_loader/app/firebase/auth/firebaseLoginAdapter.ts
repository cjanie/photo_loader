import { LoginGateway } from "@/app/gateways/LoginGateway";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";


export const firebaseLoginAdapter: LoginGateway = {
    login: (email: string, password: string) => {
        return {
            email: email
        }
    }
}

// https://medium.com/@chrissgodden/firebase-authentication-with-nextjs-ad7cafa095d
const login = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          // ...
          console.log("uid", uid)
        } else {
          // User is signed out
          // ...
          console.log("user is logged out")
        }
      });
}