<template>
  <v-container>
    <v-row>
      <v-col>
        <!-- <input type="number" @input="updateCRFrom($event.target.value)" :value="crFrom" /> -->
        <v-text-field
            :value="crFrom"
            type="number"
            label="CR From"
            @input="updateCRFrom($event)"
        >
        </v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          :value="crTo"
          type="number"
          label="CR To"
          @input="updateCRTo($event)"
        >
        </v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import monsterChanger from "@/models/monsterChanger.js";
export default {
  props: ['crTo','crFrom'],
  data: () => ({   
    
  }),
  methods: {
    updateCRFrom(value) {
      monsterChanger.crFrom = value;
    },
    updateCRTo(value) {
      monsterChanger.crTo = value;
    }
  }
}
</script>