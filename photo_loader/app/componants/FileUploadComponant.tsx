import { StorageReference, getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { ChangeEvent, useEffect, useState } from "react"
import { storage } from "../firebase/firebase-config"
import { firebaseUploadAdapter } from "../firebase/firebaseUploadAdapter"
import { Path, tempFileRepository } from "../gateways/TempFileRepository"
import { tempFilePathsStorage } from "../api/tempFilePathStorage"
import { set } from "firebase/database"
import Image from "next/image"

export default function FileUploadComponant() {

    const [file, setFile] = useState<File | undefined>()
    const [uploadResultUrl, setUploadResultUrl] = useState<string>()

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        await upload()
        removeFile()
    }

    const imageChanged = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        setFile(e.target.files[0]);
      }
    }

    const removeFile = () => {
      setFile(undefined);
    };

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
                accept="image/*"
                type="file" 
                name="file" 
                onChange={(e) => imageChanged(e)}
                />
                {
              file && 
              (<div>
                <Image src={URL.createObjectURL(file)} alt={"preview image"} width={600} height={600}/>
              </div>)
            }
              <input type="submit" value="Upload"/>
            </form>
            {
              file ? 
                <p>{file.name}</p>: null
              
            }
            
          </div>
          
            
              
            

          <div>
            <h1>Upload Result Url</h1>
            <a href={uploadResultUrl}>
              <p>{uploadResultUrl}</p>
            </a>
          </div>
          
        </main>)
}