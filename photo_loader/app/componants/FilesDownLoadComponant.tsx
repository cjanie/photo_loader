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
interface PageToken {
    firstPage: string[],
    secondPage: string[],

}
export default function FilesDownloadComponant(props: FilesDownLoad) {

    
    const [fileNames, setFileNames] = useState<string[]>([])
    const [nextFileNames, setNextFileNames] = useState<string[]>([])
    const [isNext, setIsNext] = useState<boolean>()

  useEffect(()=> {
    //props.fileRefQueryGateway.getMaxFilesNamesPerPage(1).then(fileNames => setFileNames(fileNames))
    //pageTokenExample().then(fileNames => setFileNames(fileNames))
    pageToken().then((pageToken) => {
        setFileNames(pageToken.firstPage)
        setNextFileNames(pageToken.secondPage)
    })
    


    
 }
  , [fileNames, nextFileNames])

  const listRef = ref(storage, 'files');

  async function pageToken(): Promise<PageToken> {
    const firstPage = await list(listRef, { maxResults: 1 });
    var secondPage = null
    if (firstPage.nextPageToken) {
        secondPage = await list(listRef, {
            maxResults: 1,
            pageToken: firstPage.nextPageToken,
          });
          // processItems(secondPage.items)
          // processPrefixes(secondPage.prefixes)
          
    }
    return {
        firstPage: firstPage.items.map(item => item.name),
        secondPage: (secondPage as ListResult).items.map(item => item.name)
    }
  } 

  async function pageTokenExample() : Promise<string[]>{
  
    // Fetch the first page of 1
    const firstPage = await list(listRef, { maxResults: 1 });
    
    // Fetch the second page if there are more elements.
    if (firstPage.nextPageToken) {
      return next(firstPage)
    } else {
        return firstPage.items.map(item => item.name)
    }
}

    const next = async (firstPage: ListResult) => {
        const secondPage = await list(listRef, {
            maxResults: 1,
            pageToken: firstPage.nextPageToken,
          });
          // processItems(secondPage.items)
          // processPrefixes(secondPage.prefixes)
          return secondPage.items.map(item => item.name)
    }

    const onNext = () => {
        setIsNext(true)
    }

    return (
       <div>
        {
            fileNames.map(fileName => <FileDownloadComponant downloadGateway={props.downloadGateway} fileName={fileName}/>)
        }
        {
            nextFileNames && (<button onClick={onNext}>Next</button>)
        }
        {
            isNext && nextFileNames.map(fileName => <FileDownloadComponant downloadGateway={props.downloadGateway} fileName={fileName}/>)
        }
       </div>
    )
}
