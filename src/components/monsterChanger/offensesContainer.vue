<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(attack,i) in monsterChanger.attacksFrom"
        :key="i"
      >
        <attack-entry
          :attack="attack"
          :i="i"
        ></attack-entry>
      </v-col>
      <v-col>
        <add-from-attack-container></add-from-attack-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import monsterChanger from "@/models/monsterChanger.js";
import attackEntry from "@/components/monsterChanger/attackEntry.vue";
import addFromAttackContainer from "@/components/monsterChanger/addFromAttackContainer.vue";

export default {
  name: "offensesContainer",
  components: { attackEntry, addFromAttackContainer },
  data: () => ({
    monsterChanger
  })
}
</script>