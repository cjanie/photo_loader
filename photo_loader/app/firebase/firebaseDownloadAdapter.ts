import { getDownloadURL, ref } from "firebase/storage";
import { DownloadGateway } from "../gateways/DownloadGateway";
import { storage } from "./firebase-config";

export const firebaseDownloadAdapter: DownloadGateway = {
    getUrl: async () => getDownloadURL(ref(storage, 'files/Blondie.png'))
} 