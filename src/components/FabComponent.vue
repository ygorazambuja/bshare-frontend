<template>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">What are you looking for ?</div>
        </q-card-section>

        <q-card-section>
          <q-input dense v-model="filmName" autofocus @keyup.enter="prompt = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Confirm" @click="searchFilm" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-fab icon="add" direction="left" color="black">
      <q-fab-action color="amber" text-color="black" @click="show" icon="share" />
      <q-fab-action color="amber" text-color="black" @click="prompt = !prompt" icon="search" />
    </q-fab>
  </q-page-sticky>
</template>

<script>
export default {
  components: {},
  name: "FabComponent",
  data() {
    return {
      prompt: false,
      filmName: ""
    };
  },
  methods: {
    onClick() {},
    searchFilm() {
      const { filmName } = this;
      this.$router.push(`/searchPage/${filmName}`);
    },
    show(grid) {
      this.$q
        .bottomSheet({
          dark: true,
          message: "Bottom Sheet message",
          grid,
          actions: [
            {
              label: "Drive",
              img: "https://cdn.quasar.dev/img/logo_drive_128px.png",
              id: "drive"
            },
            {
              label: "Keep",
              img: "https://cdn.quasar.dev/img/logo_keep_128px.png",
              id: "keep"
            },
            {
              label: "Google Hangouts",
              img: "https://cdn.quasar.dev/img/logo_hangouts_128px.png",
              id: "calendar"
            },
            {
              label: "Calendar",
              img: "https://cdn.quasar.dev/img/logo_calendar_128px.png",
              id: "calendar"
            },
            {},
            {
              label: "Share",
              icon: "share",
              id: "share"
            },
            {
              label: "Upload",
              icon: "cloud_upload",
              color: "primary",
              id: "upload"
            },
            {},
            {
              label: "John",
              avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
              id: "john"
            }
          ]
        })
        .onOk(() => {
          // console.log('Action chosen:', action.id)
        })
        .onCancel(() => {
          // console.log('Dismissed')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    }
  }
};
</script>

<style></style>
