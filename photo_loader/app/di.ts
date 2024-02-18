import { firebaseDownloadAdapter } from "./firebase/firebaseDownloadAdapter";
import { firebaseFileRefQueryAdapter } from "./firebase/firebaseFileRefQueryAdapter";
import { firebaseUploadAdapter } from "./firebase/firebaseUploadAdapter";
import { DownloadGateway } from "./gateways/DownloadGateway";
import { UploadGateway } from "./gateways/UploadGateway";

export interface DI {
    uploadGateway: UploadGateway,
    downloadGateway: DownloadGateway,
    fileRefQueryGateway: FileRefQueryGateway
}

export const di: DI = {
    uploadGateway: firebaseUploadAdapter,
    downloadGateway: firebaseDownloadAdapter,
    fileRefQueryGateway: firebaseFileRefQueryAdapter
  }