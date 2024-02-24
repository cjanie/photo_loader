import { getDownloadURL, ref } from "firebase/storage";
import { DownloadGateway } from "../gateways/DownloadGateway";
import { STORAGE_DIRECTORY as STORAGE_DIRECTORY_NAME, storage } from "./firebase-config";

export const firebaseDownloadAdapter: DownloadGateway = {
    getUrl: async (subDirectoryName: string, fileName: string) => getDownloadURL(ref(storage, `${STORAGE_DIRECTORY_NAME}/${subDirectoryName}/${fileName}`))
} 
