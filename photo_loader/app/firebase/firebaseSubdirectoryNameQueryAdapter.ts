import { ListResult, listAll, ref } from "firebase/storage";
import { STORAGE_DIRECTORY, storage } from "./firebase-config";
import { SubDirectoryNameQueryGateway } from "../gateways/SubDirectoryNameQueryGateway";


export const firebaseSubdirectoryNameQueryAdapter: SubDirectoryNameQueryGateway = {
  getDirectoriesNames: () => listSubDirectoriesNames()
}
const listRef = ref(storage, `${STORAGE_DIRECTORY}`);

const listSubDirectoriesNames = async (): Promise<string[]> => {
    const subDirectoriesListResult: ListResult = await listAll(listRef)

    var subdirectoriesNames: string[] = subDirectoriesListResult.prefixes.map(prefix => prefix.name)
    
    return subdirectoriesNames
  }