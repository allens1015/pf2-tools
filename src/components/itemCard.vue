<template>
  <v-card>
    <v-card-title>{{ item.name }}</v-card-title>
    <v-card-text>
      <div>
        test
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        dark
        text
      >
        Explore
      </v-btn>
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
          hidden
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default ({
  name: "item-card",
  props: ["item"],
  data: () => ({
    show: false
  })
})
</script>
