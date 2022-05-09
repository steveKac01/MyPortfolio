<template>
  <div id="app">
    <NavBar @onChangeTheme="handleSwitchTheme"></NavBar>
    <IntroScene :isDarkMode="this.isDarkMode"></IntroScene>

    <div id="section">
      <ExperienceCompo :isDarkMode="this.isDarkMode"></ExperienceCompo>
      <!--  <ProjetsCompo :isDarkMode="this.isDarkMode"></ProjetsCompo>-->
      <div id="projects">
        <h1>PROJETS {{ this.isDarkMode ? "Theme NUIT" : "theme JOUR" }}</h1>
        <router-view />
      </div>
    </div>
    <FooterPortfolio :isDarkMode="this.isDarkMode"></FooterPortfolio>

  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue"
import IntroScene from "./components/IntroScene.vue"
import FooterPortfolio from "./components/FooterPortfolio.vue"
import ExperienceCompo from "./components/ExperienceCompo.vue"
//import ProjetsCompo from "./components/ProjetsCompo.vue"

export default {
  components: {
    NavBar,
    IntroScene,
    FooterPortfolio,
    ExperienceCompo
    // ProjetsCompo
  },
  data: () => ({
    isDarkMode: false
  }),
  methods: {
    handleSwitchTheme(payload) {
      this.isDarkMode = payload.isDarkTheme
      document.documentElement.classList.toggle("dark-mode") //Switch css
    }
  }
}



</script>


<style>
#section {
  padding: 20% 0 5% 0;
}

h1 {
  background: var(--title-frame);

  padding: 20px;
  color: var(--text-invert-color);
}

ul {
  list-style: none;
}

li {
  margin-bottom: 15px;
}

/*
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
}

nav a.router-link-exact-active {
  color: #42b983;
}
*/
:root {
  --background-color: #cccccc;
  --text-color: #2b2929;
  --text-link: black;
  --background-slide: rgba(58, 137, 193, 0.6);
  --background-footer: #2c3e50;
  --text-invert-color: #cccccc;
  --title-frame: #2c3e507b;
  --text-color-highlight: #000000;
  --text_link: black;
  --alpha-background: rgba(5, 5, 5, 0.39);
  --error-color: red;
  --text-focus: lightblue;
}

:root.dark-mode {
  /*choose switch color*/
  --background-color: #2b2929;
  --text-color: #cccccc;
  --text-invert-color: #000000;
  --text-link: white;
  --background-slide: rgba(25, 110, 170, 0.5);
  --background-footer: rgb(25, 110, 170);

  /*
  --text-invert-color: #000000;
  --alpha-background: rgba(212, 212, 212, 0.2);
  --title-frame: rgba(224, 216, 216, 0.678);
  --text_link: white;
  --text-color-highlight: #FFFFFF;
  --background-slide: rgba(212, 212, 212, 0.5);
*/
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--background-color);
  color: var(--text-color);
  transition: background-color 600ms ease-in;
  /* easings.net/fr */
}

/* DYNAMIC CSS */
h1 {
  color: var(--background-footer);
}

.hide {
  display: none;
}

@media screen and (min-width: 768px) {
  #section {
    padding: 20% 5% 5% 5%;
  }
}

@media screen and (min-width: 970px) {
  #section {
    padding: 20% 15% 5% 17%;
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

