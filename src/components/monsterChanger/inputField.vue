<template>
  <v-text-field
    :type="type"
    :label="label"
    @input="updateMonsterChanger(property,$event)"
  >
  </v-text-field>
</template>

<script>
import monsterChanger from "@/models/monsterChanger.js"

export default {
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
