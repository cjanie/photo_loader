import { join } from "path"
import { useState } from "react"
export default function FileSelectionComponant() {

    const [file, setFile] = useState<File>()
    const [path, setPath] = useState<string>()

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!file) return

        try {

            const data = new FormData()
            data.set('file', file)

            const res = await fetch('api/upload', {
                method: 'POST',
                body: data
            })

            const path = join('/', 'temp', file.name)
            setPath(path)

            // Handle the res error
            if(!res.ok) throw new Error(await res.text())

        } catch (e: any) {
            // Handle errors
            console.error(e)
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
    
          <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
            <form onSubmit={onSubmit} className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
              <input 
                type="file" 
                name="file" 
                onChange={(e) => setFile(e.target.files?.[0])}
                />
              <input type="submit" value="Upload"/>
            </form>
          </div>

          <p>{file?.name}</p>

          <p>{path}</p>
          
        </main>)
}