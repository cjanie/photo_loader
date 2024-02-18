import { useEffect, useState } from "react";
import FileDownloadComponant from "./FileDownloadComponant";
import { DownloadGateway } from "../gateways/DownloadGateway";

interface FilesDownLoad {
    downloadGateway: DownloadGateway,
    fileRefQueryGateway: FileRefQueryGateway
}

export default function FilesDownloadComponant(props: FilesDownLoad) {

    
    const [fileNames, setFileNames] = useState<string[]>([])

  useEffect(()=> {
    props.fileRefQueryGateway.getMaxFilesNamesPerPage(2).then(fileNames => setFileNames(fileNames)) }
  , [fileNames])

  

    return (
       <div>
        {fileNames.map(fileName => <FileDownloadComponant downloadGateway={props.downloadGateway} fileName={fileName}/>)}
       </div>
    )
}


