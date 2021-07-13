<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Item Browser</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
    >
      <v-list
        nav
      >
        <v-list-item-group>
          <v-list-item>
            <v-list-item-content>
              <v-select
                v-model="selectedSort"
                :items="sortTypes"
                label="Sort by"
              >
              </v-select>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-text-field
                v-model="itemName"
                type="text"
                label="Item Name"
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-select
                v-model="itemTypes"
                multiple
                :items="generateDistinctType"
                label="Item Type"
              ></v-select>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-select
                v-model="itemRarities"
                multiple
                :items="distinctItemRarities"
                label="Item Rarity"
              ></v-select>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container
        fluid
      >
        <v-row>
          <v-col
            v-for="(item,i) in generatedResults"
            :key="i"
            class="pa-2 col-lg-4 col-md-6 col-12"
          >
            <itemCard :item="item" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import itemCard from "@/components/itemCard.vue"

export default {
  name: 'Items',

  components: {
    itemCard
  },

  data: () => ({
    drawer: false,
    rawData: null,
    itemName: '',
    itemTypes: [],
    itemRarities: [],
    distinctItemRarities: [
      "common",
      "uncommon",
      "rare",
      "unique"
    ],
    selectedSort: "a-z",
    sortTypes: [
      "a-z",
      "z-a",
      "level",
      "price (high to low)",
      "price (low to high)"
    ],
    items: []
  }),
  mounted () {
    this.$http
      .get("https://api.pathfinder2.fr/v1/pf2/equipment",{
        headers: {
          Authorization: '4a2e270a-0c8e-4018-8a4f-d15f3c81d66c' 
        }
      })
      .then(response => (this.rawData = response))
      .then(()=> {
        const _items = [];
        for (let item of this.rawData.data.results) {
          const itemData = {};
        //   const school = this.distinctSchools.find(element => element.displayName.toLowerCase() === spell.data.school.value.toLowerCase());
          itemData.name = item.name;
          itemData.id = item._id;
          itemData.type = item.type;
          itemData.description = item.data.description.value;
          itemData.rarity = item.data.traits.rarity.value;
        //   itemData.subtype = item.data.group.value;
          itemData.level = 0;
          if(item.data.level) {
            if(typeof item.data.level.value !== "undefined") {
              itemData.level = parseInt(item.data.level.value);
              if(isNaN(itemData.level)) {
                itemData.level = 0;
              }
            }
          }
          // need to separate into price.value/price.currency
          itemData.price = {};
          itemData.price.display = "-";
          if(item.data.price) {
            itemData.price.display = item.data.price;
            if(typeof item.data.price.value !== "undefined") {
              itemData.price.display = item.data.price.value;
            }
          }
          itemData.price.value = String(itemData.price.display).replace(',','').replace(/(\d+).*/,"$1");
          itemData.price.currency = {};
          itemData.price.currency.value = String(itemData.price.display).replace(/.*([gsc]p)/,"$1");
          itemData.price.currency.mag = 100;
          if(itemData.price.currency.value.toLowerCase() == "sp") {
            itemData.price.currency.mag = 10;
          }
          if(itemData.price.currency.value.toLowerCase() == "cp") {
            itemData.price.currency.mag = 1;
          }

        //   itemData.rarity = item.data.traits.rarity.value;
          itemData.traits = item.data.traits.value;
          _items.push(itemData);
        }
        this.items = _items;    
      })
  },
  computed: {
    generatedResults() {
      let filteredItems = this.items;

      // filter by name
      if(this.itemName.length > 2) {
        let filteredByName = filteredItems.filter(obj => (obj.name.toLowerCase().indexOf(this.   itemName.toLowerCase()) != -1));
        filteredItems = filteredByName;
      }

      // filter by type (multiple)
      if(this.itemTypes.length) {
        let filteredBytypes = [];
        for(const type of this.itemTypes) {
          let itemFilter = [];
          itemFilter = filteredItems.filter(obj => (obj.type === type));
          filteredBytypes = filteredBytypes.concat(itemFilter);
        }
        filteredItems = filteredBytypes;
      }

      // filter by rarity (multiple)
      if(this.itemRarities.length) {
        let filteredByRarities = [];
        for(const rarity of this.itemRarities) {
          let itemFilter = [];
          itemFilter = filteredItems.filter(obj => (obj.rarity === rarity));
          filteredByRarities = filteredByRarities.concat(itemFilter);
        }
        filteredItems = filteredByRarities;
      }

      if(filteredItems.length === 1787) {
        return [];
      }

      // sort here
      if(this.selectedSort == "a-z") {
        filteredItems.sort((a,b) => (a.name > b.name) ? 1 : -1)
      }
      else if(this.selectedSort == "z-a") {
        filteredItems.sort((a,b) => (a.name > b.name) ? -1 : 1)
      }
      else if(this.selectedSort == "level") {
        filteredItems.sort((a,b) => (a.level > b.level) ? 1 : -1)
      }
      else if(this.selectedSort == "price (high to low)") {
        filteredItems.sort((a,b) => (a.price.value * a.price.currency.mag > b.price.value * b.price.currency.mag) ? -1 : 1)
      }
      else if(this.selectedSort == "price (low to high)") {
        filteredItems.sort((a,b) => (a.price.value * a.price.currency.mag > b.price.value * b.price.currency.mag) ? 1 : -1)
      }

      return filteredItems;
    },
    generatedResultsCount() {
        return this.generatedResults.length || this.items.length;
    },
    generateDistinctType() {
      const types = [...new Set(this.items.map(item => (item.type)).sort((a,b) => (a > b) ? 1 : -1 ) )];
      return types;
    }
  }
}
</script>
