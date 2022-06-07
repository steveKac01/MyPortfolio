<template>
  <div id="skills">
    <h1>COMPETENCES</h1>
    <ul>
      <!--   <li>2022: Actuellement en recherche de stage.</li> -->
      <li>2021-2022: Formation développeur web et web mobile à la CCI lyon.</li>
      <div class="formation">
        <!-- Front row -->
        <div class="exp-row">
          <div class="skills">
            <img :src="require(`../assets/img/html-logo.png`)" alt="git-logo" />
          </div>
          <div class="skills">
            <img :src="require(`../assets/img/git-logo.png`)" alt="git-logo" />
          </div>
          <div class="skills">
            <img
              :src="require(`../assets/img/javascript-logo.png`)"
              alt="javascript-logo"
            />
          </div>
          <div class="skills">
            <img
              :src="require(`../assets/img/wordpress-logo.png`)"
              alt="wordpress-logo"
            />
          </div>
          <div class="skills">
            <img :src="require(`../assets/img/vue-logo.png`)" alt="vue-logo" />
          </div>
        </div>
        <!-- Back row -->
        <div class="exp-row">
          <div class="skills-back">
            <img :src="require(`../assets/img/css-logo.png`)" alt="git-logo" />
          </div>

          <div class="skills-back">
            <img :src="require(`../assets/img/php-logo.png`)" alt="php-logo" />
          </div>
          <div class="skills-back">
            <img
              :src="require(`../assets/img/mysql-logo.png`)"
              alt="mysql-logo"
            />
          </div>
          <div class="skills-back">
            <img
              :src="require(`../assets/img/symfony-logo.png`)"
              alt="symfony-logo"
            />
          </div>
          <div class="skills-back">
            <img
              :src="require(`../assets/img/docker-logo.png`)"
              alt="docker-logo"
            />
          </div>
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
  name: "ExperienceCompo",
  methods: {
    /**
     * Tiles's animation.
     */
    animationTiles(tiles) {
      for (let i = 0; i < tiles.length; i++) {
        gsap.to(tiles[i], {
          scrollTrigger: {
            trigger: tiles[i],
            start: "0 90%",
            toggleActions: "play",
          },
          opacity: 1,
          ease: "power1.inOut",
          duration: 0.7,
          delay: 0.2 * i,
        });
      }
    },
    /**
     * Tiles's Back animation.
     */
    animationTilesBack(tilesBack) {
      for (let i = tilesBack.length-1; i >= 0; i--) {
        gsap.to(tilesBack[i], {
          scrollTrigger: {
            trigger: tilesBack[i],
            start: "0 95%",
            toggleActions: "play",
          },
          opacity: 1,
          ease: "power1.inOut",
          duration: 0.7,
          delay: 1 - 0.2 * i,
        });
      }
    },
  },
  mounted() {
    let skills = document.querySelectorAll(".skills");
    this.animationTiles(skills);

    let skillsBack = document.querySelectorAll(".skills-back");
    this.animationTilesBack(skillsBack);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.exp-row {
  display: flex;
  justify-content: flex-start;
}
.skills,
.skills-back {
  width: 25%;
  padding: 0px;
  margin: 0px;
  overflow: hidden;
  opacity: 0;
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

.formation {
  text-align: center;
  background-color: var(--skills-color);
}

img {
  width: 100%;
  height: 100%;
}

img:hover {
  transform: scale(1.12);
}
</style>
