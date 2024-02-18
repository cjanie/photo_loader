import { useEffect, useState } from "react"
import { SmallImageComponant } from "./ImageComponant";
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
        
            <div>
                {
                    downloadUrl && (
                        <div>
                            <SmallImageComponant src={downloadUrl} alt="download"/>
                            <p>{downloadUrl}</p>
                        </div> 
                    )
                }
            </div>
        
        )
}

