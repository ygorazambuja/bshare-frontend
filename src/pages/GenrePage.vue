<template>
  <q-page>
    <div class="q-pa-md">
      <div class="q-pa-md row items-center justify-center q-gutter-md">
        <div v-for="film in filmList" :key="film.id">
          <film-card :film="film"></film-card>
        </div>
      </div>
    </div>
    <fab-component />
  </q-page>
</template>

<script>
import { GENRE_SEARCH, PAGE } from "../configs/urlConfigs";
import axios from "axios";
import FilmCard from "../components/FilmCard";
import FabComponent from "../components/FabComponent";
export default {
  components: {
    "film-card": FilmCard,
    "fab-component": FabComponent
  },
  data() {
    return {
      filmList: [],
      page: 1
    };
  },
  methods: {
    onCreate(page = 1) {
      const id = this.$route.params.id;
      axios.get(`${GENRE_SEARCH}${id}${PAGE}${page}`).then(response => {
        this.filmList.push(...response.data.results);
        this.page++;
      });
    },
    onPageEnded() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          this.onCreate(this.page);
        }
      };
    }
  },
  created() {
    this.onCreate(this.page);
    this.onPageEnded();
  },
  watch: {
    "$route.params.id"() {
      this.page = 1;
      this.filmList = [];
      this.onCreate();
    }
  }
};
</script>

<style></style>
