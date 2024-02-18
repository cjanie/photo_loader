import { ListResult, list, listAll, ref } from "firebase/storage";
import { storage } from "./firebase-config";

export const firebaseFileRefQueryAdapter: FileRefQueryGateway = {
    getFilesNames: () => {
        return filesStorage()
    },
    getPageToken: () => {
        return pageAndNext()
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

  

const pageAndNext = async(): Promise<PageToken> => {
    // https://firebase.google.com/docs/storage/web/list-files?hl=fr
    const listRef = ref(storage, 'files');
    const firstPage = await list(listRef, { maxResults: 1 });
    var secondPage = null
    if (firstPage.nextPageToken) {
        secondPage = await list(listRef, {
            maxResults: 1,
            pageToken: firstPage.nextPageToken,
          });
    }
    return {
        page: firstPage.items.map(item => item.name),
        nextPage: (secondPage as ListResult).items.map(item => item.name)
    }
  }



