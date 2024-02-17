import { StorageReference, getDownloadURL, list, ref } from "firebase/storage"
import { storage } from "../firebase/firebase-config"
import { useEffect, useState } from "react"
import "firebase/storage";
import ImageComponant from "./ImageComponant";

interface FileDownload {
    url: string
}

export default function FileDownloadComponant() {
    
    const [downloadUrl, setDownLoadUrl] = useState<string>()

    
    // const httpsReference = ref(storage, 'https://firebasestorage.googleapis.com/b/bucket/o/images%20stars.jpg')

    const getUrl = () => {
        //const httpsReference = ref(storage, 'https://firebasestorage.googleapis.com/v0/b/uploadtravelfile.appspot.com/o/files%2FBlondie.png?alt=media&token=e0a431c3-40b5-4f81-b144-d3248312d9f8')
        getDownloadURL(ref(storage, 'files/Blondie.png')).then((url) => {
            setDownLoadUrl(url)
        })
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <button onClick={getUrl}>DownloadImage</button>
            <div>
                {
                    downloadUrl && (
                        <div>
                            <ImageComponant src={downloadUrl} alt="download"/>
                            <p>{downloadUrl}</p>
                        </div> 
                    )
                }
            </div>
        </main>
        )
}

