<template>
  <div class="posters">
    <h1>Create your own poster</h1>

    <div class="selections">
      <RadioInputList :items="sizeTypes" nl-or-en="nl" @itemSelected="onSizeTypeSelected"/>
      <RadioInputList v-if="selectedSizeType === 'A-formaten'" :items="aSizes" nl-or-en="nl"
                      @itemSelected="onFormatSelected"/>
      <RadioInputList v-if="selectedSizeType === 'B-formaten'" :items="bSizes" nl-or-en="nl"
                      @itemSelected="onFormatSelected"/>
      <RadioInputList v-if="selectedSizeType === 'Specials'" :items="specials" nl-or-en="nl"
                      @itemSelected="onFormatSelected"/>
      <RadioInputList v-if="selectedSizeType === 'Stoepbord posters'" :items="pavementSignSizes"
                      nl-or-en="nl" @itemSelected="onFormatSelected"/>

      <RadioInputList v-if="selectedFormat" :items="printtypes" nl-or-en="nl"
                      @itemSelected="onPrintTypeSelected"/>

      <RadioInputList v-if="selectedPrintType" :items="numberOptions" nl-or-en="en"
                      @itemSelected="onNumberOfPrintsSelected"/>
    </div>

    <div class="right-wrapper">
      <div class="selection-information">
        <h2>Mijn geselecteerde keuzes:</h2>
        <span><label>Formaat: </label> {{ selectedSizeType }}</span>
        <span><label>Formaat (b x h): </label> {{ selectedFormat }}</span>
        <span><label>Bedrukking: </label> {{ selectedPrintType }}</span>
        <span><label>Aantal: </label> {{ selectedNumberOfPrints }}</span>

        <md-button v-if="selectedNumberOfPrints" class="md-raised" @click="addProductToCart()">Add to cart</md-button>
      </div>

      <div v-if="products.length > 0" class="shopping-cart">
        <h2>Mijn winkelwagen:</h2>
        <span v-for="product in products">
          {{ product.numberOfPrints }} x {{ product.format }} {{ product.printType }}
        </span>

        <md-button class="md-raised" @click="placeOrder()">Order plaatsen</md-button>
      </div>
    </div>

    <md-snackbar md-position="center" :md-duration="50000" :md-active.sync="showSnackbar" md-persistent>
      <span>Order geplaatst</span>
      <md-button class="md-primary" @click="showSnackbar = false">OK</md-button>
    </md-snackbar>
  </div>
</template>

<script>
  import axios from 'axios';
  import RadioInputList from '../components/RadioInputList';

  export default {
    name: 'Posters',
    components: {
      RadioInputList
    },
    data() {
      return {
        selectedSizeType: null,
        selectedFormat: null,
        selectedPrintType: null,
        selectedNumberOfPrints: null,
        formatOptions: [],
        sizeOptions: [],
        printtypeOptions: [],
        numberOptions: [],
        products: [],
        showSnackbar: false,
      };
    },
    computed: {
      sizes: function () {
        return this.sizeOptions.filter(s => s.name != null)
          .map(size => {
            this.$set(size, 'checked', false);
            return size;
          });
      },
      sizeTypes: function () {
        return this.sizes.filter(s => !s.parent)
          .sort((a, b) => this.sortAlphabetically(a.name.nl, b.name.nl));
      },
      aSizes: function () {
        return this.sizes.filter(s => s.parent === 'a_formaten');
      },
      bSizes: function () {
        return this.sizes.filter(s => s.parent === 'b_formaten');
      },
      specials: function () {
        return this.sizes.filter(s => s.parent === 'specials');
      },
      pavementSignSizes: function () {
        return this.sizes.filter(s => s.parent === 'pavement_sign');
      },
      printtypes: function () {
        return this.printtypeOptions.filter(s => s.name != null)
          .map(size => {
            this.$set(size, 'checked', false);
            return size;
          });
      },
    },
    methods: {
      getFormatOptions() {
        axios
          .get('/data/posters.json')
          .then(response => {
            const formatOptions = response.data.propertyGroups.find(p => p.title.nl === 'Formaat');
            this.sizeOptions = formatOptions.properties.find(o => o.slug === 'size').options;
            this.printtypeOptions = formatOptions.properties.find(o => o.slug === 'printtype').options;
            this.formatOptions = formatOptions;

            this.numberOptions = response.data.propertyGroups.find(p => p.title.nl === 'Aantal').properties[0].options;
          });
      },
      onSizeTypeSelected(selection) {
        this.selectedSizeType = selection;
      },
      onFormatSelected(selection) {
        this.selectedFormat = selection;
      },
      onPrintTypeSelected(selection) {
        this.selectedPrintType = selection;
        console.log(this.selectedPrintType);
      },
      onNumberOfPrintsSelected(selection) {
        this.selectedNumberOfPrints = selection;
      },
      sortAlphabetically(a, b) {
        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
        return 0;
      },
      addProductToCart() {
        const product = {
          formatType: this.selectedSizeType,
          format: this.selectedFormat,
          printType: this.selectedPrintType,
          numberOfPrints: this.selectedNumberOfPrints,
        };
        this.products.push(product);
      },
      placeOrder() {
        this.showSnackbar = true;
      }
    },
    beforeMount() {
      this.getFormatOptions();
    },
  };
</script>

<style lang="scss" scoped>
  .posters {
    display: grid;
    grid-template-columns: auto 400px;
    grid-template-rows: 80px auto;

    h1 {
      text-align: left;
      margin: 20px;

      grid-column: 1 / 1;
    }

    .selections {
      grid-column: 1 / 1;

      margin: 20px;
    }

    .right-wrapper{
      .selection-information, .shopping-cart {
        grid-row: 2 / 1;
        min-height: 240px;

        margin: 20px;
        padding: 20px;
        text-align: left;

        border: 1px solid #000000;
        border-radius: 10px;

        .md-button {
          margin: 20px 20px 20px 0;
        }

        span {
          display: block;
        }
      }
    }


    .md-list {
      padding: 0 0 8px 0;

      .md-list-item {
        border-width: 1px 1px 0 1px;
        border-style: solid;
        border-color: #000000;

          justify-content: left;

        &:hover {
          background-color: #e6e6e6;
        }

        &:last-child {
          border-bottom: 1px;
          border-style: solid;
          border-color: #000000;
        }

        &.checked {
          background-color: lightgray;
        }

        input[type=radio] {
          visibility: hidden;
          position: fixed;
        }
      }
    }

    .md-snackbar {
      background-color: #ffffff;
    }
  }
</style>
