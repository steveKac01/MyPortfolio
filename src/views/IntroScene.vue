<template>
  <div>

<h2>SCENE 3D {{this.isDarkMode?"Theme NUIT":"theme JOUR"}}</h2>

</div> 
</template>

<script>
export default {
  name: 'IntroScene',
  props: {
    isDarkMode: Boolean
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div{
  text-align: center;
}
</style>
