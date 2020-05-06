<template>
  <q-page>
    <div class="q-pa-md row items-center justify-center q-gutter-md">
      <div v-for="film in filmList" :key="film.id">
        <film-card :film="film"></film-card>
      </div>
    </div>
    <fab-component />
  </q-page>
</template>

<script>
import axios from "axios";
import { IMAGE_BASE_URL, TRENDING_MOVIE, API_KEY } from "../configs/urlConfigs";
import FilmCard from "../components/FilmCard";
import FabComponent from "../components/FabComponent";
export default {
  name: "Home",
  components: {
    "film-card": FilmCard,
    "fab-component": FabComponent
  },
  data() {
    return {
      filmList: [],
      response: [],
      imgBase: IMAGE_BASE_URL
    };
  },

  methods: {
    onCreate() {
      axios.get(`${TRENDING_MOVIE}${API_KEY}`).then(response => {
        this.filmList = response.data.results;
      });
    }
  },
  created() {
    this.onCreate();
  }
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px;
</style>
