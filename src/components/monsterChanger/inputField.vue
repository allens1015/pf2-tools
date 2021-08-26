<template>
  <v-text-field
    :type="type"
    :label="label"
    :value="monsterChanger[property]"
    @input="updateMonsterChanger(property,$event)"
  >
  </v-text-field>
</template>

<script>
import monsterChanger from "@/models/monsterChanger.js"

export default {
    name: "inputEntry",
    props: ["type","label","property"],
    data: () => ({
      monsterChanger
    }),
    methods: {
      updateMonsterChanger(property,value) {
        monsterChanger[property] = value
      }
    }
}
</script>
