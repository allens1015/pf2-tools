import services from '../handlers/services';

class Item {

    constructor(item) {
        /**
         * TOP LEVEL INFO
         **/

        this.id = item._id;
        this.name = item.name;

        /**
         * ADDITIONAL DETAILS
         * Some details not included in model but
         * stubbed out with a comment for future use
         **/

        // baseItem: null
        // brokenThreshold: {value: 0}
        // bulkCapacity: {value: ""}
        // collapsed: {value: false}
        // containerId: {value: ""}
        this.description = item.data.description.value;
        // equipped: {value: false}
        // equippedBulk: {value: ""}
        // hardness: {value: 0}
        // hp: {value: 0}
        // identification: {status: "identified"}
        // identified: {value: true}
        // invested: {value: false}
        this.level = item.data.level?.value;
        // maxHp: {value: 0}
        // negateBulk: {value: "0"}
        // originalName: ""
        // preciousMaterial: {value: ""}
        // preciousMaterialGrade: {value: ""}
        this.price = item.data.price.value;
        this.quantity = item.data.quantity?.value;
        this.rarity = item.data.traits.rarity.value;
        // rules: [{…}]
        this.size = item.data.size?.value;
        // source: {value: ""}
        // stackGroup: {value: ""}
        this.traits = item.data.traits.value;
        this.usage = item.data.usage?.value || item.data.traits?.usage?.value;
        this.weight = item.data.weight.value;
    }

}

class Items {

    constructor() {
        this.all = [];
    }

    fetchItem(name) {
        return this.all.findIndex((item) => item.name === name);
    }

    async loadItems() {
        const res = await services.item.fetchEquipment();

        res.results.forEach((data) => {
            this.all.push(new Item(data));
        });

        // console.log(this.all);
    }
}

const items = new Items();

export default items;
