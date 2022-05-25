<template>
  <div id="app">
    <NavBar @onChangeTheme="handleSwitchTheme"></NavBar>
    <IntroScene :isDarkMode="this.isDarkMode"></IntroScene>

    <div id="section">
      <ExperienceCompo></ExperienceCompo>
      <div id="projects">
        <h1>PROJETS</h1>
    <!-- <transition name="router-anim" enter-active-class="animate__animated animate__fadeInRight" >--> 
       <router-view />
    <!-- </transition> -->
      </div>
    </div>
    <FooterPortfolio></FooterPortfolio>

  </div>
</template>

<script>

import NavBar from "./components/NavBar.vue"
import IntroScene from "./components/IntroScene.vue"
import FooterPortfolio from "./components/FooterPortfolio.vue"
import ExperienceCompo from "./components/ExperienceCompo.vue"
import 'animate.css'

export default {
  components: {
    NavBar,
    IntroScene,
    FooterPortfolio,
    ExperienceCompo,
  },
  data: () => ({
    isDarkMode: false,

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
body{
      overflow-x: hidden;
}
#section {
  padding: 2% 0 5% 0;
}
h1 {
  background: var(--title-frame);
  padding: 20px;
  color: var( --text-secondary-color) !important;
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
  --text-link: lightblue;

  --background-footer: #2c3e50;
  --text-invert-color: #cccccc;
  --title-frame: #2c3e507b;
  --text-color-highlight: #000000;
  --text_link: black;
  --alpha-background: rgba(5, 5, 5, 0.39);
  --error-color: red;
  --text-focus: lightblue;

  /*NEW*/ 
  --text-secondary-color:white;

  /* Validation */
  --background-slide: rgba(100, 100, 100, 0.5);
  --main-link:rgba(25, 98, 129, 0.6);



}

:root.dark-mode {
  /*choose switch color*/
  --background-color: #2b2929;
  --text-color: #cccccc;
  --text-invert-color: #000000;
  --text-link: white;

  
  
/*NEW*/
  
   --text-secondary-color:rgb(175, 172, 172);

  /* Validation */

  --main-link:lightblue;

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
}

.hide {
  display: none;
}

@media screen and (min-width: 768px) {
  #section {
    padding: 2% 5% 8% ;
  }
}

@media screen and (min-width: 970px) {
  #section {
    padding: 2% 22% 4% 22%;
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

