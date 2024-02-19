import { UploadResult, getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { STORAGE_DIRECTORY, storage } from "./firebase-config"
import { UploadGateway, UploadResponse } from "../gateways/UploadGateway"

export const firebaseUploadAdapter: UploadGateway = {
    upload: async (file: File): Promise<UploadResponse> => {
        const fileRef = ref(storage, STORAGE_DIRECTORY + '/' + 'egypt/' + file.name)
        const uploadResult: UploadResult = await uploadBytes(fileRef, file)
        const downloadUrl = await getDownloadURL(uploadResult.ref)
        return {
            downloadUrl: downloadUrl
        }
    }
}