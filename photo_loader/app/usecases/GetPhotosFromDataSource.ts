interface DataSource {
    getFiles: () => File[]
}

const dataSource: DataSource = {
    getFiles: function (): File[] {
        throw new Error("Function not implemented.")
    }
}

const GetPhotosFromDataSource = (dataSource: DataSource) : File[] => {
    return dataSource.getFiles()
}