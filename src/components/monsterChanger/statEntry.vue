<template>
  <v-text-field
    type="number"
    :label="monsterChanger.statsLabels[i]"
    :value="monsterChanger[propertyName]"
    @input="updateStatFrom($event)"
    placeholder=0
  >
  </v-text-field>
</template>

<script>
import monsterChanger from "@/models/monsterChanger.js";

export default {
  name: "statEntry",
  props: ["propertyName","i"],
  data: () => ({
    monsterChanger
  }),
  methods: {
    updateStatFrom(value) {
      monsterChanger[this.propertyName] = value;
    }
  }
}
</script>