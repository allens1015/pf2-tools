<template>
  <v-text-field
    type="number"
    :label="monsterChanger.statsLabels[i]"
    @input="updateStatFrom($event,i)"
    value=0
  >
  </v-text-field>
</template>

<script>
import monsterChanger from "@/models/monsterChanger.js";
import shake from "@/helpers/shaker.js";

export default {
  name: "statEntry",
  props: ["i"],
  data: () => ({
    monsterChanger
  }),
  methods: {
    updateStatFrom(value,i) {
      monsterChanger.statsFrom[i] = value;
      shake();
    }
  }
}
</script>