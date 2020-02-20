<template>
  <div id="app">
    <div class="container py-5">
      <List />
    </div>
  </div>
</template>

<script>
import List from "./components/List";

export default {
  name: "App",
  
  components: { List }
};
</script>
