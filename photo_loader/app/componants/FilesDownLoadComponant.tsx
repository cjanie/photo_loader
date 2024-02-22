import { ReactNode, useEffect, useState } from "react";
import FileDownloadComponant from "./FileDownloadComponant";
import { DownloadGateway } from "../gateways/DownloadGateway";
import ImageComponant from "./global/ImageComponant";
import Image from "next/image";
import { BackButtonComponant, NextButtonComponant } from "./global/ArrowButtonComponant";

interface FilesDownLoad {
    downloadGateway: DownloadGateway,
    fileRefQueryGateway: FileRefQueryGateway,
    subDirectoryName: string,
    imageSize: number
}

interface DownloadPage {
    fileNames: string[]
}

export default function FilesDownloadComponant(props: FilesDownLoad) {

    const [pages, setPages] = useState<DownloadPage[]>([])

    const [fileNames, setFileNames] = useState<string[]>([])
    
    const [currentPageIndex, setCurrentPageIndex] = useState<number>(-1)

    useEffect(()=> {
        if(pages.length == 0) {
            initQuery()
        } else {
            if(currentPageIndex > -1 && currentPageIndex < pages.length) {
                const backPage: DownloadPage = pages[currentPageIndex]
                setFileNames(backPage.fileNames)
            } else {
                continueQuery()
            }
            
            
            
            
        }
    }, [currentPageIndex])

    const initQuery = () => {
        props.fileRefQueryGateway.initPageTokenQuery(props.subDirectoryName).then((pageToken => {
            setFileNames(pageToken.filesNames)
            const firstPage: DownloadPage = {fileNames: pageToken.filesNames}
            setPages([firstPage])
        }))
    }
  
    const continueQuery = () => {
        props.fileRefQueryGateway.nextPageToken().then(((pageToken) => {
            setFileNames(pageToken.filesNames)
            const nextPage: DownloadPage = {fileNames: pageToken.filesNames}
            const allPages = pages
            allPages.push(nextPage)
            setPages(allPages)
        }))
    }

    const onClickNext = () => {
        setCurrentPageIndex(currentPageIndex + 1)
    }

    const onClickBack = () => {
        setCurrentPageIndex(currentPageIndex - 1)
    }

    

    return (
       <div className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        <BackButtonComponant onClick={onClickBack}/>
        {
            fileNames.map(fileName => fileName && <FileDownloadComponant 
                key={fileName} 
                downloadGateway={props.downloadGateway} 
                subDirectoryName={props.subDirectoryName}
                fileName={fileName}
                imageSize={props.imageSize}/>)
        }
        <NextButtonComponant onClick={onClickNext}/>
        
       </div>
    )
}

