<template>
  <v-card>
    <v-card-title
      class="break-word text-center"
    >
      {{ item.name }}
    </v-card-title>
    <v-card-text>
      <!-- stuff   -->
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text>
          <div
            v-html="item.description"
          >
          </div>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<style scoped>
  .break-word {
    word-break: break-word;
  }
</style>

<script>
export default ({
  name: "item-card",
  props: ["item"],
  data: () => ({
    show: false
  })
})
</script>
