<template>
  <v-app>
    <v-main>
      <v-container>
        <v-card>
          <cr-fields-container
            :crFrom = "monsterChanger.crFrom"
            :crTo = "monsterChanger.crTo"
          ></cr-fields-container>
        </v-card>
      </v-container>
      <v-container>
        <v-card>
          <general-info-container></general-info-container>
          <defenses-container></defenses-container>
          <offenses-container></offenses-container>
        </v-card>
      </v-container>
      <v-container>
        <v-card>
          <output-container></output-container>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import monsterChanger from "@/models/monsterChanger.js";
import crFieldsContainer from '@/components/monsterChanger/crFieldsContainer.vue';
import generalInfoContainer from '@/components/monsterChanger/generalInfoContainer.vue';
import defensesContainer from '@/components/monsterChanger/defensesContainer.vue';
import offensesContainer from '../components/monsterChanger/offensesContainer.vue';
import OutputContainer from '../components/monsterChanger/outputContainer.vue';

export default {
  components: { crFieldsContainer, generalInfoContainer, defensesContainer, offensesContainer, OutputContainer },
  name: "monsterChanger",
  data: () => ({
    // models
    monsterChanger,
  })
}
</script>
