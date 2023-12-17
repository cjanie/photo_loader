interface PersistanceGateway {
    persist: (files: File[]) => String[]
}

const persistanceGateway: PersistanceGateway = {
    persist: function (files: File[]): String[] {
        // Use Firebase
        throw new Error("Function not implemented.")
    }
}

const PersistPhotos = (persistanceGateway: PersistanceGateway, files: File[]) : String[] => {
    return persistanceGateway.persist(files)
}

