<template>
  <b-container>
    <b-row class="main-content">
      <h1>What if 🤔</h1>
      <b-form>
        <h4>you had invested</h4>
        <br />
        <b-form-row class="mb-3">
          <b-col md class="mb-3">
            <b-input-group class="mb-2 mr-sm-2 mb-sm-0" size="lg">
              <b-input-group-prepend is-text>
                <span>{{ $config.country }}</span>
              </b-input-group-prepend>
              <b-form-input
                v-model.number="dollarValue"
                placeholder="Enter a positive $ value"
                @change="chageDollarValue(dollarValue)"
              ></b-form-input>
            </b-input-group>
          </b-col>
          <b-col md class="mb-3">
            <b-input-group class="mb-2 mr-sm-2 mb-sm-0" size="lg">
              <b-input-group-prepend is-text class="hacky-padding">
                <client-only>
                  <cryptoicon :symbol="this.selectedCrypto" size="26" generic />
                </client-only>
              </b-input-group-prepend>
              <b-form-select
                v-model="selectedCrypto"
                :options="cryptoOptions"
                @change="changeCrypto(selectedCrypto)"
              ></b-form-select>
            </b-input-group>
          </b-col>
          <b-col md class="mb-3">
            <b-form-select
              size="lg"
              v-model="selectedTimeInterval"
              :options="timeIntervalOptions"
              @change="changeTimeInterval(selectedTimeInterval)"
            ></b-form-select>
          </b-col>
        </b-form-row>
      </b-form>
      <br />
      <h4>It would be worth</h4>
      <h2 class="net-worth" v-if="$config.country === 'USD'">
        <span class="magic-color">${{ netWorth }}</span>
      </h2>
      <h2 class="net-worth" v-if="$config.country === 'INR'">
        <span class="magic-color">&#8377;{{ netWorth }}</span>
      </h2>
      <h4>today.</h4>
      <h4>
        {{ netPercent < 0 ? "Sadly, that's" : "That's" }} a
        {{ netPercent > 100 ? "roaring" : "" }}
        <span class="magic-color">{{ Math.abs(netPercent) }}%</span>
        {{
          netPercent > 0 ? "return on investment 🎉" : "loss in investment 😢"
        }}
      </h4>
    </b-row>
    <b-row class="mb-3">
      <h4 class="ads">
        Time in market is more important than timing the market!
      </h4>
      <h6 class="ads">
        Choose one of the crypto currency exchanges/wallets below to get
        started!
      </h6>
      <div class="advice">* Not financial advice</div>
    </b-row>
    <b-row class="brand-logos">
      <b-col>
        <a href="https://uphold.com/signup?referral=28c2e578d8" target="_blank">
          <img
            class="card-img"
            src="../assets/uphold-icon.png"
            alt="Uphold logo"
          />
        </a>
      </b-col>
      <b-col>
        <a href="https://www.binance.com/en">
          <img
            class="card-img"
            src="../assets/binanceus-icon.png"
            alt="Binance logo"
          />
        </a>
      </b-col>
      <b-col>
        <a href="https://www.coinbase.com/join/patwar_t" target="_blank">
          <img
            class="card-img"
            src="../assets/coinbase-icon.png"
            alt="Coinbase logo"
          />
        </a>
      </b-col>
      <b-col>
        <a href="https://join.robinhood.com/shreerp4" target="_blank">
          <img
            class="card-img"
            src="../assets/robinhood-icon.png"
            alt="Robinhood logo"
          />
        </a>
      </b-col>
    </b-row>
    <b-row>
      <p class="ads">
        Developed by <a href="https://twitter.com/shreerangp">@shreerangp</a>
      </p>
    </b-row>
    <b-row>
      <p class="ads">
        <a
          href="https://nomics.com"
          target="_blank"
          class="n-black n-underline-purple"
          >Crypto Market Cap &amp; Pricing Data Provided By Nomics</a
        >
      </p>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      dollarValue: 10,
      netWorth: 10,
      netPercent: 100,

      selectedCrypto: "",
      cryptoOptions: [
        { value: "", text: "Please select a crypto" },
        { value: "BTC", text: "Bitcoin ($BTC)" },
        { value: "ETH", text: "Ethereum ($ETH)" },
        { value: "BNB", text: "Binance ($BNB)" },
        { value: "DOGE", text: "Dogecoin ($DOGE)" },
        { value: "XRP", text: "Ripple  ($XRP)" },
        { value: "USDT", text: "Tether ($USDT)" },
        { value: "ADA", text: "Cardano ($ADA)" },
        { value: "DOT", text: "Polkadot ($DOT)" },
        { value: "BCH", text: "Bitcoin Cash ($BCH)" },
        { value: "LTC", text: "Litecoin ($LTC)" },
        { value: "UNI", text: "Uniswap Protocol Token ($UNI)" },
        { value: "LINK", text: "ChainLink ($LINK)" },
        { value: "HEX", text: "HEX" },
        { value: "VET", text: "VeChain Thor ($VET)" },
        { value: "USDC", text: "USD Coin ($USDC)" },
        { value: "ETC", text: "Ethereum Classic ($ETC)" },
        { value: "XLM", text: "Stellar ($XLM)" },
        { value: "SOL", text: "Solana ($SOL)" },
        { value: "SHIB", text: "Shiba Inu ($SHIB)" },
        { value: "THETA", text: "Theta Token ($THETA)" },
        { value: "WBTC", text: "Wrapped Bitcoin ($WBTC)" },
        { value: "FIL", text: "Filecoin ($FIL)" },
        { value: "TRX", text: "Tron ($TRX)" },
        { value: "EOS", text: "EOS" },
        { value: "OKB", text: "OKEx Utility Token ($OKB)" },
        { value: "XMR", text: "Monero ($XMR)" },
        { value: "BUSD", text: "Binance USD ($BUSD)" },
        { value: "ALGO", text: "Algorand ($ALGO)" },
        { value: "NEO", text: "NEO" },
        { value: "FTXTOKEN", text: "FTX Token ($FTXTOKEN)" },
        { value: "ATOM", text: "Cosmos ($ATOM)" },
        { value: "LUNA", text: "Luna ($LUNA)" },
        { value: "CAKE", text: "PancakeSwap ($CAKE)" },
        { value: "BSV", text: "Bitcoin SV ($BSV)" },
        { value: "CETH", text: "Compound Ether ($CETH)" },
        { value: "IOT", text: "IOTA (MIOTA) ($IOT)" },
        { value: "AAVE", text: "Aave ($AAVE)" },
        { value: "KLAY", text: "Klaytn ($KLAY)" },
        { value: "MATIC", text: "Polygon ($MATIC)" },
        { value: "HT", text: "Huobi Token ($HT)" },
      ],
      changedCryptoValue: "",

      selectedTimeInterval: null,
      timeIntervalOptions: [
        { value: null, text: "Please select a time interval" },
        { value: "1h", text: "Last 1 hour" },
        { value: "1d", text: "Yesterday" },
        { value: "7d", text: "Last week" },
        { value: "30d", text: "Last month" },
        { value: "365d", text: "Last year" },
        { value: "ytd", text: "on Jan 1, 2021" },
      ],
      changedTimeIntervalValue: "",

      incidents: "",
    };
  },
  methods: {
    async getIncidents() {
      return axios
        .get("/api/net-worth", {
          params: {
            currency: this.dollarValue,
            crypto: this.changedCryptoValue,
            time: this.changedTimeIntervalValue,
          },
        })
        .then((res) => {
          this.netWorth = res.data.finalValueData.toFixed(2);
          this.netPercent = res.data.finalPercentData.toFixed(2);
        });
    },
    chageDollarValue() {
      this.dollarValue = this.dollarValue;
      if (
        this.changedTimeIntervalValue !== "" &&
        this.changedCryptoValue !== ""
      ) {
        this.getIncidents();
      }
    },
    changeCrypto() {
      this.changedCryptoValue = this.selectedCrypto;
      if (this.changedTimeIntervalValue !== "") {
        this.getIncidents();
        this.$ga.event(
          "cryptoClick",
          "select",
          "selectedCrypto",
          this.changedCryptoValue
        );
      }
    },
    changeTimeInterval() {
      this.changedTimeIntervalValue = this.selectedTimeInterval;
      if (this.changedCryptoValue !== "") {
        this.getIncidents();
        this.$ga.event(
          "timeInterval",
          "select",
          "selectedTimeInterval",
          this.changedTimeIntervalValue
        );
      }
    },
  },
};
</script>

<style>
.main-content {
  margin: 0 auto;
  min-height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
}

body {
  background: linear-gradient(90deg, #effaff 0%, #d9e7ff 100%);
}

.links {
  padding-top: 15px;
}

.card-img {
  width: 55px;
  margin: 2em 0;
}

h1 {
  font-size: 3em;
}

h2 {
  font-size: 4em;
}

.magic-color {
  background: -webkit-linear-gradient(45deg, #2f25dc, #00ab64 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1em;
}

h2.net-worth {
  width: 100%;
  font-size: 2.5em;
  word-break: break-all;
}

.ads {
  text-align: center;
  width: 100%;
  padding: 10px 10px;
}

.brand-logos {
  margin: auto;
  text-align: center;
  justify-content: center;
  align-content: center;
}

.binance {
  box-sizing: border-box;
  margin: 2.2em auto;
  min-width: 0;
  width: 200px;
  fill: #f0b90b;
}

.advice {
  font-size: 10px;
  margin: 0 10px;
  text-align: center;
  width: 100%;
}
</style>