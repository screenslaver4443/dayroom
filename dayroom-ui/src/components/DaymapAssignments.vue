<script>
import axios from 'axios';
export default {
  data() {
    return {
      output: '',
      username: '',
      password: '',
      loading: false
    };
  },
  methods: {
    async fetchData() {
      try {
        this.loading = true
        const response = await axios.post('http://localhost:3000/fetch-daymap', {
          username: this.username,
          password: this.password
        });
        console.log(response.data);
        this.output = response.data;
        this.loading = false
        this.password = ''
      }
      catch (error) {
        this.output = `Error: ${error.message}`;
        this.loading = false
      }
    }
  }
}
</script>

<template>
  <label for="username">Username: </label>
  <input type="text" v-model="username" /> <br>
  <label for="password">Password: </label>
  <input type="password" v-model="password" />
  <button @click="fetchData">Fetch Daymap</button>
  <div v-if="loading">Loading</div>
  <div v-else-if="typeof output === 'string'">{{ output }}</div>
  <div v-else v-for="(item, index) in output" v-bind:key="index">
    <h3>{{ item.subject }}: {{ item.task }}</h3>
    <p>Due: {{ item.due }}</p>
  </div>
</template>

<style scoped></style>