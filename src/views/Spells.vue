<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Spell Browser</v-toolbar-title>
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
                v-model="spellName"
                type="text"
                label="Spell Name"
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-text-field
                v-model="level"
                type="number"
                label="Spell Level"
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-select
                v-model="spellSchools"
                multiple
                :items="distinctSchools"
                item-text="displayName"
                item-value="displayName"
                label="Spell School"
              ></v-select>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-select
                v-model="spellLevelsTest"
                multiple
                :items="generateDistinctLevelsTest"
                label="Spell Level TEST"
              ></v-select>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-select
                v-model="spellRarity"
                multiple
                :items="distinctRarities"
                label="Rarity"
              ></v-select>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-select
                v-model="spellTraditions"
                multiple
                :items="distinctTraditions"
                label="Traditions"
              ></v-select>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-select
                v-model="spellComponents"
                multiple
                :items="distinctComponents"
                label="Components"
              ></v-select>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-dialog
        v-model="dialog"
      >
        <v-card>
          Testing...
          {{ dialogData.name }}
          {{ dialogData.level }}
          {{ dialogData.school }}
          {{ dialogData.rarity }}
          {{ dialogData.id }}
          <v-list>
            <v-list-item
              v-for="(tradition,i) in dialogData.traditions"
              :key="i"
            >
              <v-list-item-content>
                {{ tradition }}
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-dialog>
      <v-card>
        <v-card-title>{{ generatedResultsCount }}</v-card-title>
        <v-list>
          <v-list-item
            v-for="(spell,i) in generatedResults"
            :key="i"
          >
            <v-list-item-content>
              <v-btn
                color="primary"
                dark
                @click="toggleDialog(spell.id)"
              >
                {{ spell.name }}
              </v-btn>
              {{ spell.school }}: {{ spell.rarity }}: {{ spell.level }}: {{ spell.traditions }}: {{ spell.components }}
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    rawData: null,
    dialog: false,
    dialogData: {},
    drawer: false,
    level: '',
    spellName: '',
    spellSchools: [],
    spellLevelsTest: [],
    spellRarity: [],
    spellTraditions: [],
    spellComponents: [],
    spells: [
      {
        name: "",
        school: "",
        level: "",
        id: "",
        rarity: ""
      }
    ],
    distinctSchools: [
      { "name": "abj", "displayName": "Abjuration" },
      { "name": "con", "displayName": "Conjuration" },
      { "name": "div", "displayName": "Divination" },
      { "name": "enc", "displayName": "Enchantment" },
      { "name": "evo", "displayName": "Evocation" },
      { "name": "ill", "displayName": "Illusion" },
      { "name": "nec", "displayName": "Necromancy" },
      { "name": "trs", "displayName": "Transmutation" }
    ],
    distinctTraditions: [
      "focus",
      "ritual",
      "arcane",
      "divine",
      "occult",
      "primal"
    ],
    distinctRarities: [
      "common",
      "uncommon",
      "rare"
    ],
    distinctComponents: [
      "somatic",
      "verbal",
      "material"
    ]
  }),
  mounted () {
    this.$http
      .get("https://api.pathfinder2.fr/v1/pf2/spell",{
        headers: {
          Authorization: '4a2e270a-0c8e-4018-8a4f-d15f3c81d66c' 
        }
      })
      .then(response => (this.rawData = response))
      .then(()=> {
        const _spells = [];
        for (let spell of this.rawData.data.results) {
          const spellData = {};
          const school = this.distinctSchools.find(element => element.displayName.toLowerCase() === spell.data.school.value.toLowerCase());
          spellData.name = spell.name;
          spellData.id = spell._id;
          spellData.school = school.displayName;
          spellData.level = spell.data.level.value;
          spellData.rarity = spell.data.traits.rarity.value;
          spellData.traditions = spell.data.traditions.value;
          if(!spellData.traditions.length) {
            spellData.traditions = [spell.data.category.value];
          }
          spellData.components = spell.data.components.value;
          _spells.push(spellData);
        }
        this.spells = _spells;    
      })
  },
  methods: {
    toggleDialog(spellID) {
      this.dialog = !this.dialog;
      const spell = this.spells.filter(obj => (obj.id === spellID));
      this.dialogData = spell[0];
    }
  },
  computed: {
    generatedResults() {
      let filteredSpells = this.spells;
      
      // filter by school
      if(this.spellSchools.length) {
        let filteredBySchool = [];
        for(const school of this.spellSchools) {
          let schoolFilter = [];
          schoolFilter = filteredSpells.filter(obj => (obj.school === school));
          filteredBySchool = filteredBySchool.concat(schoolFilter);
        }
        filteredSpells = filteredBySchool;
      }

      // filter by components
      if(this.spellComponents.length) {
        // so this just filters if it contains one... what we want is to see if something is JUST verbal or verbal AND somatic

        for(const component of this.spellComponents) {
          filteredSpells = filteredSpells.filter(obj => (obj.components.indexOf(component) != -1 && this.spellComponents.length === obj.components.split(",").length));
        }
      }

      // filter by rarity
      if(this.spellRarity.length) {
        let filteredByRarity = [];
        for(const rarity of this.spellRarity) {
          let rarityFilter = [];
          rarityFilter = filteredSpells.filter(obj => (obj.rarity === rarity));
          filteredByRarity = filteredByRarity.concat(rarityFilter);
        }
        filteredSpells = filteredByRarity;
      }

      // filter by level
      if(this.level) {
        let filteredByLevel = filteredSpells.filter(obj => (obj.level === parseInt(this.level)));
        filteredSpells = filteredByLevel;
      }

      // filter by tradition
      if(this.spellTraditions.length) {
        let filteredByTradition = [];
        for(const tradition of this.spellTraditions) {
          let traditionFilter = [];
          traditionFilter = filteredSpells.filter(obj => (obj.traditions.indexOf(tradition) != -1));
          filteredByTradition = filteredByTradition.concat(traditionFilter);
        }
        filteredSpells = filteredByTradition;
      }

      // filter by name
      if(this.spellName) {
        let filteredByName = filteredSpells.filter(obj => (obj.name.toLowerCase().indexOf(this.spellName.toLowerCase()) != -1));
        filteredSpells = filteredByName;
      }

      if(filteredSpells.length === 884) {
        return [];
      }

      return filteredSpells;
    },
    generatedResultsCount() {
      return this.generatedResults.length || this.spells.length;
    },
    generateDistinctLevelsTest() {
      const levels = [...new Set(this.spells.map(spell => (spell.level)).sort((a,b) => ( a-b) ) )];
      return levels;
    }
  }
};
</script>
