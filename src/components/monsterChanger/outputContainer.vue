<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn>
          <v-icon>
            mdi-refresh
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import monsterChanger from "@/models/monsterChanger.js";

export default {
  name: "outputContainer",
  data: () => ({
    monsterChanger
  })  
}
</script>