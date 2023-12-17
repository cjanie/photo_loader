const PersistPhotosViewModel = (persistanceGateway: PersistanceGateway, files: File[]): boolean => {
    const ids: String[] = PersistPhotos(persistanceGateway, files);
    
    return ids.length == files.length;
}