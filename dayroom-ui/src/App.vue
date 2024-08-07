<template>
  <h1>Dayroom</h1>
  <div class="grid-container">
    <h2 class="item1">Daymap Assignments</h2>
    <h2 class="item2">Classroom Assignments</h2>
    <DaymapAssignments class="item3" />
    <p class="item4">Placeholder</p>
  </div>

</template>

<script setup>
import DaymapAssignments from "@/components/DaymapAssignments.vue";
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.grid-container {
  display: grid;
}
.item1 {
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 1;
  grid-row-end: 1;
}
.item2 {
  grid-column-start: 2;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 1;
}
.item3 {
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 2;
  grid-row-end: 2;
}
.item4 {
  grid-column-start: 2;
  grid-column-end: 2;
  grid-row-start: 2;
  grid-row-end: 2;
}
</style>
