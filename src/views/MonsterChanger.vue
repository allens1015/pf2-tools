<template>
  <v-app>
    <v-main>
      <v-container>
        <v-card>
          
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import monsterChangerData from "@/assets/monsterChanger.json";

export default {
  name: "monsterChanger",
  data: () => ({
    // lil ol liberry to have on hand
    abilityModifiers: monsterChangerData.abilityModifiers,
    ac: monsterChangerData.ac,
    hp: monsterChangerData.hp,
    perception: monsterChangerData.perception,
    resistAndWeakness: monsterChangerData.resistAndWeakness,
    safeItemLevel: monsterChangerData.safeItemLevel,
    saves: monsterChangerData.saves,
    skills: monsterChangerData.skills,
    spellAttack: monsterChangerData.spellAttack,
    spellDC: monsterChangerData.spellDC,
    strikeAttack: monsterChangerData.strikeAttack,
    strikeDamage: monsterChangerData.strikeDamage
  })
}
</script>
