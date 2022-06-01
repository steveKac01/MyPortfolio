<template>
  <div class="project-container">
    <div
      class="project-background"
      v-for="(project, idx) in projects"
      :key="idx"
    >
      <div class="project">
        <div class="project-img">
          <img :src="getImg(idx)" :alt="project.title" />
        </div>
        <div class="desc-project">
          <H4>{{ project.title }}</H4>
          <p>{{ project.description }}</p>
          <div class="buttons">
            <a
              v-if="project.github === true"
              :href="project.link"
              target="_blank"
            >
              <button-project
                :github="project.github"
                label="GITHUB"
              ></button-project
            ></a>

            <a @click="goToProject(project.link)" v-else>
              <button-project
                :github="project.github"
                label="DETAILS"
              ></button-project
            ></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { projects } from "../assets/datas/projects";
import ButtonProject from "../components/ButtonComponent.vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
gsap.registerPlugin(ScrollTrigger);

export default {
  name: "ProjetsCompo",
  components: {
    ButtonProject,
  },
  props: {
    isDarkMode: Boolean,
  },
  mounted() {
    let project = document.querySelectorAll(".project-background");
    this.animationProject(project);
  },
  data: () => ({
    projects: projects,
  }),
  methods: {
    
    /**
     * Get image with webpack.
     */
    getImg(idx) {
      try {
        return require(`../assets/img/project${idx + 1}.png`);
      } catch {
        return "http://triathlondegerardmer.com/wp-content/uploads/2019/02/no-image.jpg";
      }
    },

    /**
     * Link to get the project.
     * url of the project, can be internal or external.
     */
    goToProject(url) {
      this.$router.push({ name: url });
    },

    /**
     * Animation for each project.
     * elem the .project-background grabbed.
     */
    animationProject(elem) {
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
    },
  },
};
</script>

<style scoped>
@import "@/assets/style/projects.css";
</style>
