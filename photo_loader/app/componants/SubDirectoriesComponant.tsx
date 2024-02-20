import { useEffect, useState } from "react"
import { firebaseSubdirectoryNameQueryAdapter } from "../firebase/firebaseSubdirectoryNameQueryAdapter"

interface Selection {
    setSelectedValue: (name:string) => void,
    options: () => Promise<string[]>
}

export function SelectComponant(props: Selection) {

    const [value, setValue] = useState<string>()

    const [options, setOptions] = useState<string[]>([])

    useEffect(() => {
        props.options().then(names => {
            setOptions(names)
            setValue(names[0])
        })  
        if(value) props.setSelectedValue(value)
    }, [value])

    return(
        <div>
            <label>Select</label>
            <select onChange={(e) => {
                props.setSelectedValue(e.target.value)
                }}>
                {
                    options?.map(name => 
                    <option 
                    key={name} value={name}>{name}</option>)
                }
            </select>
        </div>
    )
}