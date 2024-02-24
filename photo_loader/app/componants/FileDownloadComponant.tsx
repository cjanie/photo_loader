import { useEffect, useState } from "react"
import ImageComponant from "./global/ImageComponant";
import { DownloadGateway } from "../gateways/DownloadGateway";

interface FileDownload {
    key: string | undefined,
    downloadGateway: DownloadGateway,
    subDirectoryName: string,
    fileName: string
    imageSize: number
}

export default function FileDownloadComponant(props : FileDownload) {
    
    const [downloadUrl, setDownLoadUrl] = useState<string>()

    useEffect(() => getUrl(), [downloadUrl])

    const getUrl = () => {        
        props.downloadGateway.getUrl(props.subDirectoryName, props.fileName).then((url) => {
            setDownLoadUrl(url)
            console.log("download url = " + url)
        })
    }

    return (
            <div>
                {
                    downloadUrl && 
                    (<ImageComponant src={downloadUrl} alt={"download"} size={props.imageSize}/>)
                }
            </div>
        )
}

