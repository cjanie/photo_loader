import { useEffect, useState } from "react";
import FileDownloadComponant from "./FileDownloadComponant";
import { DownloadGateway } from "../gateways/DownloadGateway";

interface FilesDownLoad {
    downloadGateway: DownloadGateway,
    fileRefQueryGateway: FileRefQueryGateway
}

export default function FilesDownloadComponant(props: FilesDownLoad) {

    
    const [fileNames, setFileNames] = useState<string[]>([])
    const [nextPageIndex, setNextPageIndex] = useState<number>(0) 

    

    useEffect(()=> {
        if(nextPageIndex == 0) {
            initQuery()
        } else {
            continueQuery()
        }
    }, [nextPageIndex])

    const initQuery = () => {
        props.fileRefQueryGateway.initPageTokenQuery('cairo').then((pageToken => {
            setFileNames(pageToken.filesNames)
        }))
    }
  
    const continueQuery = () => {
        props.fileRefQueryGateway.nextPageToken().then(((pageToken) => {
            setFileNames(pageToken.filesNames)
        }))
    }

    const onClickNext = () => {
        setNextPageIndex(nextPageIndex + 1)
    }

    return (
       <div>
        {
            fileNames.map(fileName => fileName && <FileDownloadComponant key={fileName} downloadGateway={props.downloadGateway} fileName={fileName}/>)
        }
        <button onClick={onClickNext}>Next</button>
       </div>
    )
}
