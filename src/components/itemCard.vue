<template>
  <v-card
    color="yellow lighten-4"
  >
    <!-- pick a better color -->
    <v-banner
      color="amber lighten-3"
    >
      <v-card-title
        class="break-word"
      >
        <v-row>
          <v-col
            class="col-9"
          >
            <h4>{{ item.name }}</h4>
          </v-col>
          <v-col
            class="col-3"
          >
            <h4>{{ item.level }}</h4>
          </v-col>
        </v-row>
        <!-- <h4>{{ item.name }}</h4>
        <v-spacer></v-spacer>
        <h4>{{ item.level }}</h4> -->
      </v-card-title>

      <!-- i dont really like this -->
      <v-card-subtitle>
        <v-row>
          <v-col
            v-for="(trait,i) in item.traits"
            :key="i"
            class="col-4"
          >
            <v-card
              outlined
              class="pa-1"
            >
              <h4>{{ trait }}</h4>
            </v-card>
          </v-col>
        </v-row>
      </v-card-subtitle>
    </v-banner>
      <!-- <v-card-title
        class="break-word text-center"
      >
        <p>{{ item.name }}</p>
        <v-spacer></v-spacer>
        <p>{{ item.level }}</p>
      </v-card-title>
      <v-card-subtitle>
        <v-row>
          <v-col
            v-for="(trait,i) in item.traits"
            :key="i"
            class="pa-2"
          >
            {{ trait }}
          </v-col>
        </v-row>
      </v-card-subtitle> -->
    
    
    <v-card-text>
      <v-list
        class="text-left"
        color="yellow lighten-4"
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Price</v-list-item-title>
            <v-list-item-subtitle>{{ item.price.display }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
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
