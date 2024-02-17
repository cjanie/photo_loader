import { StorageReference, getDownloadURL, list, ref } from "firebase/storage"
import { storage } from "../firebase/firebase-config"
import { useEffect, useState } from "react"
import "firebase/storage";
import ImageComponant from "./ImageComponant";

interface FileDownload {
    url: string
}

export default function FileDownloadComponant() {

    const [items, setItems] = useState<string[]>()
    const [error, setError] = useState<unknown | null>()
    
    const [downloadUrl, setDownLoadUrl] = useState<string>()
    
    const path = `files/`;
    const reference: StorageReference = ref(storage, path);

    useEffect(() => {
        async () => {
            try {

                const result = await list(reference);
 
                const items = await Promise.all(
                    result.items.map(async (item) => {
                    const url = await getDownloadURL(item);
 
                    return url;
                })
          
                );
                setItems(items)

            } catch (e: unknown) {
                setError(e)
            }

        }
    }, [reference, setItems, setError])

    // Create a reference from an HTTPS URL
// Note that in the URL, characters are URL escaped!
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
    
          <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
            <p>{items}</p>
            <p>{items?.length}</p>
            {error? <p>error</p>: null}
          </div>
          
        </main>
        )
}

