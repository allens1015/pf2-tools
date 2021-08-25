<template>
  <v-app>
    <v-main>
      <cr-fields-container
        :crFrom = "monsterChanger.crFrom"
        :crTo = "monsterChanger.crTo"
      ></cr-fields-container>
      <general-info-container></general-info-container>
      <defenses-container></defenses-container>
    </v-main>
  </v-app>
</template>

<script>
import monsterChanger from "@/models/monsterChanger.js";
import crFieldsContainer from '@/components/monsterChanger/crFieldsContainer.vue';
import generalInfoContainer from '@/components/monsterChanger/generalInfoContainer.vue';
import defensesContainer from '@/components/monsterChanger/defensesContainer.vue';

export default {
  components: { crFieldsContainer, generalInfoContainer, defensesContainer },
  name: "monsterChanger",
  data: () => ({
    // models
    monsterChanger,
  })
}
</script>
