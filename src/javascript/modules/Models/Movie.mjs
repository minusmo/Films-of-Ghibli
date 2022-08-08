export class Movie {
    #id = "";
    #title = "";
    #originalTitle = "";
    #bannerImg = "";
    #posterImg = "";
    #director = "";
    #producer = "";
    #releaseDate = "";
    #runningTime = "";
    #description = "";

    constructor(movieObject) {
        if (movieObject) {
            this.#id = movieObject.id;
            this.#title = movieObject.title;
            this.#posterImg = movieObject.image;
            this.#originalTitle = movieObject.original_title;
            this.#bannerImg = movieObject.movie_banner;
            this.#producer = movieObject.producer;
            this.#description = movieObject.description;
            this.#releaseDate = movieObject.release_date;
            this.#runningTime = movieObject.running_time;
            this.#director = movieObject.director;
        }
    }

    getTitle() {
        return this.#title;
    }

    getOriginalTitle() {
        return this.#originalTitle;
    }

    getBannerImg() {
        return this.#bannerImg;
    }

    getPosterImg() {
        return this.#posterImg;
    }

    getProducer() {
        return this.#producer;
    }

    getDirector() {
        return this.#director;
    }

    getReleaseDate() {
        return this.#releaseDate;
    }

    getRunningTime() {
        return this.#runningTime;
    }
}

export const MovieFields = {
    title: 0,
    director: 1,
    producer: 2,
    releaseDate: 3,
    runningTime: 4,
};