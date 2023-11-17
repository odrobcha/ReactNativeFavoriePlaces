class Place {
    constructor (title, imageUri, address, location) {
        this.title = title;
        this.imageUri = imageUri;
        this.address = address;
        this.locaion = location;
        this.id = new Date().toString() + Math.random().toString();
    }
}
