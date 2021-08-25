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
    <v-row>
      <v-col>
        Skills go here
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
      // shove the cr up 1 for indexing purposes- table starts at level=-1 but index 0
      const crToProcessed = parseInt(monsterChanger.crTo) + 1;
      const crFromProcessed = parseInt(monsterChanger.crFrom) + 1;

      // grab the relevant rows
      const validPerceptionRowFrom = monsterChanger.perception[crFromProcessed];
      const validPerceptionRowTo = monsterChanger.perception[crToProcessed];

      // figure out which column is the focus
      const i = validPerceptionRowFrom.findIndex(element => parseInt(monsterChanger.perceptionFrom) >= element);      
      const newPerception = validPerceptionRowTo[i] || -1;

      return newPerception;
    }
  }
}
</script>