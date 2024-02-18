import { useEffect, useState } from "react";
import { di } from "../di";
import FileDownloadComponant from "./FileDownloadComponant";
import { ListResult, listAll, ref } from "firebase/storage";
import { storage } from "../firebase/firebase-config";
import { DownloadGateway } from "../gateways/DownloadGateway";

interface FilesDownLoad {
    downloadGateway: DownloadGateway
}

export default function FilesDownloadComponant(props: FilesDownLoad) {

    
    const [fileNames, setFileNames] = useState<string[]>([])

  useEffect(()=> {
    filesStorage().then(fileNames => setFileNames(fileNames)) }
  , [fileNames])

  const filesStorage = async () => {

    // Create a reference under which you want to list
    const listRef = ref(storage, 'files');
    // Find all the prefixes and items.
    const listResult: ListResult = await listAll(listRef)

    var storedFilesNames: string[] = []
    listResult.items.forEach(storageReference => {
      console.log(storageReference.name + " full path = " + storageReference.fullPath)
      storedFilesNames.push(storageReference.name)
    })
    return storedFilesNames
  }

    return (
       <div>
        {fileNames.map(fileName => <FileDownloadComponant downloadGateway={props.downloadGateway} fileName={fileName}/>)}
       </div>
    )
}