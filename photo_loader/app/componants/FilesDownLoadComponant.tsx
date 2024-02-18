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
    const [listResult, setListResult] = useState<ListResult>()

  useEffect(()=> {
    //props.fileRefQueryGateway.getMaxFilesNamesPerPage(1).then(fileNames => setFileNames(fileNames))
    pageTokenExample().then(fileNames => setFileNames(fileNames))
    
 }
  , [fileNames])

  const listRef = ref(storage, 'files');

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

    return (
       <div>
        {
            fileNames.map(fileName => <FileDownloadComponant downloadGateway={props.downloadGateway} fileName={fileName}/>)
        }
        {
            next && (<button >Next</button>)
        }
       </div>
    )
}
