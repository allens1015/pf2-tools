<template>
  <v-card>
    <v-card-title>
      {{ attack.name }}
    </v-card-title>
    <v-card-text>
      <v-text-field
        type="number"
        label="Attack Bonus"
        :value="attack.modifier"
        @input="updateAttack('modifier',$event,i)"
      >
      </v-text-field>
      <v-text-field
        type="text"
        label="Damage"
        :value="attack.damage"
        @input="updateAttack('damage',$event,i)"
      >
      </v-text-field>
      <v-text-field
        type="text"
        label="Damage Type"
        :value="attack.damageType"
        @input="updateAttack('damageType,$event,i')"
      >
      </v-text-field>
      <v-text-field
        type="text"
        label="Bonus Damage"
        :value="attack.bonusDamage"
        @input="updateAttack('bonusDamage',$event,i)"
      >
      </v-text-field>
      <v-text-field
        type="text"
        label="Damage Type"
        :value="attack.bonusDamageType"
        @input="updateAttack('bonusDamageType,$event,i')"
      >

      </v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn
        icon
        @click="deleteAttack(i)"
      >
        <v-icon>
          mdi-delete
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import monsterChanger from "@/models/monsterChanger.js";
import shake from "@/helpers/shaker.js";

export default {
  name: "attackEntry",
  props: ["attack","i"],
  data: () => ({
    monsterChanger
  }),
  methods: {
    updateAttack(property, value, i) {
      monsterChanger.attacksFrom[i][property] = value;
      shake();
    },
    deleteAttack(i) {
      monsterChanger.attacksFrom.splice(i,1);
      shake();
    }
  }
}
</script>