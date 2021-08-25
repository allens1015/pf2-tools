<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn
          @click="process()"
        >
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
            <p class="text-h4 text--primary">{{ getNewScalarValue('perceptionFrom','perception') }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        Skills go here
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(propertyName,i) in stats"
        :key="i"
      >
        <v-card-text>
          <label>{{ monsterChanger.statsLabels[i] }}</label>
          <!-- {{ propertyName }} -->
          <p class="text-h4 text--primary">{{ getNewScalarValue(propertyName,'stats') }}</p>
        </v-card-text>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import monsterChanger from "@/models/monsterChanger.js";
import shake from "@/helpers/shaker.js";

export default {
  name: "outputContainer",
  data: () => ({
    monsterChanger,
    stats: ["strFrom","dexFrom","conFrom","intFrom","wisFrom","chaFrom"]
  }),
  methods: {
    process() {
      shake();
    },
    getNewScalarValue(propertyFrom,propertyArray) {
      // shove the cr up 1 for indexing purposes- table starts at level=-1 but index 0
      const crToProcessed = parseInt(monsterChanger.crTo) + 1;
      const crFromProcessed = parseInt(monsterChanger.crFrom) + 1;

      // grab the relevant rows
      const validRowFrom = monsterChanger[propertyArray][crFromProcessed];
      const validRowTo = monsterChanger[propertyArray][crToProcessed];

      // figure out which column is the focus
      const i = validRowFrom.findIndex(element => parseInt(monsterChanger[propertyFrom]) >= element && element != -1);
      const newValue = validRowTo[i] || -1;

      return newValue;
    }
  }
}
</script>