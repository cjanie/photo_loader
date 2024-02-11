import { UploadResult, getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "./firebase-config"

export const firebaseUploadAdapter = {
    upload: async (file: File): Promise<string> => {
        const fileRef = ref(storage, 'files/' + file.name)
        const uploadResult: UploadResult = await uploadBytes(fileRef, file)
        return getDownloadURL(uploadResult.ref)
    }
}