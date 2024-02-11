import { StorageReference, getDownloadURL, list, ref } from "firebase/storage"
import { storage } from "../firebase/firebase-config"
import { useEffect, useState } from "react"
import "firebase/storage";


export default function FileDownloadComponant() {

    const [items, setItems] = useState<string[]>()
    const [error, setError] = useState<unknown | null>()


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

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
    
          <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
            <p>{items}</p>
            <p>{items?.length}</p>
            {error? <p>error</p>: null}
          </div>
          
        </main>
        )
}

