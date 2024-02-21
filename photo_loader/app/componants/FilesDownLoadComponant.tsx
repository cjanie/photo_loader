import { useEffect, useState } from "react";
import FileDownloadComponant from "./FileDownloadComponant";
import { DownloadGateway } from "../gateways/DownloadGateway";
import ImageComponant from "./ImageComponant";
import Image from "next/image";

interface FilesDownLoad {
    downloadGateway: DownloadGateway,
    fileRefQueryGateway: FileRefQueryGateway,
    subDirectoryName: string,
    imageSize: number
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
        props.fileRefQueryGateway.initPageTokenQuery(props.subDirectoryName).then((pageToken => {
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
       <div className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        {
            fileNames.map(fileName => fileName && <FileDownloadComponant 
                key={fileName} 
                downloadGateway={props.downloadGateway} 
                subDirectoryName={props.subDirectoryName}
                fileName={fileName}
                imageSize={props.imageSize}/>)
        }
        <button onClick={onClickNext}><Image src="/icons/right-arrow-backup-2-svgrepo-com.svg" alt="arrow" height={50} width={50}/></button>
        
       </div>
    )
}
