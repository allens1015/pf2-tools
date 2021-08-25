<template>
  <v-container>
    <v-row>
      <v-col>
        <input-field
          type="number"
          property="acFrom"
          label="AC"
        >
        </input-field>
      </v-col>
      <v-col
        v-for="(save,i) in monsterChanger.savesFrom"
        :key="i"
      >
        <save-entry
          :i="i"
        ></save-entry>
      </v-col>
      <v-col>
        <input-field
          type="number"
          property="hpFrom"
          label="hp"
        ></input-field>
      </v-col>
      <v-col>
        {{ monsterChanger.savesFrom }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import monsterChanger from "@/models/monsterChanger.js";
import inputField from "@/components/monsterChanger/inputField.vue";
import saveEntry from './saveEntry.vue';

export default {
  name: "defensesContainer",
  components: { inputField, saveEntry },
  data: () => ({
    monsterChanger
  })  
}
</script>