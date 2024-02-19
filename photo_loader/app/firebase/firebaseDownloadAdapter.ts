import { getDownloadURL, ref } from "firebase/storage";
import { DownloadGateway } from "../gateways/DownloadGateway";
import { storage } from "./firebase-config";
import { fileNameQuery } from "./db/fileNameQuery";

export const firebaseDownloadAdapter: DownloadGateway = {
    getUrl: async (fileName: string) => getDownloadURL(ref(storage, 'files/' + fileName))
} 
