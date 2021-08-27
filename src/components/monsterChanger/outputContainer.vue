<template>
  <v-container>
    <!-- text out -->
    <v-container>
      <h3>{{ monsterChanger.name }}</h3>
      <ol
        class="text-left text-output-list"
      >
        <li>
          <span class="font-weight-bold">Perception</span> <span>{{ getNewScalarValue('perceptionFrom','perception') }}</span>
        </li>
        <li>
          <span class="font-weight-bold">Skills </span>
          <span
            v-for="(skill,i) in monsterChanger.skillsFrom"
            :key="i"
          >
            <template v-if="i > 0">, </template>
            <span>{{ skill.name }} +{{ getNewSkillValue(skill.value) }}</span>
          </span>
        </li>
        <li>
          <span
            v-for="(propertyName,i) in stats"
            :key="i"
          >
            <template v-if="i > 0">, </template>
            <span class="font-weight-bold">{{ monsterChanger.statsLabels[i] }}</span> <span>{{ getNewScalarValue(propertyName,'stats') }}</span>
          </span>
          <hr/>
        </li>
        <li>
          <span class="font-weight-bold">AC</span> <span>{{ getNewScalarValue('acFrom','ac') }}; </span>
          <span
            v-for="(propertyName,i) in saves"
            :key="i"
          >
            <template v-if="i > 0">, </template>
            <span class="font-weight-bold">{{ monsterChanger.savesLabels[i] }}</span> <span>+{{ getNewScalarValue(propertyName,'saves') }}</span>
          </span>
        </li>
        <li>
          <span class="font-weight-bold">HP</span> <span>{{ getNewHPValue() }}</span>
          <hr/>
        </li>
        <li
          v-for="(attack,i) in monsterChanger.attacksFrom"
          :key="i"
        >
          <span class="font-weight-bold text-capitalize">{{ attack.method }}</span> <span>{{ attack.name }}+{{ getNewAttackValue(attack.modifier) }}
            <template v-if="attack.traits.length">
              (<span
                v-for="(trait,j) in attack.traits"
                :key="j"
              >
                <template v-if="j > 0">, </template>
                <span>{{ trait }}</span>
              </span>)
            </template>,</span> <span class="font-weight-bold">Damage</span> <span>{{ getNewDamageValue(attack.damage) }} {{ attack.damageType }}</span> <span v-if="attack.bonusDamage">plus {{ attack.bonusDamage }} {{ attack.bonusDamageType }}</span>
        </li>
        <li>
          <span class="font-weight-bold">Spell DC</span> <span>{{ getNewScalarValue('spellDCFrom','spellDC') }}, attack +{{ getNewScalarValue('spellAttackFrom','spellAttack') }}</span>
        </li>
      </ol>      
    </v-container>
  </v-container>
</template>

<style scoped>
  .text-output-list {
    list-style-type: none;
  }
</style>

<script>
import monsterChanger from "@/models/monsterChanger.js";

export default {
  name: "outputContainer",
  data: () => ({
    monsterChanger,
    stats: ["strFrom","dexFrom","conFrom","intFrom","wisFrom","chaFrom"],
    saves: ["fortFrom","refFrom","willFrom"]
  }),
  methods: {
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
          if(min < propertyValue) {
            min = propertyValue;
          }
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
      let newValue;
      if(i == -1) {
        newValue = validRowTo[validRowTo.length-1];
      }
      else {
        newValue = validRowTo[i];
      }

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

      // check for out of bounds
      let hpEntryIndex;
      if(hpFrom < parseInt(validRowFrom[validRowFrom.length-1].min)) {
        hpEntryIndex = validRowFrom.length-1;
      }
      if(hpFrom > parseInt(validRowFrom[0].max)) {
        hpEntryIndex = 0;
      } 
      
      // it's in bounds, but the min/max of each entry do not exactly line up
      if(hpEntryIndex === undefined) {
        for(const i in validRowFrom) {
          const min = validRowFrom[i].min;
          const max = validRowFrom[i].max;
          if(hpFrom >= min && hpFrom <= max) {
            hpEntryIndex = i;
          }
          // if it's inbetween 2 categories, put it at the higher one
          else if(i != validRowFrom.length-1) {
            if(hpFrom > validRowFrom[validRowFrom.length-1].max && hpFrom < validRowFrom[i].min) {
              // rounding up basically
              hpEntryIndex = i;
            }
          }
        }
      }

      const newValue = validRowTo[hpEntryIndex] || -1;
      const avg = Math.ceil((newValue.min + newValue.max)/2);
      const str = `${avg} (${newValue.min}-${newValue.max})`;
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
      let alt = propertyValue;
      let newValue = validRowTo[i] || alt;
      if(newValue < alt) {
        newValue = alt;
      }

      return newValue;
    }
  }
}
</script>