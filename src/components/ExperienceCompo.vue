<template>
  <div id="skills">

    <h1>EXPERIENCE {{ this.isDarkMode ? "Theme NUIT" : "theme JOUR" }}</h1>
    <ul>
      <!--   <li>2022: Actuellement en recherche de stage.</li> -->
      <li>2021-2022: Formation développeur web et web mobile à la CCI lyon.</li>
      <div class="formation-caroussel">
        <!-- Front row -->
        <div class="exp-row">
          <div class="skills">
            <img :src="require(`../assets/img/git-logo.png`)" alt="git-logo">
          </div>
          <div class="skills">

            <img :src="require(`../assets/img/javascript-logo.png`)" alt="javascript-logo">
          </div>
          <div class="skills">
            <img :src="require(`../assets/img/wordpress-logo.png`)" alt="wordpress-logo">

          </div>
          <div class="skills">
            <img :src="require(`../assets/img/vue-logo.png`)" alt="vue-logo">
          </div>
        </div>
        <!-- Back row -->
        <div class="exp-row">
          <div class="skills">
            <img :src="require(`../assets/img/php-logo.png`)" alt="php-logo">

          </div>
          <div class="skills">
            <img :src="require(`../assets/img/mysql-logo.png`)" alt="mysql-logo">

          </div>
          <div class="skills">

            <img :src="require(`../assets/img/symfony-logo.png`)" alt="symfony-logo">

          </div>
          <div class="skills">

            <img :src="require(`../assets/img/docker-logo.png`)" alt="docker-logo">

          </div>
        </div>

      </div>

    </ul>

  </div>
</template>

<script>
export default {
  name: 'ExperienceCompo',
  props: {
    isDarkMode: Boolean
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* test skills*/
.exp-row {
  display: flex;
  justify-content: start;
}

.skills {
  width: 25%;
  padding: 0px;
  margin: 0px;
}

ul {
  padding: 0;
}

li {
  margin: 0;
  padding: 10px;
  background: var(--background-footer);
  color: white;
}

li:nth-child(even) {
  color: white;
  background-color: white;

}

.formation-caroussel {
  /*  check typo*/

  text-align: center;
}

img {
  width: 100%;
  height: 100%;
  border: BLACK 1px solid;
}
</style>
