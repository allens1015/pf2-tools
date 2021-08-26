<template>
  <v-card>
    <v-card-text>
      <v-text-field
        type="number"
        :label="skill.name"
        :value="skill.value"
        @input="updateSkill('value',$event,i)"
      >
      </v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn
        icon
        @click="deleteSkill(i)"
      >
        <v-icon>
          mdi-delete
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import monsterChanger from "@/models/monsterChanger.js";
import shake from "@/helpers/shaker.js";

export default {
  name: "skillEntry",
  props: ["skill","i"],
  data: () => ({
    monsterChanger
  }),
  methods: {
    updateSkill(property, value, i) {
      monsterChanger.skillsFrom[i][property] = value;
      shake();
    },
    deleteSkill(i) {
      monsterChanger.skillsFrom.splice(i,1);
      shake();
    }
  }
}
</script>