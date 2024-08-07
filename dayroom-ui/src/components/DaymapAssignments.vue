<script>
  import axios from 'axios';
  export default{
    data(){
      return{
        output: ''
      };
    },
    methods: {
      async fetchData(){
        try{
          const response = await axios.get('http://localhost:3000/fetch-daymap');
          console.log(response.data);
          this.output = response.data;
        }
        catch (error){
          this.output = `Error: ${error.message}`;
        }
      }
    }
  }
</script>

<template>
  <h1>test</h1>
  <button @click="fetchData">run Script</button>
  <pre>{{output}}</pre>
</template>

<style scoped>

</style>