import { useEffect, useState } from "react";
import FileDownloadComponant from "./FileDownloadComponant";
import { DownloadGateway } from "../gateways/DownloadGateway";
import next from "next";
import { ListResult, list, ref } from "firebase/storage";
import { storage } from "../firebase/firebase-config";

interface FilesDownLoad {
    downloadGateway: DownloadGateway,
    fileRefQueryGateway: FileRefQueryGateway
}

export default function FilesDownloadComponant(props: FilesDownLoad) {

    
    const [fileNames, setFileNames] = useState<string[]>([])
    const [nextFileNames, setNextFileNames] = useState<string[]>([])
    const [isNext, setIsNext] = useState<boolean>()

  useEffect(()=> {
    props.fileRefQueryGateway.getPageToken().then((pageToken) => {
        setFileNames(pageToken.page)
        setNextFileNames(pageToken.nextPage)
    })
    


    
 }
  , [fileNames, nextFileNames])

  
    const onNext = () => {
        setIsNext(true)
    }

    return (
       <div>
        {
            fileNames.map(fileName => <FileDownloadComponant key={fileName} downloadGateway={props.downloadGateway} fileName={fileName}/>)
        }
        {
            nextFileNames && (<button onClick={onNext}>Next</button>)
        }
        {
            isNext && nextFileNames.map(fileName => <FileDownloadComponant key={fileName} downloadGateway={props.downloadGateway} fileName={fileName}/>)
        }
       </div>
    )
}
