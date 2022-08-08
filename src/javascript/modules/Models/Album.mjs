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
    constructor(albumObject) {
        this.#title = albumObject.title;
        this.#albumArt = albumObject.albumArt;
        this.#artist = albumObject.artist;
        this.#releasedDate = albumObject.releaseDate;
        this.#recommendation = albumObject.recommendation;
        this.#genre = albumObject.genre;
        for (let track of albumObject.recommendedTracks) {
            this.#tracks.push(track);
        }
        this.#itemObject = albumObject;
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

export const AlbumFields = {
    artist: 0,
    recommendation: 1,
    genre: 2,
    releasedDate: 3,
};