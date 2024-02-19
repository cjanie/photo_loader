import { ListResult, StorageReference, list, listAll, ref } from "firebase/storage";
import { STORAGE_DIRECTORY, storage } from "./firebase-config";


// https://firebase.google.com/docs/storage/web/list-files?hl=fr

export const firebaseFileRefQueryAdapter: FileRefQueryGateway = {
    getFilesNames: () => {
        return listAllFilesNames()
    },
    initPageTokenQuery: (subDirectoryName: string) => {
      return initPageTokenQuery(subDirectoryName)
    },
    nextPageToken: () => {
      return nextPageToken()
    }
}

const listRef = (subDirectoryName: string) => ref(storage, `${STORAGE_DIRECTORY}/${subDirectoryName}`);

interface PageTokenQueryState {
  listResults: ListResult[],
  subDirectoryName: string
}
const queryState: PageTokenQueryState = {
  listResults: [],
  subDirectoryName: ''
}

const initPageTokenQuery = async (subDirectoryName: string): Promise<PageToken> =>  {
  const firstPage = await list(listRef(subDirectoryName), { maxResults: 1 })
  queryState.listResults.push(firstPage)
  queryState.subDirectoryName = subDirectoryName
  return {
    filesNames: firstPage.items.map(item => item.name),
  }
}

const nextPageToken = async (): Promise<PageToken> => {
  if(queryState.listResults.length > 0) {
    const currentPage = queryState.listResults[queryState.listResults.length - 1]
  if(currentPage.nextPageToken) {
    const nextPage = await list(listRef(queryState.subDirectoryName), {
      maxResults: 1,
      pageToken: currentPage.nextPageToken,
    });
    queryState.listResults.push(nextPage)
    return {
      filesNames: nextPage.items.map(item => item.name)
    }
  }
  }
  return {
    filesNames: []
  }
  
}

const listAllFilesNames = async () => {
  const allFilesListResult: ListResult = await listAll(listRef(queryState.subDirectoryName))
  var allFilesNames: string[] = []
  allFilesListResult.items.forEach(storageReference => {
    allFilesNames.push(storageReference.name)
  })
  return allFilesNames
}

