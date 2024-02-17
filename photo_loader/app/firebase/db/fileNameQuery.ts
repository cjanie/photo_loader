import { StorageReference, listAll, ref } from "firebase/storage";
import { storage } from "../firebase-config";

export const fileNameQuery: FileNameQueryGateway = {
    getFilesNames: () => {
        return ["Blondie.png", "Blonde.png"]
    }
}

