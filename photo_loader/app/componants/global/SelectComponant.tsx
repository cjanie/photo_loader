import { useEffect, useState } from "react"

interface Selection {
    setSelectedValue: (value:string) => void,
    options: () => Promise<string[]>
}

export function SelectComponant(props: Selection) {

    const [value, setValue] = useState<string>()

    const [options, setOptions] = useState<string[]>([])

    useEffect(() => {
        props.options().then(options => {
            setOptions(options)
            setValue(options[0])
        })  
        if(value) props.setSelectedValue(value)
    }, [value])

    return(
            <select onChange={(e) => {
                props.setSelectedValue(e.target.value)
                }}
                >
                {
                    options?.map(option => 
                    <option 
                    key={option} value={option}>{option}</option>)
                }
            </select>
    )
}