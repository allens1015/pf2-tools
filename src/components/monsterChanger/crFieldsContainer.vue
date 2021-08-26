<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field
            :value="monsterChanger.crFrom"
            type="number"
            label="CR From"
            @input="updateCRFrom($event)"
        >
        </v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          :value="monsterChanger.crTo"
          type="number"
          label="CR To"
          @input="updateCRTo($event)"
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-combobox
          solo
          clearable
          :items="getMonsterListings"
          item-text="name"
          item-value="_id"
          v-model="selectedMonster"
          @change="updateFields()"
        >
        </v-combobox>
        <!-- {{ selectedMonster._id }} -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import monsterChanger from "@/models/monsterChanger.js";
import shake from "@/helpers/shaker.js";
import monsters from "@/models/monsters.js";

export default {
  data: () => ({
    monsterChanger,   
    monsters,
    selectedMonster: ""
  }),
  computed: {
    getMonsterListings() {
      return monsters.bestiary1;
    }
  },
  methods: {
    updateFields() {
      if(typeof this.selectedMonster === 'object' && this.selectedMonster !== null) {
        monsterChanger.strFrom = this.selectedMonster.data.abilities.str.mod;
        monsterChanger.dexFrom = this.selectedMonster.data.abilities.dex.mod;
        monsterChanger.conFrom = this.selectedMonster.data.abilities.con.mod;
        monsterChanger.intFrom = this.selectedMonster.data.abilities.int.mod;
        monsterChanger.wisFrom = this.selectedMonster.data.abilities.wis.mod;
        monsterChanger.chaFrom = this.selectedMonster.data.abilities.cha.mod;
        monsterChanger.crFrom = this.selectedMonster.data.details.level.value;
        if(monsterChanger.crFrom > monsterChanger.crTo) {
          monsterChanger.crTo = monsterChanger.crFrom;
        }
      }
      shake();
    },
    updateCRFrom(value) {
      monsterChanger.crFrom = value;
    },
    updateCRTo(value) {
      monsterChanger.crTo = value;
    }
  }
}
</script>