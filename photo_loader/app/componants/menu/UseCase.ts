import { DownloadGateway } from "@/app/gateways/DownloadGateway"
import { UploadGateway } from "@/app/gateways/UploadGateway"

export interface BoardUser {
    useCase: 'upload' | 'download' | 'website'
  }

export interface BoardVisitor {
  visitWebSite: 'website'
}

export interface UserDi {
  uploadGateway: UploadGateway,
  downloadGateway: DownloadGateway,
  fileRefQueryGateway: FileRefQueryGateway
}

export interface VisitorDi {
  downloadGateway: DownloadGateway,
  fileRefQueryGateway: FileRefQueryGateway
}