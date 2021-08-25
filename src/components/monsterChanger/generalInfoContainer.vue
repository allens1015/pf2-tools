<template>
  <v-container>
    <!-- perception frame -->
    <v-row>
      <v-col>
        <input-field
          type="number"
          property="perceptionFrom"
          label="Perception"
        ></input-field>
        
      </v-col>
    </v-row>
    <!-- skills from frame -->
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
        <add-from-skill-container></add-from-skill-container>
      </v-col>
    </v-row>
    <!-- stats frame -->
    <v-row>
      <v-col
        v-for="(stat,i) in monsterChanger.statsFrom"
        :key="i"
      >
        <stat-entry
          :i="i"
        ></stat-entry>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import monsterChanger from "@/models/monsterChanger.js";
import inputField from '@/components/monsterChanger/inputField.vue';
import skillEntry from '@/components/monsterChanger/skillEntry.vue';
import addFromSkillContainer from '@/components/monsterChanger/addFromSkillContainer.vue';
import statEntry from '@/components/monsterChanger/statEntry.vue';

export default {
  name: "generalInfoContainer",
  components: { inputField, skillEntry, addFromSkillContainer, statEntry },
  data: () => ({
    monsterChanger  
  })
}
</script>