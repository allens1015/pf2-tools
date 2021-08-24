<template>
  <v-container>
    <v-row>
      <v-col>
        <input-field
          type="number"
          property="perceptionFrom"
          label="Perception"
        ></input-field>
        
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(skill,i) in monsterChanger.skillsFrom"
        :key="i"
      >
        <skill-entry
          :skill="skill"
          :i="i"
        ></skill-entry>
      </v-col>
      <v-col>
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
  </v-col>
    </v-row>
  </v-container>
</template>

<script>
import monsterChanger from "@/models/monsterChanger.js";
import inputField from '@/components/monsterChanger/inputField.vue';
import SkillEntry from '@/components/monsterChanger/skillEntry.vue';

export default {
  name: "generalInfoContainer",
  components: { inputField, SkillEntry },
  data: () => ({
    monsterChanger,
    skillDialogue: false,  
  }),
  methods: {
    changeAddingSkillName(value) {
      // console.log("addingskillname "+value);
      monsterChanger.addingSkillName = value;
    },
    changeAddingSkillValue(value) {
      // console.log("addingskillvalue "+value);
      monsterChanger.addingSkillValue = value;
    },
    addSkill() {
      const addedSkill = {"name":monsterChanger.addingSkillName,"value":monsterChanger.addingSkillValue};
      // console.log(addedSkill);
      monsterChanger.skillsFrom.push(addedSkill);
    },
    resetSkillDialog() {
      this.monsterChanger.addingSkillName = "";
      this.monsterChanger.addingSkillValue = 0;
    }
  }
}
</script>