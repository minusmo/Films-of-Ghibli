export class CollectionInfoController {
    #collectionInfo;
    #collectionInfoView;
    constructor(collectionInfoModel, collectionInfoView) {
        this.#collectionInfoView = collectionInfoView;
        this.#collectionInfo = collectionInfoModel;
    }
    getCollectionName() {
        return this.#collectionInfo.collectionName;
    }
    getCollectionDescription() {
        return this.#collectionInfo.collectionDescription;
    }
    displayView() {
        this.#collectionInfoView.display();
    }
}