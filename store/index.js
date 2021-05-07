export const actions = {
    async getIncidents(state, payload) {
      let res = await this.$axios.get('/ticker?key=ac80cd3870e37f8903b9ebb623b91611&ids=' + payload.cryptoType + '&interval=' + payload.timeInterval)
      return res;
    }
  }