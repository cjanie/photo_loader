import { getDownloadURL, ref } from "firebase/storage"
import { storage } from "../firebase/firebase-config"
import { useState } from "react"

export default function FileDownloadComponant() {

    const [fileUrl, setFileUrl] = useState<string>()

    const download = async () => {
        const fileRef = ref(storage, 'files/')
        getDownloadURL(fileRef).then(url => setFileUrl(url))
        
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
    
          <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
            <p>{fileUrl}</p>
          </div>
          
        </main>
        )
}