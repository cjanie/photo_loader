import { ChangeEvent, useState } from "react"

export default function LoginComponant() {

    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()

    const onEmailFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const onPasswordFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {

    }

    const onSubmit = () => {

    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>Email</label>
                <input 
                type="text"
                name="email"
                onChange={(e) => onEmailFileInputChange(e)}/>

                <label>Password</label>
                <input 
                type="text"
                name="password"
                onChange={(e) => onPasswordFileInputChange(e)}/>

                <button type="submit"
                className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    Login
                </button>

            </form>
        </div>
    )
}