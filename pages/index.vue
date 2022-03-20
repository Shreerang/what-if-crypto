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
      <div v-if="changedTimeIntervalValue && changedCryptoValue">
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
        <br />
        
      </div>
    </b-row>
    <b-row class="mb-3">
      <div class="advice">* Not financial advice</div>
      <br />
      <h5 class="ads" v-if="changedTimeIntervalValue">
        <client-only>
          <cryptoicon :symbol="this.selectedCrypto" size="26" generic />
        </client-only>
        {{selectedCrypto}} is currently priced at <span class="magic-color"><b>${{ netPrice }}</b></span>
        <br /><br />
        ${{selectedCrypto}} was at it's all time high price of <span class="magic-color"><b>${{ allTimeHigh }}</b> on {{ new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: 'numeric'}).format(athWhen) }}</span>
      </h5>
      <p class="ads">
        If you haven't yet started investing,
        <br />
        get started using one of these crypto currency exchanges/wallets
      </p>
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
        If you are already investing in cryptocurrencies,
        <br />
        you are liable to declare the income and pay taxes on the income
        <br />
        and CoinTracker can help with that.
      </p>
      <b-col class="special-col">
        <a href="https://www.cointracker.io/i/8TpD1OI4LJlI" target="_blank">
          <img
            class="card-img"
            src="../assets/cointracker-icon.jpeg"
            alt="Cointracker logo"
          />
        </a>
      </b-col>
    </b-row>
    <!-- <b-row>
      <p class="ads">
        Happy Pride month! 🏳️‍🌈
      </p>
    </b-row> -->
    <b-row>
      <p class="ads">
        Developed with 💞 by <a href="https://twitter.com/shreerangp">@shreerangp</a>
      </p>
      <p class="ads special-ads">
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
      dollarValue: 100,
      netWorth: 100,
      netPercent: 100,
      netPrice: 0,
      allTimeHigh: 0,
      athWhen: '',

      selectedCrypto: "DOGE",
      cryptoOptions: [
        { value: "", text: "Please select a crypto" },
        { value: "BTC", text: "Bitcoin ($BTC)" },
        { value: "ETH", text: "Ethereum ($ETH)" },
        { value: "HEX", text: "HEX" },
        { value: "BNB", text: "Binance ($BNB)" },
        { value: "USDT", text: "Tether ($USDT)" },
        { value: "ADA", text: "Cardano ($ADA)" },
        { value: "XRP", text: "Ripple  ($XRP)" },
        { value: "SOL", text: "Solana ($SOL)" },
        { value: "DOT", text: "Polkadot ($DOT)" },
        { value: "DOGE", text: "Dogecoin ($DOGE)" },
        { value: "USDC", text: "USD Coin ($USDC)" },
        { value: "SHIB", text: "Shiba Inu ($SHIB)" },
        { value: "UNI", text: "Uniswap Protocol Token ($UNI)" },
        { value: "LUNA", text: "Luna ($LUNA)" },
        { value: "WBTC", text: "Wrapped Bitcoin ($WBTC)" },
        { value: "BUSD", text: "Binance USD ($BUSD)" },
        { value: "LTC", text: "Litecoin ($LTC)" },
        { value: "AVAX", text: "Avalanche ($AVAX)" },
        { value: "LINK", text: "ChainLink ($LINK)" },
        { value: "ALGO", text: "Algorand ($ALGO)" },
        { value: "BCH", text: "Bitcoin Cash ($BCH)" },
        { value: "FTXTOKEN", text: "FTX Token ($FTXTOKEN)" },
        { value: "MATIC", text: "Polygon ($MATIC)" },
        { value: "XLM", text: "Stellar ($XLM)" },
        { value: "ATOM", text: "Cosmos ($ATOM)" },
        { value: "VET", text: "VeChain Thor ($VET)" },
        { value: "ICP", text: "Dfinity ($ICP)" },
        { value: "AXS", text: "Axie Infinity ($AXS)" },
        { value: "FIL", text: "Filecoin ($FIL)" },
        { value: "TRX", text: "Tron ($TRX)" },
        { value: "DAI", text: "Dai ($DAI)" },
        { value: "ETC", text: "Ethereum Classic ($ETC)" },
        { value: "CETH", text: "Compound Ether ($CETH)" },
        { value: "THETA", text: "Theta Token ($THETA)" },
        { value: "XTZ", text: "Tezos ($XTZ)" },
        { value: "FTM", text: "Fantom ($FTM)" },
        { value: "HBAR", text: "Hedera Hashgraph ($HBAR)" },
        { value: "TETH", text: "Liquid Stacked Ether ($TETH)" },
        { value: "XMR", text: "Monero ($XMR)" },
        { value: "CRO", text: "Crypto.com Chain ($CRO)" },
        { value: "CAKE", text: "PancakeSwap ($CAKE)" },
        { value: "EGLD", text: "Elrond ($EGLD)" },
        { value: "FLOW", text: "Flow ($FLOW)" },
        { value: "OKB", text: "OKEx Utility Token ($OKB)" },
        { value: "EOS", text: "EOS ($EOS)" },
        { value: "NEO", text: "NEO" },
        { value: "RUNE", text: "Thorchain ($RUNE)" },
        { value: "CSPR", text: "Casper ($CSPR)" },
        { value: "BSV", text: "Bitcoin SV ($BSV)" },
        { value: "IOT", text: "IOTA (MIOTA) ($IOT)" },
        { value: "AAVE", text: "Aave ($AAVE)" },
        { value: "KLAY", text: "Klaytn ($KLAY)" },
        { value: "HT", text: "Huobi Token ($HT)" },
        { value: "SAND", text: "The Sandbox ($SAND)" },
        { value: "CRV", text: "Curve Dao Token ($CRV)" },
        { value: "SUSHI", text: "SushiSwap ($SUSHI)" },
        { value: "1INCH", text: "1inch Network ($1INCH)"},
        { value: "APE", text: "ApeCoin ($APE)"},
        { value: "AR", text: "Arweave ($AR)"},
        { value: "BADGER", text: "Badger ($BADGER)"},
        { value: "BAL", text: "Balancer ($BAL)"},
        { value: "BNT", text: "Bancor ($BNT)"},
        { value: "MANA", text: "Decentraland ($MANA)"},
        { value: "GALA", text: "Gala ($GALA)"},
        { value: "KP3R", text: "Keep3rV1 ($KP3R)"},
        { value: "KSM", text: "Kusama ($KSM)"},
        { value: "LRC", text: "Loopring ($LRC)"},
        { value: "MOVR", text: "MoonRiver ($MOVR)"},
        { value: "NU", text: "NuCypher ($NU)"},
        { value: "RAY", text: "Raydium ($RAY)"},
      ],
      changedCryptoValue: "DOGE",

      selectedTimeInterval: null,
      timeIntervalOptions: [
        { value: null, text: "Please select a time interval" },
        { value: "1h", text: "Last 1 hour" },
        { value: "1d", text: "Yesterday" },
        { value: "7d", text: "Last week" },
        { value: "30d", text: "Last month" },
        { value: "365d", text: "Last year" },
        { value: "ytd", text: "on Jan 1, 2022" },
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
          this.netPrice = res.data.currentPriceData.toFixed(2);
          this.allTimeHigh = res.data.allTimeHighData.toFixed(2);
          this.athWhen = new Date(res.data.athWhenData)
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
body {
  /* background-color: var(--secondary); */
  /* color: var(--light); */
}

.main-content {
  margin: 0 auto;
  min-height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
}

.card-img {
  width: 2.5em;
  margin: 0 0 1em 0;
}

h1 {
  font-size: 3em;
}

h2 {
  font-size: 4em;
}

.magic-color {
  background: -webkit-linear-gradient(45deg, rgb(255, 22, 61), rgb(210, 0, 252) 80%);
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
  margin-bottom: 0;
}

.ads a {
  /* color: var(--light); */
  text-decoration: underline;
}

.special-ads {
  font-size: 10px;
}

.brand-logos {
  margin: auto;
  text-align: center;
  justify-content: center;
  align-content: center;
}

.advice {
  font-size: 10px;
  margin: 0 10px;
  text-align: center;
  width: 100%;
}

.special-col {
  text-align: center;
}
</style>