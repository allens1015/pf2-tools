<template>
  <v-text-field
    type="number"
    :label="monsterChanger.savesLabels[i]"
    @input="updateSaveFrom($event,i)"
  >
  </v-text-field>
</template>

<script>
import monsterChanger from "@/models/monsterChanger.js";
import shake from "@/helpers/shaker.js";

export default {
  name: "saveEntry",
  props: ["i"],
  data: () => ({
    monsterChanger
  }),
  methods: {
    updateSaveFrom(value,i) {
      monsterChanger.savesFrom[i] = value;
      shake();
    }
  }
}
</script>