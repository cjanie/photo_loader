import { ChangeEvent, useRef, useState } from "react"
import { firebaseUploadAdapter } from "../firebase/firebaseUploadAdapter"
import PreviewImageComponant from "./ImageComponant"
import LinkComponant from "./LinkComponant"

export default function FileUploadComponant() {

    const [file, setFile] = useState<File | undefined>()
    const [uploadResultUrl, setUploadResultUrl] = useState<string>()

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        await upload()
        removeFile()
    }

    const onFileInputChanged = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        setFile(e.target.files[0]);
      }
    }

    const removeFile = () => {
      setFile(undefined)
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
            <form onSubmit={onSubmit}>
              <input 
                accept="image/*"
                type="file" 
                name="file" 
                onChange={(e) => onFileInputChanged(e)}
                />
                {
                  file && 
                  (<div>
                    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                      <PreviewImageComponant src={URL.createObjectURL(file)} alt={"preview image " + file.name}/>
                    </div>
                    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                      <button type="submit">Upload</button>
                    </div>
                  </div>)
                }
            </form>
            {
              uploadResultUrl && 
              (<div>
                  <h1>Result Url</h1>
                  <LinkComponant url={uploadResultUrl}/>
              </div>)
            }
          </div> 
        </main>)
}