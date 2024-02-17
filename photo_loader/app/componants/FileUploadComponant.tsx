import { ChangeEvent, useState } from "react"
import { firebaseUploadAdapter } from "../firebase/firebaseUploadAdapter"
import ImageComponant from "./ImageComponant"
import LinkComponant from "./LinkComponant"
import { UploadGateway } from "../gateways/UploadGateway"

interface FileUpload {
  uploadGateway: UploadGateway
}

export default function FileUploadComponant(props: FileUpload) {

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

        const uploadResponse = await props.uploadGateway.upload(file)
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
                      <ImageComponant src={URL.createObjectURL(file)} alt={"preview image " + file.name}/>
                    </div>
                    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                      <button className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
                        type="submit">Upload</button>
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