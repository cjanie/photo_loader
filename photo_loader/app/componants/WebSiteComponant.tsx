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
            <FilesDownloadComponant 
                downloadGateway={props.downloadGateway} 
                fileRefQueryGateway={props.fileRefQueryGateway}
                subDirectoryName={props.subDirectoryName}
                imageSize={500}
                />
        </div>
    )
}