<template>
  <div class="container">
    <div>
      <Logo />
      <b-form inline>
        <h4>$ </h4>
        <b-form-input class="mb-2 mr-sm-2 mb-sm-0" v-model="dollarValue" placeholder="10" @change="chageDollarValue(dollarValue)"></b-form-input>
        <h4> invested in </h4>
        <b-form-select class="mb-2 ml-sm-2 mr-sm-4 mb-sm-0" v-model="selectedCrypto" :options="cryptoOptions" @change="changeCrypto(selectedCrypto)"></b-form-select>
        <b-form-select class="mb-2 mb-sm-0" v-model="selectedTimeInterval" :options="timeIntervalOptions" @change="changeTimeInterval(selectedTimeInterval)"></b-form-select>
      </b-form>
      <h4>would be worth ${{this.profitloss}} today</h4>
    </div>
  </div>
</template>

<script>
export default {

  data() {
      return {
        dollarValue:10,

        selectedCrypto: null,
        cryptoOptions: [
          { value: null, text: 'Please select an option' },
          { value: 'BTC', text: 'Bitcoin' },
          { value: 'DOGE', text: 'Dogecoin' },
          { value: 'ADA', text: 'Cardano' },
          { value: 'XRP', text: 'XRP' }
        ],
        changedCryptoValue: "",

        selectedTimeInterval: null,
        timeIntervalOptions: [
          { value: null, text: 'Please select an option' },
          { value: '1d', text: 'Yesterday' },
          { value: '30d', text: 'Last month' },
          { value: '365d', text: 'last year' },
          { value: 'ytd', text: 'day it was listed' }
        ],
        changedTimeIntervalValue: "",

        incidents: "",
      }
    },
  computed: {
    profitloss: function() {
      console.log(this.dollarValue)
      return (Number(this.dollarValue) + (Number(this.dollarValue) * (this.incidents * 100))/100)
    } 
  },
  methods: {
    async getIncidents() {
      let res = await this.$store.dispatch("getIncidents", {"cryptoType": this.changedCryptoValue, "timeInterval": this.changedTimeIntervalValue});
      this.incidents = res.data[0][this.changedTimeIntervalValue  ].price_change_pct;
    },
    chageDollarValue() {
      this.dollarValue = this.dollarValue
      if(this.changedTimeIntervalValue !== "" && this.changedCryptoValue !== "") {
        this.getIncidents()
      }
    },
    changeCrypto() {
      this.changedCryptoValue = this.selectedCrypto
      if(this.changedTimeIntervalValue !== "") {
        this.getIncidents()
      }
    },
    changeTimeInterval() {
      this.changedTimeIntervalValue = this.selectedTimeInterval
      console.log(this.changedCryptoValue)
      if(this.changedCryptoValue !== "") {
        this.getIncidents()
      }
    }
  }
}

</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
