<template>
  <div id="app">
    <md-app>
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title"><router-link to="/">Product selector</router-link></span>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" md-persistent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          <span>Navigation</span>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="toggleMenu">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-list>
          <md-list-item>
            <router-link to="/posters">
              <font-awesome-icon :icon="['far', 'file']"/>
              <span class="md-list-item-text">Posters</span>
            </router-link>
          </md-list-item>

          <md-list-item>
            <router-link to="/folders">
              <font-awesome-icon :icon="['far', 'folder']"/>
              <span class="md-list-item-text">Folders</span>
            </router-link>
          </md-list-item>

          <md-list-item>
              <font-awesome-icon :icon="['far', 'address-card']"/>
            <router-link to="/businesscards">
              <span class="md-list-item-text">Business cards</span>
            </router-link>
          </md-list-item>

        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view/>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        menuVisible: false,
      };
    },
    methods: {
      toggleMenu () {
        this.menuVisible = !this.menuVisible
      }
    },
  };
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.md-list-item {

  span {
    margin-left: 15px;
    font-size: 16px;
  }
}

</style>
