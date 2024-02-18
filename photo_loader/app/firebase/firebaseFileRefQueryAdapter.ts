import { ListResult, list, listAll, ref } from "firebase/storage";
import { storage } from "./firebase-config";

export const firebaseFileRefQueryAdapter: FileRefQueryGateway = {
    getFilesNames: () => {
        return filesStorage()
    },
    getMaxFilesNamesPerPage: (maxResultPerPage: number) => {
        return pageToken(maxResultPerPage)
    },
    next: (maxResultsPerPage: number) => {
        return pageToken(maxResultsPerPage)
    }
}

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

  const listRef = ref(storage, 'files');

  const pageToken = async (maxResultPerPage: number) => {
    // Find all the prefixes and items.
    const listResult = await list(listRef, {maxResults: maxResultPerPage})
    //if(listResult.nextPageToken) return storedFilesNames(listResult.nextPageToken)

    
    return storedFilesNames(listResult)
}


const storedFilesNames = (listResult: ListResult) => {
    var storedFilesNames: string[] = []
    listResult.items.forEach(storageReference => {
      console.log(storageReference.name + " full path = " + storageReference.fullPath)
      storedFilesNames.push(storageReference.name)
    })
    return storedFilesNames
}



