export class Upload {
    public ID_Album: number;
    public files: File;
    constructor(id_album: number, file_array: File) {
        this.ID_Album = id_album;
        this.files = file_array;
        
    }
}