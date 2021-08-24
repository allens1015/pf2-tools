<template>
  <v-app>
    <v-main>
      <cr-fields-container
        :crFrom = "monsterChanger.crFrom"
        :crTo = "monsterChanger.crTo"
      ></cr-fields-container>
      <general-info-container></general-info-container>
    </v-main>
  </v-app>
</template>

<script>
import monsterChanger from "@/models/monsterChanger.js";
import crFieldsContainer from '@/components/monsterChanger/crFieldsContainer.vue';
import generalInfoContainer from '@/components/monsterChanger/generalInfoContainer.vue';

export default {
  components: { crFieldsContainer, generalInfoContainer },
  name: "monsterChanger",
  data: () => ({
    // models
    monsterChanger,
  })
}
</script>
