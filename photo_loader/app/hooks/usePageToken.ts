import { ListResult, list, ref } from "firebase/storage";
import { storage } from "../firebase/firebase-config";

export default async function usePageToken(maxResultPerPage: number) {

    const listRef = ref(storage, 'files');
    const firstPage: ListResult = await list(listRef, {maxResults: maxResultPerPage})

}