"use strict";
import { GET_MUSIC } from "./modules/Services/Credentials.mjs";
import { Album } from "./modules/Models/Album.mjs";
import { DataRetriever } from "./modules/Services/DataRetriever.mjs";
import { ItemListController } from "./modules/Services/ItemListController.mjs";
import { Deserializer } from "./modules/Services/Deserializer.mjs";
import { CollectionInfoController } from "./modules/Services/CollectionInfoController.mjs";
import { SingleItemView } from "./modules/Views/SingleItemView/SingleItemView.mjs";
import { SingleImgView } from "./modules/Views/SingleItemView/SingleImgView.mjs";
import { MainView } from "./modules/Views/MainView.mjs";
import { CollectionInfoView } from "./modules/Views/ItemListView/CollectionInfoView.mjs";
import { ItemListView } from "./modules/Views/ItemListView/ItemListView.mjs";
import { ItemView } from "./modules/Views/ItemListView/ItemView.mjs";
import { ItemCollection } from "./modules/Models/ItemCollection.mjs";

async function main() {
    try {
        const dataRetriever = new DataRetriever(GET_MUSIC);
        const response = await dataRetriever.fetchData();
        const musicCollection = await response.json();
        console.log(musicCollection);
        const { collectionName, collectionDescription, items } = musicCollection;
        const albumDeserializer = new Deserializer(items, Album);
    
        const collectionInfoView = new CollectionInfoView();
        const collectionInfoController = new CollectionInfoController({
            collectionName,
            collectionDescription
        }, collectionInfoView);
        collectionInfoView.addController(collectionInfoController);
    
        const albumCollection = new ItemCollection(albumDeserializer.getDeserialized());
        const itemListView = new ItemListView(ItemView);
        const itemListController = new ItemListController(albumCollection, itemListView);
        itemListView.addController(itemListController);
    
        const mainView = new MainView();
        
        const singleItemView = new SingleItemView();
        const singleImgView = new SingleImgView();
        singleItemView.addSingleImg(singleImgView);
        
        mainView.addChild(collectionInfoView);
        mainView.addChild(itemListView);
        document.body.appendChild(mainView);
        document.body.appendChild(singleItemView);
    }
    catch (error) {
        console.error(error);
    }
}
window.onload = () => {
    main();
};
