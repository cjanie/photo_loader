import { ChangeEvent, useState } from "react"
import InputComponant from "../global/InputComponant"
import { classNames } from "../style/classNames"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/app/firebase/firebase-config"

interface SignUp {
    setUserIn : (user: User) => void,
    onCancel: () => void
}

export default function SignUpComponant(props: SignUp) {

    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [error, setError] = useState<string>()

    const onEmailFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const onPasswordFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const onSubmit = () => {
        if(email && password) {
            signUp(email, password)
        }
    }

    const signUp = (email: string, password: string) => {
        createUserWithEmailAndPassword(auth, email, password)
      .then(authUser => {
        console.log("Success. The user is created in Firebase")
        const user = {email: authUser.user.email}
        props.setUserIn(user);
      })
      .catch(error => {
        // An error occurred. Set error message to be displayed to user
        setError(error.message)
      });
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
                    SignUp
                    </button>
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