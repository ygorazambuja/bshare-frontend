<template>
  <q-page>
    <div class="row justify-center q-pa-md">
      <div class="row justify-center q-pa-md">
        <div class="col-xs-12 col-sm-6 col-md-4 q-pa-xl">
          <q-img :src="backdropPath" fit />
        </div>
        <div
          class="col-xs-12 col-sm-6 col-md-4"
          style="min-width: 50%; max-width: 75%"
        >
          <h1 style="font-size: 3.0em">{{ film.title }}</h1>
          <h3 class="text-overline">
            {{ film.tagline }}
          </h3>
          <q-separator />

          <div
            class="column inline justify-center q-pa-xs"
            v-for="genre in film.genres"
            :key="genre.id"
          >
            <q-chip square clickable @click="genreRoute(genre.id)">
              {{ genre.name }}
            </q-chip>
          </div>
          <q-separator />
          <div class="q-pa-xs">
            <p class="text-body1 text-weight-regular text-justify">
              {{ film.overview }}
            </p>
          </div>
          <q-separator />
          <div class="q-pa-xs row inline q-gutter-md">
            <h5 class="text-overline">Release Date {{ film.release_date }}</h5>
            <h5 class="text-overline">Vote Average:{{ film.vote_average }}</h5>
          </div>
          <q-separator />
          <q-expansion-item expand-separator label="Torrents" icon="menu" dense>
            <q-item
              clickable
              v-for="torrent in torrentInfo"
              :key="torrent.magnet"
              @click="openTorrent(torrent.magnet)"
            >
              <q-item-section>
                <q-item-label overline style="overflow-wrap: hidden">
                  {{ torrent.title }}
                </q-item-label>
                <q-item-label caption>
                  Peers: {{ torrent.peers }}
                </q-item-label>
                <q-item-label caption>
                  Seeds: {{ torrent.seeds }}
                </q-item-label>
                <q-item-label caption> Size: {{ torrent.size }} </q-item-label>
                <q-item-label caption>
                  Provider: {{ torrent.provider }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>
          <q-separator></q-separator>

          <q-expansion-item
            expand-separator
            dense
            label="Directors & Producers"
            icon="menu"
          >
            <div
              class="column inline items-center q-pa-xs"
              v-for="person in filmCredits.crew"
              :key="`${person.id}+${person.department}`"
              v-show="person.profile_path"
            >
              <q-avatar>
                <q-img
                  :src="`${IMAGE_BASE_URL_LESS}/${person.profile_path}`"
                  :ratio="1"
                  fit
                />
                <q-tooltip
                  anchor="top middle"
                  transition-show="rotate"
                  transition-hide="rotate"
                  :offset="[10, 10]"
                  >{{ person.name }} | {{ person.department }}</q-tooltip
                >
              </q-avatar>
            </div>
          </q-expansion-item>

          <q-separator></q-separator>

          <q-expansion-item expand-separator dense label="Cast" icon="menu">
            <div
              class="column inline items-center q-pa-xs"
              v-for="actor in filmCredits.cast"
              :key="actor.cast_id"
              v-show="actor.profile_path"
            >
              <q-avatar>
                <q-img
                  :src="`${IMAGE_BASE_URL_LESS}/${actor.profile_path}`"
                  :ratio="1"
                  fit
                />
                <q-tooltip
                  anchor="top middle"
                  :offset="[10, 10]"
                  transition-show="rotate"
                  transition-hide="rotate"
                  >{{ actor.name }}</q-tooltip
                >
              </q-avatar>
            </div>
          </q-expansion-item>

          <q-separator></q-separator>
        </div>
      </div>
      <div class="justify-center items-center row">
        <h5>Recommendations</h5>
        <div class="q-pa-md row items-center justify-center q-gutter-md">
          <div v-for="film in recommendations" :key="film.id">
            <film-card :film="film"></film-card>
          </div>
        </div>
      </div>
    </div>
    <fab-component />
  </q-page>
</template>

<script>
import axios from "axios";
import {
  MOVIE_BASE_URL,
  API_KEY,
  IMAGE_BASE_URL,
  RECOMMENDATIONS,
  PAGE,
  CREDITS,
  IMAGE_BASE_URL_LESS,
  TORRENT_URL
} from "../configs/urlConfigs";
import FilmCard from "../components/FilmCard";
import FabComponent from "../components/FabComponent";
export default {
  components: {
    "film-card": FilmCard,
    "fab-component": FabComponent
  },
  data() {
    return {
      film: {},
      backdropPath: "",
      filmCredits: {},
      recommendations: [],
      torrentInfo: [],
      IMAGE_BASE_URL_LESS: IMAGE_BASE_URL_LESS,
      page: 1
    };
  },
  methods: {
    onCreate() {
      this.film = {};
      this.filmCredits = {};
      this.recommendations = [];
      this.torrentInfo = [];
      this.page = 1;
      const id = this.$route.params.id;
      axios.get(`${MOVIE_BASE_URL}${id}${API_KEY}`).then(response => {
        this.film = response.data;
        this.backdropPath = `${IMAGE_BASE_URL}${this.film.poster_path}`;
        this.getTorrentsInfo();
        this.loadCredits(this.film.id);
        this.getRecommendations();
      });
    },
    getRecommendations(page = 1) {
      const { id } = this.$route.params;
      axios
        .get(`${MOVIE_BASE_URL}${id}${RECOMMENDATIONS}${API_KEY}${PAGE}${page}`)
        .then(response => this.recommendations.push(...response.data.results));
    },
    loadCredits(id) {
      axios.get(`${MOVIE_BASE_URL}${id}${CREDITS}${API_KEY}`).then(response => {
        this.filmCredits = response.data;
      });
    },
    getTorrentsInfo() {
      const { title } = this.film;
      let masked = String(title).replace(" ", ".");
      axios
        .get(`${TORRENT_URL}${masked}`)
        .then(response => (this.torrentInfo = response.data));
    },
    onPageEnded() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          this.page++;
          this.getRecommendations(this.page);
        }
      };
    },
    openTorrent(magnet) {
      window.open(magnet);
    },
    genreRoute(genreId) {
      this.$router.push(`/genrePage/${genreId}`);
    }
  },
  created() {
    this.onCreate();
    this.onPageEnded();
  },

  watch: {
    "$route.params.id"() {
      this.onCreate();
    }
  }
};
</script>

<style></style>
