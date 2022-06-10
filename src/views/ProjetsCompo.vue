<template>
  <div>
    <div class="title">
      <h1>PROJETS</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, a?
      </p>
      <div class="filter">
        <div>
          <input
            type="checkbox"
            id="front-end"
            checked
            @change="filterProject()"
            v-model="frontCheckBox"
          />
          FRONT END
        </div>

        <div>
          <input
            type="checkbox"
            id="back-end"
            checked
            @change="filterProject()"
            v-model="backCheckBox"
          />
          BACK END
        </div>
      </div>
    </div>
    <div class="projects-container">
      <!-- <div
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
    </div> -->

      <div :class="getClass(idx)" v-for="(project, idx) in projects[0]" :key="idx">
        <div class="img" style="width: auto">
          <div class="img-container">
            <img :src="getImg('idx')" :alt="project[0].title" width="100%" />
          </div>
          <p>{{ project.description }}</p>
        </div>
        <!--enlever les '' de idx pour les images xO-->

        <!--    <H4>{{ project.title }}</H4>-->

        <!--    <p>{{ project.description }}</p>-->

        <button-project
          :github="project.github"
          label="GITHUB"
        ></button-project>
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
    //let project = document.querySelectorAll(".project");
    //this.animationProject(project);
    console.log(projects.front)
  },
  data: () => ({
    projects: projects,
    projectsBackup: projects,
    frontCheckBox: true,
    backCheckBox: true,
  }),
  methods: {
    /**
     * Filtre les projets
     */
    filterProject() {
    /*
    this.projects = null;

      if (this.frontCheckBox) {
        this.projects = this.projectsBackup.filter((project) => {
          
          if(this.frontCheckBox ){
            
          }
          if (
            project.front == this.frontCheckBox ||
            project.back == this.backCheckBox
          )
            return true;
        });
      }
*/
      // this.projects=""
      //Front
      /*
      if (this.frontCheckBox) {
        this.projects = this.projectsBackup.filter((project) => {
          return project.front == true
        })
      }  

      //Back
       if (this.backCheckBox) {
        this.projects = this.projectsBackup.filter((project) => {
          return project.back == true
        })
      }  */
      /*
        this.projects = this.projectsBackup.filter((project) => {
          return  project.back == true && project.front== true
        })*/
    },

    /**
     * Obtenir la classe du projet.
     */
    getClass(idx) {
      return "project project-" + (idx + 1);
    },
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
          delay: 0.2 * i,
        });
      }
    },
  },
};
</script>

<style scoped>
/*@import "@/assets/style/projects.css";*/
@import "@/assets/style/projects-copy.css";
</style>
