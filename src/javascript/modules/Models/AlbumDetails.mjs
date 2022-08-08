export class AlbumDetails {
    #title;
    #artist;
    #genre;
    #recommendation;
    #releasedYear;
    #stream;
    #recommendedTracks;
    constructor(albumObject) {
        this.#title = albumObject.title;
        this.#artist = albumObject.artist;
        this.#genre = albumObject.genre;
        this.#recommendation = albumObject.recommendation;
        this.#releasedYear = albumObject.releasedYear;
        this.#stream = albumObject.stream;
        this.#recommendedTracks = albumObject.recommendedTracks;
    }

    getTitleText() {
        const textContent = `Title: ${this.#title}`;
        return  textContent;
    }

    getArtistText() {
        const textContent = `Artist: ${this.#artist}`;
        return  textContent;
    }
    getGenreText() {
        const textContent = `Genre: ${this.#genre}`;
        return  textContent;
    }
    getRecommendationText() {
        const textContent = `Recommendation: ${this.#recommendation}`;
        return  textContent;
    }
    getReleasedYearText() {
        const textContent = `Released Year: ${this.#releasedYear}`;
        return  textContent;
    }
    getStreamList() {
        return Object.entries(this.#stream);
    }
    getRecommendedTracks() {
        const recommendedTracksTexts = this.#recommendedTracks.map(track => {
            return [`${track.number}. ${track.title}`, track.playTime];
        });
        return recommendedTracksTexts;
    }
}