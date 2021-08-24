<template>
  <v-app>
    <v-main>
      <crFieldsContainer
        :crFrom = "monsterChanger.crFrom"
        :crTo = "monsterChanger.crTo"
        @cr-to-change="receiveNewCRTo(value)"
      ></crFieldsContainer>
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="monsterChanger.perception"
              type="number"
              label="Perception"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="(skill,i) in monsterChanger.oldSkills"
            :key="i"
          >
            <v-text-field
              type="number"
              :label="skill.name"
            >
            </v-text-field>
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
                        {{ monsterChanger.crFrom }}
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-text-field
                          v-model="monsterChanger.addingSkillName"
                          type="text"
                          label="Skill Name"
                        >
                        </v-text-field>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-text-field
                          v-model="monsterChanger.addingSkillValue"
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
                    @click="skillDialogue = false; resetSkillDialog(); addSkill(old)"
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
        <v-row>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import monsterChanger from "@/models/monsterChanger.js";
import crFieldsContainer from '@/components/monsterChanger/crFieldsContainer.vue';
// import skillTemplate from "@/models/skill.js";

export default {
  components: { crFieldsContainer },
  name: "monsterChanger",
  data: () => ({
    // models
    monsterChanger,
    // modals
    skillDialogue: false,  
  }),
  methods: {
    addSkill(type) {
      if(type == "old") {
        console.log(type);
      }
    },
    resetSkillDialog() {
      this.monsterChanger.addingSkillName = "";
      this.monsterChanger.addingSkillValue = 0;
    },
    receiveNewCRTo(value) {
      this.monsterChanger.crTo = value;
    }
  }
}
</script>
