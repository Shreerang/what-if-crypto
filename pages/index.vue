<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        What if
      </h1>
      <h3>I would have invested $1 in</h3>
      <b-form-select v-model="selectedCrypto" :options="cryptoOptions"></b-form-select>
      <br /><br />
      <b-form-select v-model="selectedTimeInterval" :options="timeIntervalOptions"></b-form-select>
      <br /><br />
      <h3>It would be worth $100 today</h3>
    </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
        selectedCrypto: null,
        cryptoOptions: [
          { value: null, text: 'Please select an option' },
          { value: 'BTC', text: 'Bitcoin' },
          { value: 'DOGE', text: 'Dogecoin' },
          { value: 'ADA', text: 'Cardano' },
          { value: 'XRP', text: 'XRP' }
        ],
        selectedTimeInterval: null,
        timeIntervalOptions: [
          { value: null, text: 'Please select an option' },
          { value: '1d', text: 'Yesterday' },
          { value: '30d', text: 'Last month' },
          { value: '365d', text: 'last year' },
          { value: 'ytd', text: 'day it was listed' }
        ]
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
