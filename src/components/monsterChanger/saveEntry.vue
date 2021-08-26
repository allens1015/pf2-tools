<template>
  <v-text-field
    type="number"
    :label="monsterChanger.savesLabels[i]"
    :value="monsterChanger[propertyName]"
    @input="updateSaveFrom($event)"
    placeholder=0
  >
  </v-text-field>
</template>

<script>
import monsterChanger from "@/models/monsterChanger.js";

export default {
  name: "saveEntry",
  props: ["propertyName","i"],
  data: () => ({
    monsterChanger
  }),
  methods: {
    updateSaveFrom(value) {
      monsterChanger[this.propertyName] = value;
    }
  }
}
</script>