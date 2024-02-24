import { ChangeEvent } from "react"
import { classNames } from "../style/classNames"

interface Input {
    label: string,
    onchange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function InputComponant(props: Input) {
    return (
        <div className="flex w-full justify-between">
            <label>{props.label}</label>
            <span className="p-2"></span>
            <input 
            type="text"
            name={props.label}
            onChange={(e) => props.onchange(e)}/>
        </div>
    )
}