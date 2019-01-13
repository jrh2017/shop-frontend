<template>
  <div>
      <Homeheader class='header'></Homeheader>
  </div>
</template>

<script>
import Homeheader from './components/header'
export default {
    name: 'Home',
    components: {
        Homeheader
    }
}
</script>

<style>
    .header{
        height: 50px;
        width: 100%;
    }
</style>