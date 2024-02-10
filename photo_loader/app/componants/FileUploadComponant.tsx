import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { useState } from "react"
import { storage } from "../firebase/firebase-config"

export default function FileUploadComponant() {

    const [file, setFile] = useState<File>()

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        upload()
    }

    const upload = async () => {
        if(!file) return

        console.log(file)

        const fileRef = ref(storage, 'files/' + file.name)
        uploadBytes(fileRef, file).then((data) => {
            getDownloadURL(data.ref).then((url) => console.log(url))
        })

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
          
        </main>)
}