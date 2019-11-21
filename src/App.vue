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
            <font-awesome-icon :icon="['far', 'file']"/>
            <router-link to="/posters">
              <span class="md-list-item-text">Posters</span>
            </router-link>
          </md-list-item>

          <md-list-item>
            <font-awesome-icon :icon="['far', 'folder']"/>
            <router-link to="/folders">
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
      toggleMenu() {
        this.menuVisible = !this.menuVisible;
      }
    },
  };
</script>

<style lang="scss">
  html, body {
    width: 100%;
    height: 100%;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;

    .md-app {
      height: 100%;

      .md-title a:not(.md-button) {
        color: #000000;

        &:hover {
          text-decoration: none;
        }
      }

      .md-app-drawer {
        width: 180px;
      }
    }
  }

  .md-app-drawer {
    .md-list-item {
      .md-list-item-content {
        justify-content: left;
      }

      span {
        margin-left: 15px;
        font-size: 16px;
        text-align: left;
      }
    }

    a:not(.md-button) {
      color: #000000;

      &:hover {
        color: rgba(0, 0, 0, 0.6);
        text-decoration: none;
        -webkit-transition: all 0.50s ease-in-out;
      }
    }
  }
</style>
