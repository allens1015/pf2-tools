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
    <!-- perception -->
    <v-row>
      <v-col>
        <label>Perception</label>
        <p class="text-h4 text--primary">{{ getNewScalarValue('perceptionFrom','perception') }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        Skills go here
      </v-col>
    </v-row>
    <!-- stats -->
    <v-row>
      <v-col
        v-for="(propertyName,i) in stats"
        :key="i"
      >
        <label>{{ monsterChanger.statsLabels[i] }}</label>
        <!-- {{ propertyName }} -->
        <p class="text-h4 text--primary">{{ getNewScalarValue(propertyName,'stats') }}</p>
      </v-col>
    </v-row>
    <!-- defenses -->
    <v-row>
      <v-col
        v-for="(propertyName,i) in saves"
        :key="i"
      >
        <label>{{ monsterChanger.savesLabels[i] }}</label>
        <p class="text-h4 text--primary">{{ getNewScalarValue(propertyName,'saves') }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <label>AC</label>
        <p class="text-h4 text--primary">{{ getNewScalarValue('acFrom','ac') }}</p>
      </v-col>
      <v-col>
        <label>HP</label>
        <p class="text-h4 text--primary">{{ getNewHPValue() }}</p>
      </v-col>
    </v-row>
    <!-- attacks -->
    <v-row>
      <v-col>
        Attacks go here
      </v-col>
    </v-row>
    <!-- spells -->
    <v-row>
      <v-col>
        <label>Spell DC</label>
        <p class="text-h4 text--primary">{{ getNewScalarValue('spellDCFrom','spellDC') }}</p>
      </v-col>
      <v-col>
        <label>Spell Attack</label>
        <p class="text-h4 text--primary">{{ getNewScalarValue('spellAttackFrom','spellAttack') }}</p>
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
    stats: ["strFrom","dexFrom","conFrom","intFrom","wisFrom","chaFrom"],
    saves: ["fortFrom","refFrom","willFrom"]
  }),
  methods: {
    process() {
      shake();
    },
    getNewHPValue() {
      const hpFrom = parseInt(monsterChanger.hpFrom);
      // shove the cr up 1 for indexing purposes- table starts at level=-1 but index 0
      const crToProcessed = parseInt(monsterChanger.crTo) + 1;
      const crFromProcessed = parseInt(monsterChanger.crFrom) + 1;

      // grab the relevant rows
      const validRowFrom = monsterChanger.hp[crFromProcessed];
      const validRowTo = monsterChanger.hp[crToProcessed];

      const i = validRowFrom.findIndex(element => hpFrom >= element.min && hpFrom <= element.max && element.min != -1 && element.max != -1);
      const newValue = validRowTo[i] || -1;
      let str = -1;
      if(newValue != -1) {
        const avg = Math.ceil((newValue.min + newValue.max)/2);
        str = `${avg} (${newValue.min}-${newValue.max})`;
      }

      return str;
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