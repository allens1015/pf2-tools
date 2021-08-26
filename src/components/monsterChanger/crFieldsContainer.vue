<template>
  <v-container>
    <h2>
      <v-text-field
        label="Name"
        type="text"
        :value="monsterChanger.name"
        @input="updateName($event)"
      >
      </v-text-field>
    </h2>
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
    updateName(value) {
      monsterChanger.name = value;
    },
    updateFields() {
      if(typeof this.selectedMonster === 'object' && this.selectedMonster !== null) {
        monsterChanger.name = this.selectedMonster.name;
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
        monsterChanger.skillsFrom = [];
        for(const item in this.selectedMonster.items) {
          const itemInfo = this.selectedMonster.items[item];
          if(itemInfo.type == "melee" || itemInfo.type == "ranged") {
            const damageKeys = Object.keys(itemInfo.data.damageRolls);
            const damageInfo = itemInfo.data.damageRolls[damageKeys[0]];
            let bonusDamage;
            let bonusDamageType;
            if(damageKeys.length > 1) {
              bonusDamage = itemInfo.data.damageRolls[damageKeys[1]].damage;
              bonusDamageType = itemInfo.data.damageRolls[damageKeys[1]].damageType;
            }
            const attackEntry = {"name":itemInfo.name,"modifier":itemInfo.data.bonus.value,"damage":damageInfo.damage,"damageType":damageInfo.damageType,"bonusDamage":bonusDamage,"bonusDamageType":bonusDamageType};
            monsterChanger.attacksFrom.push(attackEntry);
          }
          else if(itemInfo.type == "lore") {
            const skillName = itemInfo.name;
            const skillValue = itemInfo.data.mod.value;
            const skillEntry = {"name":skillName,"value":skillValue};
            monsterChanger.skillsFrom.push(skillEntry);
          }
          else if(itemInfo.type == "spellcastingEntry") {
            monsterChanger.spellDCFrom = itemInfo.data.spelldc.dc;
            monsterChanger.spellAttackFrom = itemInfo.data.spelldc.value;
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