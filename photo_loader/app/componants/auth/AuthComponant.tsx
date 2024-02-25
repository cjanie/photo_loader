import { firebaseLoginAdapter } from "@/app/firebase/auth/firebaseLoginAdapter"
import { User } from "@/app/gateways/LoginGateway"
import firebase from "firebase/compat/app"
import { ChangeEvent, useState } from "react"
import InputComponant from "../global/InputComponant"
import { classNames } from "../style/classNames"
import { firebaseSignUpAdapter } from "@/app/firebase/auth/firebaseSignUpAdapter"

interface AuthProcess {
    setUserIn : (user: User) => void,
    onCancel: () => void
}

export default function AuthComponant(props: AuthProcess) {

    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [error, setError] = useState<string>()

    const onEmailFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const onPasswordFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const login = () => {
        if(email && password) {
            firebaseLoginAdapter
            .login(email, password)
            .then(user => props.setUserIn(user))
            .catch(error => setError(error.message))
        
        }
    }

    const signUp = () => {
        if(email && password) {
            firebaseSignUpAdapter
            .signUp(email, password)
                .then(user => {
                    props.setUserIn(user);
                })
                .catch(error => {
                    setError(error.message)
                });
        }
    }

    return (
        
            <div className={classNames.containerFlexCenter}>
            <form onSubmit={login} className="flex flex-col">
                <div className="p-2">
                    <InputComponant label="email" onchange={(e) => onEmailFileInputChange(e)}/>
                </div>
                <div className="p-2">
                    <InputComponant label="password" onchange={(e) => onPasswordFileInputChange(e)}/>
                </div>

                <div className="p-2">
                    <button type="submit" className="p-2 bg-emerald-800 text-white h-full w-full lg:rounded-xl " >
                    Login
                    </button>
                </div>
                <div className="p-2">
                    <button onClick={signUp} className="p-2 bg-emerald-800 text-white h-full w-full lg:rounded-xl ">Signup</button>
                </div>
                <div className="p-2">
                    <button onClick={() => props.onCancel} className="p-2 bg-red-800 text-white h-full w-full lg:rounded-xl " >
                    Cancel
                    </button>
                </div>
            </form>
            <p>{error}</p>  
            

            </div>
    )
}