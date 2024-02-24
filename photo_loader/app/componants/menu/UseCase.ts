import { DownloadGateway } from "@/app/gateways/DownloadGateway"
import { UploadGateway } from "@/app/gateways/UploadGateway"

export interface UseCaseUser {
    useCaseUser: 'upload' | 'download' | 'website'
  }

export interface UseCaseWebSite {
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