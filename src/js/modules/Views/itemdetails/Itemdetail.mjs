"use strict";

import { AlbumDetails } from "../../Models/AlbumDetails.mjs";
import { ElementBuilder } from "../elementbuilder.mjs";
import { Divider } from "../viewutils/Divider.mjs";

const style = `
    <style>
        :host {
            z-index: 1;
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            grid-template-rows: 1fr;
            grid-template-columns: 1fr 1fr;
            background-color: white;
            align-items: center;
        }
        #button-back {
            position: absolute;
            top: 2.5%;
            left: 2.5%;
            width: 5%;
            height: 5%;
            border: none;
            background-color: transparent;
            background-repeat: no-repeat;
            cursor: pointer;
        }
        #section-info {
            padding: 0 25%;
        }
        #section-info p {
            font-weight: bolder;
            font-size: .6rem;
        }
        #album-streams {
            padding: 0;
        }
        #album-streams a {
            font-size: .7rem;
            text-decoration: none;
            color: black;
            border: 1px solid;
            border-radius: 5px;
            border-width: medium;
            padding: 0.2rem;
            box-shadow: 5px 5px black;
        }
        #section-info section #RT-title {
            font-size: .8rem;
            font-weight: bolder;
            margin: 10px 0;
        }
        #album-recommendedTracks div {
            font-size: .7rem;
        }
        #album-recommendedTracks div span:nth-child(2) {
            padding-left: 2.5%;
        }
        #divider {
            margin: 0 auto;
        }
        @media (max-width: 500px) {
            :host {
                width: 100vw;
                height: 100%;
                grid-template-columns: 1fr;
                grid-template-rows: 1fr 0 1fr;
                background-color: white;
                align-items: center;
            }
        }
    </style>
`;

const backgroundImageUrl = "./src/assets/images/icons/reshot-icon-angle-back-8E4DS2MACR.svg";
export class ItemDetail extends HTMLElement {
    #shadowRoot;
    #title;
    #artist;
    #releasedYear;
    #recommendation;
    #streams;
    #genre;
    #recommendedTracks;

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.innerHTML = style;
        this.#shadowRoot = shadowRoot;
        this.hide = this.hide.bind(this);
        this.#addBackButton();
        this.#addInfoSection();
        this.#addDivider();
    }

    #addBackButton() {
        const backButton = new ElementBuilder().of("button")
        .hasIdAs("button-back")
        .styledAs({
            backgroundImage: `url(${backgroundImageUrl})`,
        }).listeningOn("click", () => {
            this.#removeChildren(this.#recommendedTracks);
            this.#removeChildren(this.#streams);
            this.#enableItemListScroll();
            this.hide();
        }).build();

        this.#shadowRoot.appendChild(backButton);
    }

    #enableItemListScroll() {
        const myMusicDB = document.querySelector("my-music-db");
        const itemList = myMusicDB.shadowRoot.querySelector("item-list");
        itemList.style.overflow = "scroll";
    }

    #removeChildren(node) {
        if (!node) return;
        while (node.lastChild) {
            node.removeChild(node.lastChild);
        }
    }

    #addInfoSection() {
        const children = [];
        const title = new ElementBuilder().of("p").hasIdAs("album-title").build();
        this.#title = title;
        children.push(title);
        
        const artist = new ElementBuilder().of("p").hasIdAs("album-artist").build();
        this.#artist = artist;
        children.push(artist);
        
        const genre = new ElementBuilder().of("p").hasIdAs("album-genre").build();
        this.#genre = genre;
        children.push(genre);
        
        const recommendation = new ElementBuilder().of("p").hasIdAs("album-recommendation").build();
        this.#recommendation = recommendation;
        children.push(recommendation);
        
        const releasedYear = new ElementBuilder().of("p").hasIdAs("album-releasedYear").build();
        this.#releasedYear = releasedYear;
        children.push(releasedYear);
        
        const streams = new ElementBuilder().of("ul").hasIdAs("album-streams").build();
        this.#streams = streams;
        children.push(streams);
        
        const recommendedTracks = new ElementBuilder().of("section").hasIdAs("album-recommendedTracks").build();
        this.#recommendedTracks = recommendedTracks;
        children.push(recommendedTracks);
        
        const section = new ElementBuilder().of("section").hasIdAs("section-info").hasChildrenOf(children).build();
        this.#shadowRoot.appendChild(section);
    }


    #addItemInfo(itemObject) {
        const infoSection = this.#shadowRoot.querySelector("#section-info");
        this.#removeChildren(this.#streams);
        this.#removeChildren(this.#recommendedTracks);
        if (infoSection) {
            const albumDetails = new AlbumDetails(itemObject);
            
            this.#title.textContent = albumDetails.getTitleText();
            
            this.#artist.textContent = albumDetails.getArtistText();
            
            this.#genre.textContent = albumDetails.getGenreText();
            
            this.#recommendation.textContent = albumDetails.getRecommendationText();
            
            this.#releasedYear.textContent = albumDetails.getReleasedYearText();
            
            for (const [service, url] of albumDetails.getStreamList()) {
                const stream = new ElementBuilder().of("a").hasAttributeOf("href", url)
                .hasTextOf(service).build();
                this.#streams.appendChild(stream);
            }
            
            const tracksTitle = new ElementBuilder().of("strong").hasTextOf("Recommended Tracks").build();
            const recommendedTracksTitle = new ElementBuilder().of("p")
            .hasAttributeOf("id", "RT-title").hasChildrenOf([tracksTitle]).build();
            this.#recommendedTracks.appendChild(recommendedTracksTitle);

            for (const [head, tail] of albumDetails.getRecommendedTracks()) {
                const trackHead = new ElementBuilder().of("span").hasTextOf(head).build();
                const trackTail = new ElementBuilder().of("span").hasTextOf(tail).build();
                const trackBox = new ElementBuilder().of("div")
                .hasChildrenOf([trackHead, trackTail]).build();
                this.#recommendedTracks.appendChild(trackBox);
            }
        }
    }

    #addDivider() {
        const divider = new Divider();
        this.#shadowRoot.appendChild(divider);
    }

    #addItemImg(itemImg) {
        const imgContainer = this.#shadowRoot.querySelector("#img-container");
        if (imgContainer) {
            imgContainer.addImg(itemImg);
        }
    }

    addSingleImg(imgView) {
        if (imgView) {
            imgView.setAttribute("id", "img-container");
            this.#shadowRoot.appendChild(imgView);
        }
    }

    hide() {
        this.style.display = "none";
    }

    display() {
        this.style.display = "grid";
    }

    showItem(item) {
        this.#addItemInfo(item.getItemObject());
        this.#addItemImg(item.getAlbumArt());
        this.display();
    }
}

customElements.define("item-detail", ItemDetail);