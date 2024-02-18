import { firebaseDownloadAdapter } from "./firebase/firebaseDownloadAdapter";
import { firebaseFileRefQueryAdapter } from "./firebase/firebaseFileRefQueryAdapter";
import { firebaseUploadAdapter } from "./firebase/firebaseUploadAdapter";

export const di = {
    uploadGateway: firebaseUploadAdapter,
    downloadGateway: firebaseDownloadAdapter,
    fileRefQueryGateway: firebaseFileRefQueryAdapter
  }