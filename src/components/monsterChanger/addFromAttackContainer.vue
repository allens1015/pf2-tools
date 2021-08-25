<template>
  <v-dialog
    v-model="attackDialogue"
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
        Add Attack
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-text-field
                @input="changeAddingAttackName($event)"
                type="text"
                label="Attack Name"
              >
              </v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-text-field
                @input="changeAddingAttackValue($event)"
                type="number"
                label="Attack Modifier"
              >
              </v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-text-field
                @input="changeAddingAttackDamage($event)"
                type="text"
                label="Attack Damage"
              >
              </v-text-field>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
        @click="addAttack(); attackDialogue = false; resetAttackDialog();"
        >
          <v-icon>
            mdi-check
          </v-icon>
        </v-btn>
        <v-btn
        @click="attackDialogue = false; resetAttackDialog();"
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

export default {
  name: "addAttackContainer",
  data: () => ({
    monsterChanger,
    attackDialogue: false
  }),
  methods: {
    changeAddingAttackName(value) {
      monsterChanger.addingAttackName = value;
    },
    changeAddingAttackValue(value) {
      monsterChanger.addingAttackModifier = value;
    },
    changeAddingAttackDamage(value) {
      monsterChanger.addingAttackDamage = value;
    },
    addAttack() {
      const addedAttack = {"name":monsterChanger.addingAttackName,"modifier":monsterChanger.addingAttackModifier,"damage":monsterChanger.addingAttackDamage};
      monsterChanger.attacksFrom.push(addedAttack);
    },
    resetAttackDialog() {
      monsterChanger.addingAttackName = "";
      monsterChanger.addingAttackModifier = 0;
      monsterChanger.addingAttackDamage = 0;
    }
  }
}
</script>