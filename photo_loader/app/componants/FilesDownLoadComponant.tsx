import { useEffect, useState } from "react";
import { di } from "../di";
import FileDownloadComponant from "./FileDownloadComponant";
import { ListResult, listAll, ref } from "firebase/storage";
import { storage } from "../firebase/firebase-config";
import { DownloadGateway } from "../gateways/DownloadGateway";

interface FilesDownLoad {
    downloadGateway: DownloadGateway,
    fileRefQueryGateway: FileRefQueryGateway
}

export default function FilesDownloadComponant(props: FilesDownLoad) {

    
    const [fileNames, setFileNames] = useState<string[]>([])

  useEffect(()=> {
    props.fileRefQueryGateway.getFilesNames().then(fileNames => setFileNames(fileNames)) }
  , [fileNames])

  

    return (
       <div>
        {fileNames.map(fileName => <FileDownloadComponant downloadGateway={props.downloadGateway} fileName={fileName}/>)}
       </div>
    )
}