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
      temporary
    >
      <v-list
        nav
      >
        <v-list-item-group>
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
            class="pa-2 col-lg-4 col-md-6 col-sm-12"
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
    items: [
      {
        name: "",
        id: "",
        type: "",
        subtype: "",
        level: "",
        rarity: "",
        traits: []
      }
    ]
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
        //   itemData.subtype = item.data.group.value;
        //   itemData.level = item.data.level.value;
        //   itemData.rarity = item.data.traits.rarity.value;
        //   itemData.traits = item.data.traits.value;
          _items.push(itemData);
        }
        this.items = _items;    
      })
  },
  computed: {
    generatedResults() {
      let filteredItems = this.items;

      // filter by name
      if(this.itemName) {
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

      if(filteredItems.length === 1787) {
        return [];
      }

      return filteredItems;
    },
    generatedResultsCount() {
        return this.generatedResults.length || this.items.length;
    },
    generateDistinctType() {
      const types = [...new Set(this.items.map(item => (item.type)).sort((a,b) => ( a-b) ) )];
      return types;
    }
  }
}
</script>
