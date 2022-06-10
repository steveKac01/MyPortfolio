<template>
  <div id="app" @mousemove="mouseMove">
    <NavBar @onChangeTheme="handleSwitchTheme"></NavBar>
    <IntroScene :isDarkMode="this.isDarkMode" :mousePosition="this.mousePosition"></IntroScene>

    <div id="section">
      <ExperienceCompo></ExperienceCompo>
      <div id="projects">
    
          <router-view />
      </div>
    </div>
    <FooterPortfolio></FooterPortfolio>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import IntroScene from "./components/IntroScene.vue";
import FooterPortfolio from "./components/FooterPortfolio.vue";
import ExperienceCompo from "./components/ExperienceCompo.vue";
import "animate.css";

export default {
  components: {
    NavBar,
    IntroScene,
    FooterPortfolio,
    ExperienceCompo,
  },
  data: () => ({
    isDarkMode: false,
    mousePosition: undefined,
  }),
  methods: {
     mouseMove() {
            this.mousePosition ={ x:event.clientX, y:event.clientY}
           // console.log(this.mousePosition)  
              },
    handleSwitchTheme(payload) {
      this.isDarkMode = payload.isDarkTheme;
      document.documentElement.classList.toggle("dark-mode"); //Switch css
    },
  },
};
</script>


<style>
html{
  scroll-behavior: smooth;
}
body {
  overflow-x: hidden;
}
#section {
  padding: 0 0 5% 0;
}
h1 {
  background: var(--title-frame);
  padding: 20px;
  color: var(--text-secondary-color) !important;
}
ul {
  list-style: none;
}

li {
  margin-bottom: 15px;
}

:root {
  --background-color: #cccccc;
  --text-color: #2b2929;
  --text-link: rgb(194, 230, 173);

  --background-footer: #2c3e50;
  --text-invert-color: #cccccc;
  --title-frame: #2c3e50;
  --text-color-highlight: #000000;
  --text_link: black;
  --alpha-background: rgba(5, 5, 5, 0.39);
  --error-color: red;
  --text-focus: lightblue;

  /*NEW*/
  --text-secondary-color: white;
  --project-backround: #acabab;
  --skills-color: white;
  /* Validation */
  --background-slide: rgba(100, 100, 100, 0.5);
  --main-link: rgba(25, 98, 129, 0.6);
  --footer-txt: white;
}

:root.dark-mode {
  /*choose switch color*/
  --background-color: #2b2929;
  --text-color: #cccccc;
  --text-invert-color: #000000;
  --text-link: white;
  --text-secondary-color: rgb(175, 172, 172);

  /* NEW */
  --skills-color: #2b2929;
  /* Validation */
  --main-link: lightblue;
  --footer-txt: white;
  --project-backround: #383838;
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--background-color);
  color: var(--text-color);
  transition: background-color 600ms ease-in;
}

/* DYNAMIC CSS */
h1 {
  color: var(--background-footer);
  margin-top: 0;
}

.hide {
  display: none;
}

@media screen and (min-width: 768px) {
  #section {
    padding: 0 5% 8%;
  }
}

@media screen and (min-width: 970px) {
  #section {
    padding: 0 25% 4% 25%;
  
  }
}

@keyframes fadein {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fadeout {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
</style>

