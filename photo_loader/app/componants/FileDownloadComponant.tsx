import { useState } from "react"
import "firebase/storage";
import ImageComponant from "./ImageComponant";
import { DownloadGateway } from "../gateways/DownloadGateway";

interface FileDownload {
    downloadGateway: DownloadGateway
}

export default function FileDownloadComponant(props : FileDownload) {
    
    const [downloadUrl, setDownLoadUrl] = useState<string>()

    const getUrl = () => {        
        props.downloadGateway.getUrl().then((url) => {
            setDownLoadUrl(url)
        })
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <button className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
                onClick={getUrl}>Download</button>
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

