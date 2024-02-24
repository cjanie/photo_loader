import { ReactNode, useEffect, useState } from "react";
import FileDownloadComponant from "./FileDownloadComponant";
import { DownloadGateway } from "../gateways/DownloadGateway";
import ImageComponant from "./global/ImageComponant";
import Image from "next/image";
import { BackButtonComponant, NextButtonComponant } from "./global/ArrowButtonComponant";
import { classNames } from "./style/classNames";

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

    const [currentPageFilesNames, setCurrentPageFilesNames] = useState<string[]>([])
    
    const [currentPageIndex, setCurrentPageIndex] = useState<number>(-1)

    const [changedDirectoryName, setChangedDirectoryName] = useState<string>()

    useEffect(()=> {
        if(changedDirectoryName !== props.subDirectoryName) {
            props.fileRefQueryGateway.resetPageTokenQuery()
            setChangedDirectoryName(props.subDirectoryName)
            initQuery()
        }
        
        if(pages.length == 0) {
            initQuery()
        } else {
            if(currentPageIndex > -1 && currentPageIndex < pages.length) {
                const backPage: DownloadPage = pages[currentPageIndex]
                setCurrentPageFilesNames(backPage.fileNames)
            } else {
                continueQuery()
            }
        }
    }, [currentPageIndex, props.subDirectoryName])


    const initQuery = () => {
        props.fileRefQueryGateway.initPageTokenQuery(props.subDirectoryName).then((pageToken) => {
            setCurrentPageFilesNames(pageToken.filesNames)
            const firstPage: DownloadPage = {fileNames: pageToken.filesNames}
            setPages([firstPage])
        })
    }
  
    const continueQuery = () => {
        props.fileRefQueryGateway.nextPageToken().then(((pageToken) => {
            setCurrentPageFilesNames(pageToken.filesNames)
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
        <main className={classNames.mainNoPadding}>

            <div className={classNames.containerFlexCenter}>
                        
                        <div className={classNames.notFixed}>
                            {
                                currentPageFilesNames.map(fileName => fileName && <FileDownloadComponant 
                                    key={fileName} 
                                    downloadGateway={props.downloadGateway} 
                                    subDirectoryName={props.subDirectoryName}
                                    fileName={fileName}
                                    imageSize={props.imageSize}/>)
                            }
                        </div>
                        
            </div>
            <div className={classNames.fixedBottomCenterNotStatic}>
                            {
                                currentPageIndex > 0 && (<BackButtonComponant onClick={onClickBack}/>)
                            }
                            <NextButtonComponant onClick={onClickNext}/>     
            </div>

        </main>   
        
    )
}



