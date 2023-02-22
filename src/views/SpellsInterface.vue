<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer">
            </v-app-bar-nav-icon>
            <v-toolbar-title>Spell Browser</v-toolbar-title>
        </v-app-bar>

        <v-navigation-drawer
            v-model="drawer"
            absolute temporary>
            <v-list nav>
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
                                :items="Object.values(distinct.schools)"
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
                                :items="distinct.rarities"
                                label="Rarity"
                            ></v-select>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-select
                                v-model="spellTraditions"
                                multiple
                                :items="distinct.traditions"
                                label="Traditions"
                            ></v-select>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-select
                                v-model="spellComponents"
                                multiple
                                :items="distinct.components"
                                label="Components"
                            ></v-select>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

        <v-main>
            <v-card>
                <v-card-title>
                    <span>{{ generatedResultsCount }} spells found. <span v-if="generatedResultsCount === 884">Apply a filter to see results.</span></span>
                </v-card-title>
                <v-list>
                    <v-list-item
                        v-for="spell in generatedResults"
                        :key="spell.id">
                        <v-list-item-content>
                            <v-btn
                                color="primary" dark>
                                {{ spell.name }}
                            </v-btn>
                            <span v-html="spell.description"></span>
                            <div v-for="attribute in Object.keys(spell)" :key="attribute">
                                <span v-if="spell[attribute] && attribute !== 'id' && attribute !== 'name' && attribute !== 'description'">
                                    {{ attribute }}: {{ spell[attribute] }}
                                </span>
                            </div>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-main>
    </v-app>
</template>

<script>
import spellsModel from '../models/spells';
import distinct from '../helpers/distinct';

export default {
    name: 'SpellsInterface',
    data() {
        return {
            distinct,
            drawer: false,
            level: '',
            spellName: '',
            spellSchools: [],
            spellLevelsTest: [],
            spellRarity: [],
            spellTraditions: [],
            spellComponents: []
        }
    },
    methods: {},
    computed: {
        generatedResults() {
            let filteredSpells = [...spellsModel.all];
      
            // filter by school
            if (this.spellSchools.length) {
                let filteredBySchool = [];

                for (const school of this.spellSchools) {
                    let schoolFilter = [];

                    schoolFilter = filteredSpells.filter(obj => (obj.school === school));
                    filteredBySchool = filteredBySchool.concat(schoolFilter);
                }

                filteredSpells = filteredBySchool;
            }

            // filter by components
            if (this.spellComponents.length) {
                // so this just filters if it contains one...
                // what we want is to see if something is JUST
                // verbal or verbal AND somatic

                for(const component of this.spellComponents) {
                    filteredSpells = filteredSpells.filter(obj => (obj.components.indexOf(component) != -1 && this.spellComponents.length === obj.components.split(",").length));
                }
            }

            // filter by rarity
            if (this.spellRarity.length) {
                let filteredByRarity = [];

                for (const rarity of this.spellRarity) {
                    let rarityFilter = [];
                    rarityFilter = filteredSpells.filter(obj => (obj.rarity === rarity));
                    filteredByRarity = filteredByRarity.concat(rarityFilter);
                }
                filteredSpells = filteredByRarity;
            }

            // filter by level
            if (this.level) {
                let filteredByLevel = filteredSpells.filter(obj => (obj.level === parseInt(this.level)));
                filteredSpells = filteredByLevel;
            }

            // filter by tradition
            if (this.spellTraditions.length) {
                let filteredByTradition = [];

                for (const tradition of this.spellTraditions) {
                    let traditionFilter = [];
                    traditionFilter = filteredSpells.filter(obj => (obj.traditions.indexOf(tradition) != -1));
                    filteredByTradition = filteredByTradition.concat(traditionFilter);
                }
                filteredSpells = filteredByTradition;
            }

            // filter by name
            if (this.spellName) {
                let filteredByName = filteredSpells.filter(obj => (obj.name.toLowerCase().indexOf(this.spellName.toLowerCase()) != -1));

                filteredSpells = filteredByName;
            }

            if (filteredSpells.length === 884) {
                return [];
            }

            return filteredSpells;
        },
        generatedResultsCount() {
            return this.generatedResults.length || spellsModel.all.length;
        },
        generateDistinctLevelsTest() {
            const levels = [...new Set(spellsModel.all.map(spell => (spell.level)).sort((a,b) => ( a-b) ) )];

            return levels;
        }
    }
};
</script>
