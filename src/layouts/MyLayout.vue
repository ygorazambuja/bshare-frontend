<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar class="bg-black">
        <q-btn dense flat round icon="menu" @click="status = !status" />
        <q-toolbar-title>BShare</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="status"
      side="left"
      behavior="mobile"
      elevated
      :breakpoint="700"
      show-if-above
    >
      <q-list>
        <q-item-label header>Categories</q-item-label>
        <q-item clickable v-ripple>
          <q-item-section>Movies</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section>
            TV
            <span style="font-weight: bolder">INCOMING</span>
          </q-item-section>
        </q-item>

        <q-item-label header>Genres</q-item-label>

        <q-item>
          <q-item-section>Trending</q-item-section>
        </q-item>

        <q-item
          v-for="genre in genreList"
          :key="genre.id"
          clickable
          v-ripple
          :to="`/genrePage/${genre.id}`"
        >
          <q-item-section>{{ genre.name }}</q-item-section>
          <q-item-section avatar>
            <q-icon color="primary" :name="genre.icon" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import genreList from "../configs/genreList";
export default {
  data: () => ({
    status: false,
    text: "",
    genreList: genreList
  })
};
</script>

<style></style>
