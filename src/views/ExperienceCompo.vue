<template>
  <div id="skills">

    <h1>COMPETENCES</h1>
    <ul>
      <li>2022: Actuellement en recherche de stage.</li>
      <li>2021-2022: Formation développeur web et web mobile à la CCI lyon.</li>
      <div class="formation-caroussel">
                <!-- Front row -->
        <div class="exp-row">
          <div class="skills" style="background-color:red">a</div>
          <div class="skills" style="background-color:blue"></div>
          <div class="skills" style="background-color:black"></div>
          <div class="skills" style="background-color:yellow"></div>
        </div>
        <!-- Back row -->
        <div class="exp-row">
          <div class="skills" style="background-color:gray">c</div>
          <div class="skills" style="background-color:blue"></div>
          <div class="skills" style="background-color:black"></div>
          <div class="skills" style="background-color:yellow"></div>
        </div>

        <div class="back">
          <img :src="require(`../assets/img/js.png`)" alt="js-logo" style='max-width:150px'>
          <img :src="require(`../assets/img/git.png`)" alt="js-logo" style='max-width:150px'>
          <img :src="require(`../assets/img/vue.jpg`)" alt="js-logo" style='max-width:150px'>
          <img :src="require(`../assets/img/symfony.png`)" alt="js-logo" style='max-width:150px'>
          <img :src="require(`../assets/img/php.png`)" alt="js-logo" style='max-width:150px'>
        </div>

      </div>
    </ul>
 
  </div>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
gsap.registerPlugin(ScrollTrigger);

export default {
  name: 'ExperienceCompo',
  props: {
    isDarkMode: Boolean
  },
  methods: {
animationTiles(tile){
      for (let i = 0; i < elem.length; i++) {
        gsap.to(elem[i], {
          scrollTrigger: {
            trigger: elem[i],
            start: "0 90%",
            toggleActions: "play",
          },
          opacity: 1,
          ease: "power1.inOut",
          duration: 0.7,
          y: -200,
        });
      }   
}
  },
  mounted(){
    let skills = document.querySelectorAll(".skills");
    this.animationTiles(skills);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* test skills*/
.exp-row{
  display: flex;
  justify-content: flex-start;
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
  background-color: white;
}

li:nth-child(even) {
  color: white;
  background: var(--background-footer);
}

.formation-caroussel {
  /*  check typo*/
  margin-top: 10px;
  text-align: center;
}

img{
  width: 100%;
}
</style>
