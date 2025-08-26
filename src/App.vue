  <template>
    <div>
      <Navbar @search="onSearch" />
      <router-view :search="search" />
    </div>
    <!-- <router-view/> -->
  </template>



<script setup lang="ts">
import Navbar from './components/NavBar.vue';
import { ref } from 'vue';

const search = ref('')

function onSearch(value: string) {
  search.value = value
}
</script>
<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>