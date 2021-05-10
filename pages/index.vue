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
                <span>USD</span>
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
              <b-input-group-prepend is-text>
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
        <h2 class="net-worth">${{ netWorth }}</h2>
        <!-- <h2 class="net-worth" v-if="country === 'INR'">&#8377;{{ netWorth }}</h2> -->
        today
      </h4>
    </b-row>
    <b-row class="mb-3">
      <h4 class="ads">
        Time in market is more important than timing the market!
      </h4>
      <div class="advice">* Not financial advice</div>
    </b-row>
    <b-row class="brand-logos">
      <b-col>
        <a href="https://uphold.com/signup?referral=28c2e578d8" target="_blank">
          <img class="card-img" src="../assets/uphold.png" alt="Uphold logo" />
        </a>
      </b-col>
      <b-col>
        <a href="https://www.binance.com/en">
          <svg
            class="binance"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 5120 1024"
          >
            <path
              d="M230.997333 512L116.053333 626.986667 0 512l116.010667-116.010667L230.997333 512zM512 230.997333l197.973333 197.973334 116.053334-115.968L512 0 197.973333 314.026667l116.053334 115.968L512 230.997333z m395.989333 164.992L793.002667 512l116.010666 116.010667L1024.981333 512l-116.992-116.010667zM512 793.002667l-197.973333-198.997334-116.053334 116.010667L512 1024l314.026667-314.026667-116.053334-115.968L512 793.002667z m0-165.973334l116.010667-116.053333L512 396.032 395.989333 512 512 626.986667z m1220.010667 11.946667v-1.962667c0-75.008-40.021333-113.024-105.002667-138.026666 39.978667-21.973333 73.984-58.026667 73.984-121.002667v-1.962667c0-88.021333-70.997333-145.024-185.002667-145.024h-260.992v561.024h267.008c126.976 0.981333 210.005333-51.029333 210.005334-153.002666z m-154.026667-239.957333c0 41.984-34.005333 58.965333-89.002667 58.965333h-113.962666V338.986667h121.984c52.010667 0 80.981333 20.992 80.981333 58.026666v2.005334z m31.018667 224c0 41.984-32.981333 61.013333-87.04 61.013333h-146.944v-123.050667h142.976c63.018667 0 91.008 23.04 91.008 61.013334v1.024z m381.994666 169.984V230.997333h-123.989333v561.024h123.989333v0.981334z m664.021334 0V230.997333h-122.026667v346.026667l-262.997333-346.026667h-114.005334v561.024h122.026667v-356.010666l272 356.992h104.96z m683.946666 0L3098.026667 228.010667h-113.962667l-241.024 564.992h127.018667l50.986666-125.994667h237.013334l50.986666 125.994667h130.005334z m-224.981333-235.008h-148.992l75.008-181.973334 73.984 181.973334z m814.037333 235.008V230.997333h-122.026666v346.026667l-262.997334-346.026667h-114.005333v561.024h122.026667v-356.010666l272 356.992h104.96z m636.970667-91.008l-78.976-78.976c-44.032 39.978667-83.029333 65.962667-148.010667 65.962666-96 0-162.986667-80-162.986666-176v-2.986666c0-96 67.968-174.976 162.986666-174.976 55.978667 0 100.010667 23.978667 144 62.976l78.976-91.008c-51.968-50.986667-114.986667-86.997333-220.970666-86.997334-171.989333 0-292.992 130.986667-292.992 290.005334V512c0 160.981333 122.965333 288.981333 288 288.981333 107.989333 1.024 171.989333-36.992 229.973333-98.986666z m527.018667 91.008v-109.994667h-305.024v-118.016h265.002666v-109.994667h-265.002666V340.992h301.013333V230.997333h-422.997333v561.024h427.008v0.981334z"
              p-id="2935"
            ></path>
          </svg>
        </a>
      </b-col>
      <b-col>
        <a href="https://join.robinhood.com/shreerp4" target="_blank">
          <img
            class="card-img"
            src="../assets/robinhood.png"
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
  width: 200px;
  margin: 2em 0;
}

h1,
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
</style>
