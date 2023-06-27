export class Album {
    #albumArt;
    #artist;
    #producer;
    #releasedDate;
    #recommendation;
    #genre;
    #tracks = [];
    #itemObject;
    #title;
    #id;
    constructor(albumObject) {
        this.#id = albumObject.id;
        this.#title = albumObject.title;
        this.#albumArt = albumObject.albumArt;
        this.#artist = albumObject.artist;
        this.#releasedDate = albumObject.releasedYear;
        this.#recommendation = albumObject.recommendation;
        this.#genre = albumObject.genre;
        for (let track of albumObject.recommendedTracks) {
            this.#tracks.push(track);
        }
        this.#itemObject = albumObject;
    }

    getId() {
        return this.#id;
    }

    getTitle() {
        return this.#title;
    }

    getAlbumArt() {
        return this.#albumArt;
    }

    getArtist() {
        return this.#artist;
    }

    getReleasedDate() {
        return this.#releasedDate;
    }

    getRecommendation() {
        return this.#recommendation;
    }

    getGenre() {
        return this.#genre;
    }

    getTracks() {
        return this.#tracks;
    }

    getItemObject() {
        return this.#itemObject;
    }
}