"use strict";
import { GET_MUSIC } from "./modules/Models/DB/Credentials.mjs";
import { Album } from "./modules/Models/Album.mjs";
import { DataRetriever } from "./modules/Services/DataRetriever.mjs";
import { ItemListController } from "./modules/Services/ItemListController.mjs";
import { Deserializer } from "./modules/Services/Deserializer.mjs";
import { CollectionInfoController } from "./modules/Services/CollectionInfoController.mjs";
import { ItemDetail } from "./modules/Views/itemdetails/Itemdetail.mjs";
import { SingleImg } from "./modules/Views/itemdetails/SingleImg.mjs";
import { MyMusicDB } from "./modules/Views/MyMusicDB.mjs";
import { CollectionInfo } from "./modules/Views/ItemList/CollectionInfo.mjs";
import { ItemList } from "./modules/Views/ItemList/Itemlist.mjs";
import { Item } from "./modules/Views/ItemList/Item.mjs";
import { ItemCollection } from "./modules/Models/ItemCollection.mjs";
import { Divider } from "./modules/Views/utils/Divider.mjs";
import { SortSelection } from "./modules/Views/Forms/SortSelection.mjs";

async function main() {
    try {
        const dataRetriever = new DataRetriever(GET_MUSIC);
        const response = await dataRetriever.fetchData();
        const musicCollection = await response.json();

        const { collectionName, collectionDescription, items } = musicCollection;
        const albumDeserializer = new Deserializer(items, Album);
    
        const collectionInfo = new CollectionInfo();
        const collectionInfoController = new CollectionInfoController({
            collectionName,
            collectionDescription
        }, collectionInfo);
        collectionInfo.addController(collectionInfoController);
        
        const albumCollection = new ItemCollection(albumDeserializer.getDeserialized());
        const itemList = new ItemList(Item);
        const itemListController = new ItemListController(albumCollection, itemList);
        itemList.addController(itemListController);
        
        const optionValues = ["addedOrder", "artist", "recommendation", "releasedDate"];
        const sortSelection = new SortSelection(itemListController, optionValues);
        collectionInfo.addCollectionName();
        collectionInfo.addCollectionDescription();
        collectionInfo.addChild(sortSelection);
        const myMusicDB = new MyMusicDB();
        
        const itemdetail = new ItemDetail();
        const singleImg = new SingleImg();
        itemdetail.addSingleImg(singleImg);
        
        const divider = new Divider();
        myMusicDB.addChild(collectionInfo);
        myMusicDB.addChild(divider);
        myMusicDB.addChild(itemList);

        document.body.appendChild(myMusicDB);
        document.body.appendChild(itemdetail);
    }
    catch (error) {
        console.error(error);
    }
}
window.onload = () => {
    main();
};
