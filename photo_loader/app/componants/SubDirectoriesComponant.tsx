import { useEffect, useState } from "react"

export function SubDirectoriesComponant() {

    const [subDirectoriesNames, setSubdirectoriesNames] = useState<string[]>()

    useEffect(() => {
        const names = ['cairo', 'egypt']
        setSubdirectoriesNames(names)
    })

    return(
        <div>
            <ul>
                {
                    subDirectoriesNames?.map(name => <li key={name}>{name}</li>)
                }
                
            </ul>
        </div>
    )
}