<template>
  <q-btn
    class="col items-center justify-center q-pad-md q-gutter-md"
    flat
    dense
    :to="link"
  >
    <q-card class="my-card">
      <img :src="String(imgBase + film.poster_path)" />
    </q-card>
  </q-btn>
</template>

<script>
import { IMAGE_BASE_URL } from "../configs/urlConfigs";
export default {
  name: "FilmCard",
  props: ["film"],
  data() {
    return {
      imgBase: IMAGE_BASE_URL,
      link: `/moviePage/${this.film.id}`
    };
  }
};
</script>

<style></style>
