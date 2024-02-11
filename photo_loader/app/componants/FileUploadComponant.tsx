import { StorageReference, getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { useState } from "react"
import { storage } from "../firebase/firebase-config"
import { firebaseUploadAdapter } from "../firebase/firebaseUploadAdapter"

export default function FileUploadComponant() {

    const [file, setFile] = useState<File>()
    const [uploadResultUrl, setUploadResultUrl] = useState<string>()

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        upload()
    }

    const upload = async () => {
        if(!file) return

        console.log(file)

        const uploadResponse = await firebaseUploadAdapter.upload(file)
        setUploadResultUrl(uploadResponse.downloadUrl)
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

          <div>
            <h1>Upload Result Url</h1>
            <a href={uploadResultUrl}>
              <p>{uploadResultUrl}</p>
            </a>
          </div>
          
        </main>)
}