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
        monsterChanger.fortFrom = this.selectedMonster.data.saves.fortitude.value;
        monsterChanger.refFrom = this.selectedMonster.data.saves.reflex.value;
        monsterChanger.willFrom = this.selectedMonster.data.saves.will.value;
        monsterChanger.acFrom = this.selectedMonster.data.attributes.ac.value;
        monsterChanger.hpFrom = this.selectedMonster.data.attributes.hp.value;
        monsterChanger.perceptionFrom = this.selectedMonster.data.attributes.perception.value;
        monsterChanger.crFrom = this.selectedMonster.data.details.level.value;
        monsterChanger.attacksFrom = [];
        for(const item in this.selectedMonster.items) {
          const itemInfo = this.selectedMonster.items[item];
          if(itemInfo.type == "melee" || itemInfo.type == "ranged") {
            console.log(itemInfo);
            const damageKeys = Object.keys(itemInfo.data.damageRolls);
            const damageInfo = itemInfo.data.damageRolls[damageKeys[0]];
            let bonusDamage;
            let bonusDamageType;
            if(damageKeys.length > 1) {
              bonusDamage = itemInfo.data.damageRolls[damageKeys[1]].damage;
              bonusDamageType = itemInfo.data.damageRolls[damageKeys[1]].damageType;
            }
            // console.log(damageKeys);
            const attackEntry = {"name":itemInfo.name,"modifier":itemInfo.data.bonus.value,"damage":damageInfo.damage,"damageType":damageInfo.damageType,"bonusDamage":bonusDamage,"bonusDamageType":bonusDamageType};
            monsterChanger.attacksFrom.push(attackEntry);
          }
        }
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