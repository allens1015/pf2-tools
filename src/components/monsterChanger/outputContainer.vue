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
      <v-col
        v-for="(skill,i) in monsterChanger.skillsFrom"
        :key="i"
      >
        <v-card>
          <v-card-text>
            <p>
              <b>{{ skill.name }}</b> +{{ getNewSkillValue(skill.value) }}
            </p>
          </v-card-text>
        </v-card>
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
      <v-col
        v-for="(attack,i) in monsterChanger.attacksFrom"
        :key="i"
      >
        <v-card>
          <v-card-text>
            <b>{{ attack.name }}</b> +{{ getNewAttackValue(attack.modifier) }} {{ getNewDamageValue(attack.damage) }}
          </v-card-text>
        </v-card>
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
    getNewSkillValue(propertyValue) {
      // shove the cr up 1 for indexing purposes- table starts at level=-1 but index 0
      const intPropertyValue = parseInt(propertyValue);
      const crToProcessed = parseInt(monsterChanger.crTo) + 1;
      const crFromProcessed = parseInt(monsterChanger.crFrom) + 1;

      // grab the relevant rows
      const validRowFrom = monsterChanger.skills[crFromProcessed];
      const validRowTo = monsterChanger.skills[crToProcessed];

      const i = validRowFrom.findIndex(element => intPropertyValue >= element.min && element != -1);
      let str = propertyValue;
      if(i != -1) {
        const newValue = validRowTo[i];

        let min = 0;
        let max = 0;
        if(newValue.min) {
          min = parseInt(newValue.min);
        }
        if(newValue.max) {
          max = parseInt(newValue.max);
        }
        str = `${min}`;
        if(max > min) {
          str += ` (${max})`;
        }
      }
      else {
        if(propertyValue > validRowFrom[0].max) {
          str = validRowTo[0].max;
        }
        else {
          str = validRowTo[validRowFrom.length-1].min;
        }
      }

      return str;
    },
    getNewDamageValue(propertyValue) {
      // shove the cr up 1 for indexing purposes- table starts at level=-1 but index 0
      const crToProcessed = parseInt(monsterChanger.crTo) + 1;
      const crFromProcessed = parseInt(monsterChanger.crFrom) + 1;

      // grab the relevant rows
      const validRowFrom = monsterChanger.damage[crFromProcessed];
      const validRowTo = monsterChanger.damage[crToProcessed];

      // calculate average based on xdx+x formula
      let average = 0;
      let quantity = 0;
      let magnitude = 0;
      let offset = 0;
      if(propertyValue.match(/\d+d\d+\+?\d+?/)) {
        if(propertyValue.match(/^\d+/)) {
          quantity = parseInt(propertyValue.match(/^(\d+)/)[1]);
        }
        if(propertyValue.match(/\d+d\d+/)) {
          magnitude = parseInt(propertyValue.match(/^\d+d(\d+)/)[1]);
        }
        if(propertyValue.match(/\+\d+/)) {
          offset = parseInt(propertyValue.match(/^\d+d\d+\+(\d+)/)[1]);
        }
      }
      if(quantity > 0 && magnitude > 0) {
        average = ((magnitude/2)+0.5)*quantity + offset;
      }

      const i = validRowFrom.findIndex(element => average >= element.averageDamage);
      let newValue;
      // minimum damage of lowest entry in the "to" table
      if(i == -1) {
        newValue = validRowTo[validRowTo.length-1].stringDamage;
      }
      else {
        newValue = validRowTo[i].stringDamage;
      }

      return newValue;
    },
    getNewAttackValue(propertyValue) {
      // shove the cr up 1 for indexing purposes- table starts at level=-1 but index 0
      const intPropertyValue = parseInt(propertyValue);
      const crToProcessed = parseInt(monsterChanger.crTo) + 1;
      const crFromProcessed = parseInt(monsterChanger.crFrom) + 1;

      // grab the relevant rows
      const validRowFrom = monsterChanger.attacks[crFromProcessed];
      const validRowTo = monsterChanger.attacks[crToProcessed];

      const i = validRowFrom.findIndex(element => intPropertyValue >= element && element != -1);
      const newValue = validRowTo[i];

      return newValue;
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
      let alt = -1;
      if(hpFrom > alt) {
        alt = hpFrom;
      }
      const newValue = validRowTo[i] || -1;
      let str = alt;
      if(newValue != -1) {
        const avg = Math.ceil((newValue.min + newValue.max)/2);
        str = `${avg} (${newValue.min}-${newValue.max})`;
      }

      return str;
    },
    getNewScalarValue(propertyFrom,propertyArray) {
      const propertyValue = parseInt(monsterChanger[propertyFrom]);
      // shove the cr up 1 for indexing purposes- table starts at level=-1 but index 0
      const crToProcessed = parseInt(monsterChanger.crTo) + 1;
      const crFromProcessed = parseInt(monsterChanger.crFrom) + 1;

      // grab the relevant rows
      const validRowFrom = monsterChanger[propertyArray][crFromProcessed];
      const validRowTo = monsterChanger[propertyArray][crToProcessed];

      // figure out which column is the focus
      const i = validRowFrom.findIndex(element => propertyValue >= element && element != -1);
      let alt = -1;
      if(propertyValue > -1) {
        alt = propertyValue;
      }
      let newValue = validRowTo[i] || alt;
      if(newValue < alt) {
        newValue = alt;
      }

      return newValue;
    }
  }
}
</script>