<template>
  <md-list>
    <md-list-item v-for="item in items" :key="item.slug" @click="checkItem(item, items)" v-bind:class="{ 'checked': item.checked }">
      <span v-if="item.name">{{ item.name[nlOrEn] }}</span>
      <input :name="item.name" type="radio" :value="item.name" :checked="item.checked">
      <font-awesome-icon v-if="item.checked" :icon="['far', 'check-circle']"/>
    </md-list-item>
  </md-list>
</template>

<script>
  export default {
    name: 'RadioInputList',
    data() {
      return {
        selectedItem: null,
      };
    },
    props: {
      items: {
        type: Array,
      },
      nlOrEn: {
        type: String,
      },
    },
    methods: {
      checkItem(item, items) {
        items.map(i => {
          if(item !== i) {
            i.checked = false;
          }
        });
        item.checked = !item.checked;
        if (item.checked) {
          this.selectedItem = item.name.nl;
          this.$emit('itemSelected', this.selectedItem)
        }
      },
    }
  };
</script>

<style lang="scss" scoped>
  .md-list {
    margin-bottom: 20px;

    .md-list-item {
      border-width: 1px 1px 0 1px;
      border-style: solid;
      border-color: #000000;

      &:hover {
        background-color: rgba(85, 175, 194, 1);
      }

      &:last-child {
        border-bottom: 1px;
        border-style: solid;
        border-color: #000000;
      }

      &.checked {
        background-color: #5394a7;
        span, .fa-check-circle {
          color: #ffffff;
          font-weight: bold;
        }
      }

      input[type=radio] {
        visibility: hidden;
        position: fixed;
      }
    }
  }
</style>
