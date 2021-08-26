<template>
  <v-dialog
    v-model="skillDialogue"
    max-width="300px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        dark
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>
        mdi-plus
        </v-icon>
        Add Skill
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-text-field
                @input="changeAddingSkillName($event)"
                type="text"
                label="Skill Name"
              >
              </v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-text-field
                @input="changeAddingSkillValue($event)"
                type="number"
                label="Skill Modifier"
              >
              </v-text-field>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
        @click="addSkill(); skillDialogue = false; resetSkillDialog();"
        >
          <v-icon>
            mdi-check
          </v-icon>
        </v-btn>
        <v-btn
        @click="skillDialogue = false; resetSkillDialog();"
        >
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import monsterChanger from "@/models/monsterChanger.js";
import shake from "@/helpers/shaker.js";

export default {
  name: "addFromSkillContainer",
  data: () => ({
    monsterChanger,
    skillDialogue: false
  }),
  methods: {
    changeAddingSkillName(value) {
      monsterChanger.addingSkillName = value;
      shake();
    },
    changeAddingSkillValue(value) {
      monsterChanger.addingSkillValue = value;
      shake();
    },
    addSkill() {
      const addedSkill = {"name":monsterChanger.addingSkillName,"value":monsterChanger.addingSkillValue};
      monsterChanger.skillsFrom.push(addedSkill);
      shake();
    },
    resetSkillDialog() {
      this.monsterChanger.addingSkillName = "";
      this.monsterChanger.addingSkillValue = 0;
    }
  }
}
</script>