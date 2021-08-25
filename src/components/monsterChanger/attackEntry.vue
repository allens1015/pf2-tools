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
      >
      </v-text-field>
      <v-text-field
        type="text"
        label="Damage"
        :value="attack.damage"
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
  props: ["attack"],
  data: () => ({
    monsterChanger
  }),
  methods: {
    deleteAttack(i) {
      monsterChanger.attacksFrom.splice(i,1);
      shake();
    }
  }
}
</script>