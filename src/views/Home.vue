<template>
  <div class="home">
    <router-link to="/posters">
      <md-content class="md-elevation-1"><img src="@/assets/poster.jpg" alt="Posters" title="Posters" /></md-content>
    </router-link>

    <router-link to="/folders">
      <md-content class="md-elevation-2"><img src="@/assets/folders.png" alt="Folders" title="Folders" /></md-content>
    </router-link>

    <router-link to="/businesscards">
      <md-content class="md-elevation-3"><img src="@/assets/businesscards.png" alt="Business cards" title="Business cards" /></md-content>
    </router-link>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {
  },
  data() {
    return {
      searchTerm: '',
      selectedProduct: null,
      posters: [],
    };
  },
};
</script>

<style lang="scss" scoped>
  .home {
    padding: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .md-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media screen and (min-width: 360px) {
    .md-content {
      width: 200px;
      height: 200px;
      margin: 5px;
    }
  }

  @media screen and (min-width: 500px) {
    .md-content {
      width: 400px;
      height: 400px;
      margin: 15px;
    }
  }
</style>
