import { firebaseLoginAdapter } from "@/app/firebase/auth/firebaseLoginAdapter"
import { User } from "@/app/gateways/LoginGateway"
import firebase from "firebase/compat/app"
import { ChangeEvent, useState } from "react"
import InputComponant from "../global/InputComponant"
import { classNames } from "../style/classNames"

interface Login {
    setUserIn : (user: User) => void,
    onCancel: () => void
}

export default function LoginComponant(props: Login) {

    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()

    const onEmailFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const onPasswordFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const onSubmit = () => {
        if(email && password) {
            const user = firebaseLoginAdapter.login(email, password)
        props.setUserIn(user)
        }
        
    }

    return (
        
            <div className={classNames.containerFlexCenter}>
            <form onSubmit={onSubmit} className="flex flex-col">
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
                    <button onClick={() => props.onCancel} className="p-2 bg-red-800 text-white h-full w-full lg:rounded-xl " >
                    Cancel
                    </button>
                </div>
            </form>
            

            </div>
    )
}