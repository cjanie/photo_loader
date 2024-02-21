import { DownloadGateway } from "../gateways/DownloadGateway";
import FilesDownloadComponant from "./FilesDownLoadComponant";

interface WebSite {
    downloadGateway: DownloadGateway,
    fileRefQueryGateway: FileRefQueryGateway,
    subDirectoryName: string
}

export default function WebSiteComponant(props: WebSite) {
    return (
        <div>
            <h1>Website</h1>
            <h2>{props.subDirectoryName}</h2>
            <FilesDownloadComponant 
                downloadGateway={props.downloadGateway} 
                fileRefQueryGateway={props.fileRefQueryGateway}
                subDirectoryName={props.subDirectoryName}
                imageSize={700}
                />
        </div>
    )
}