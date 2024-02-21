import { DownloadGateway } from "../gateways/DownloadGateway";
import FilesDownloadComponant from "./FilesDownLoadComponant";

interface WebSite {
    downloadGateway: DownloadGateway,
    fileRefQueryGateway: FileRefQueryGateway,
    subDirectoryName: string
}

export default function WebSiteComponant(props: WebSite) {
    return (
        <div className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            <h1>Website</h1>
            <h2>{props.subDirectoryName}</h2>
            <FilesDownloadComponant 
                downloadGateway={props.downloadGateway} 
                fileRefQueryGateway={props.fileRefQueryGateway}
                subDirectoryName={props.subDirectoryName}
                imageSize={500}
                />
        </div>
    )
}