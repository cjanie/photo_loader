import { useEffect, useState } from "react"
import ImageComponant from "./ImageComponant";
import { DownloadGateway } from "../gateways/DownloadGateway";

interface FileDownload {
    downloadGateway: DownloadGateway,
    fileName: string
}

export default function FileDownloadComponant(props : FileDownload) {
    
    const [downloadUrl, setDownLoadUrl] = useState<string>()

    useEffect(() => getUrl(), [downloadUrl])

    const getUrl = () => {        
        props.downloadGateway.getUrl(props.fileName).then((url) => {
            setDownLoadUrl(url)
        })
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
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

