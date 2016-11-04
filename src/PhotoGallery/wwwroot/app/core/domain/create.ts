export class Create {
    public Title: string;
    public Description: string;
    public Username: string;
    constructor(title: string, description: string, username: string) {
        this.Title = title;
        this.Description = description;
        this.Username = username;
    }

}