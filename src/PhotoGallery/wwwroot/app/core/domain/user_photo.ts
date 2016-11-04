export class UserPhoto {
    Id: number;
    Title: string;
    Uri: string;
    AlbumId: number;
    AlbumTitle: string;
    Username: string;
    DateUploaded: Date

    constructor(id: number,
        title: string,
        uri: string,
        albumId: number,
        albumTitle : string,
        username: string,
        dateUploaded: Date) {
        this.Id = id;
        this.Title = title;
        this.Uri = uri;
        this.AlbumId = albumId;
        this.AlbumTitle = albumTitle; 
        this.Username = username;
        this.DateUploaded = dateUploaded;
    }
}