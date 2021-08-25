<template>
  <v-text-field
    type="number"
    :label="monsterChanger.statsLabels[i]"
    :value="monsterChanger.statsFrom[i]"
    @input="updateStatFrom($event,i)"
  >
  </v-text-field>
</template>

<script>
import monsterChanger from "@/models/monsterChanger.js";

export default {
  name: "statEntry",
  props: ["i"],
  data: () => ({
    monsterChanger
  }),
  methods: {
    updateStatFrom(value,i) {
      monsterChanger.statsFrom[i] = value;
    }
  }
}
</script>