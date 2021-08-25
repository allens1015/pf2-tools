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
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <label>Perception</label>
            <p class="text-h4 text--primary">{{ getPerception }}</p>
          </v-card-text>
        </v-card>
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
  }),
  computed: {
    getPerception() {
      const crProcessed = monsterChanger.crTo + 1;
      const validPerceptionRow = monsterChanger.perception[crProcessed];
      // if(validPerceptionRow.includes(parseInt()))
      return validPerceptionRow;
    }
  }
}
</script>