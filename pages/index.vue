<template>
  <b-container>
    <b-row class="main-content">
      <h1>If only!</h1>
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
                <IconCrypto
                  :coinname="this.selectedCrypto"
                  color="color"
                  format="svg"
                />
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
      <h4>
        It would be worth
        <h2 class="net-worth" v-if="$config.country === 'USD'">
          ${{ netWorth }}
        </h2>
        <h2 class="net-worth" v-if="$config.country === 'INR'">
          &#8377;{{ netWorth }}
        </h2>
        today
      </h4>
    </b-row>
    <b-row class="mb-3">
      <h4 class="ads">
        Time in market is more important than timing the market!
      </h4>
      <h6 class="ads">
        Choose one of the crypto currency exchanges/wallets below to get started!
      </h6>
      <div class="advice">* Not financial advice</div>
    </b-row>
    <b-row class="brand-logos">
      <b-col>
        <a href="https://uphold.com/signup?referral=28c2e578d8" target="_blank">
          <img class="card-img" src="../assets/uphold-icon.png" alt="Uphold logo" />
        </a>
      </b-col>
      <b-col>
        <a href="https://www.binance.com/en">
          <img class="card-img" src="../assets/binanceus-icon.png" alt="Binance logo" />
        </a>
      </b-col>
      <b-col>
        <a href="https://www.coinbase.com/join/patwar_t" target="_blank">
          <img class="card-img" src="../assets/coinbase-icon.png" alt="Coinbase logo" />
        </a>
      </b-col>
      <b-col>
        <a href="https://join.robinhood.com/shreerp4" target="_blank">
          <img class="card-img" src="../assets/robinhood-icon.png" alt="Robinhood logo" />
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
import IconCrypto from "vue-cryptocurrency-icons";

export default {
  data() {
    return {
      dollarValue: 10,
      netWorth: 10,

      selectedCrypto: "",
      cryptoOptions: [
        { value: "", text: "Please select a crypto" },
        { value: "BTC", text: "Bitcoin" },
        { value: "ETH", text: "Ethereum" },
        { value: "BNB", text: "Binance" },
        { value: "DOGE", text: "Dogecoin" },
        { value: "XRP", text: "Ripple" },
        { value: "USDT", text: "Tether" },
        { value: "ADA", text: "Cardano" },
        { value: "DOT", text: "Polkadot" },
        { value: "BCH", text: "Bitcoin Cash" },
        { value: "LTC", text: "Litecoin" },
        { value: "UNI", text: "Uniswap Protocol Token" },
        { value: "LINK", text: "ChainLink" },
        { value: "HEX", text: "HEX" },
        { value: "VET", text: "VeChain Thor" },
        { value: "USDC", text: "USD Coin" },
        { value: "ETC", text: "Ethereum Classic" },
        { value: "XLM", text: "Stellar" },
        { value: "SOL", text: "Solana" },
        { value: "SHIB", text: "Shiba Inu" },
        { value: "THETA", text: "Theta Token" },
        { value: "WBTC", text: "Wrapped Bitcoin" },
        { value: "FIL", text: "Filecoin" },
        { value: "TRX", text: "Tron" },
        { value: "EOS", text: "EOS" },
        { value: "OKB", text: "OKEx Utility Token" },
        { value: "XMR", text: "Monero" },
        { value: "BUSD", text: "Binance USD" },
        { value: "ALGO", text: "Algorand" },
        { value: "NEO", text: "NEO" },
        { value: "FTXTOKEN", text: "FTX Token" },
        { value: "ATOM", text: "Cosmos" },
        { value: "LUNA", text: "Luna" },
        { value: "CAKE", text: "PancakeSwap" },
        { value: "BSV", text: "Bitcoin SV" },
        { value: "CETH", text: "Compound Ether" },
        { value: "IOT", text: "IOTA (MIOTA)" },
        { value: "AAVE", text: "Aave" },
        { value: "KLAY", text: "Klaytn" },
        { value: "MATIC", text: "Polygon" },
        { value: "HT", text: "Huobi Token" },
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
  // computed: {
  //   country: function() {
  //     return process.env.COUNTRY_KEY
  //   }
  // },
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
          this.netWorth = res.data.toFixed(2);
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
      }
    },
    changeTimeInterval() {
      this.changedTimeIntervalValue = this.selectedTimeInterval;
      if (this.changedCryptoValue !== "") {
        this.getIncidents();
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
  background: -webkit-linear-gradient(45deg, #2f25dc, #00ab64 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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

.hacky-padding .input-group-text {
  padding: 7px !important;
}
</style>