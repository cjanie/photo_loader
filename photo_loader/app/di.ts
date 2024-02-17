import { firebaseDownloadAdapter } from "./firebase/firebaseDownloadAdapter";
import { firebaseUploadAdapter } from "./firebase/firebaseUploadAdapter";

export const di = {
    uploadGateway: firebaseUploadAdapter,
    downloadGateway: firebaseDownloadAdapter
  }