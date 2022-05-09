<template>

  <header>
    <div class="top-bar">
      <!--*todo* try to catch it without class-->
      <div class="left-items" @click="showHideSlideMenu()">
        <div>
          <div id="burger">
            <font-awesome-icon icon="fas fa-bars " size="2x" />
          </div>
        </div>
      </div>
      <div class="right-items btn-theme" @click="switchTheme()">
        <!-- Double icone theme-->
        <div
          :style="this.isDarkMode ? 'animation: fadeout 1s ease-out forwards' : 'animation: fadein 1s ease-out forwards'">
          <font-awesome-icon icon="fas fa-moon" size="2x" />
        </div>
        <div
          :style="this.isDarkMode ? 'animation: fadein 1s ease-out forwards' : 'animation: fadeout 1s ease-out forwards'">
          <font-awesome-icon icon="fas fa-sun " size="2x" />
        </div>
      </div>

      <!--BIG NAV-->
      <div class="big-nav">
        <ul>
          <div>
            <li @click="goAnchor('#about')">A PROPOS DE MOI</li>
          </div>
          <div>
            <li @click="goAnchor('#skills')">EXPERIENCES</li>
          </div>

          <div>
            <li @click="goAnchor('#projects')">PROJETS</li>
          </div>

          <div>
            <li @click="goAnchor('#contact')">CONTACT</li>
          </div>

        </ul>
      </div>
    </div>
    <div class="slide-container">
      <div id="test" class="hide">
        <div class="slide-cat">
          <ul>
            <li @click="goAnchor('#about')">

              <font-awesome-icon icon="fas fa-user-tie" />
              | A PROPOS DE MOI
            </li>
            <hr>
            <li @click="goAnchor('#skills')">
              <font-awesome-icon icon="fas fa-cog" />
              | COMPETENCES
            </li>
            <hr>
            <li @click="goAnchor('#projects')">
              <font-awesome-icon icon="fas fa-folder " />
              | PROJETS
            </li>
            <hr>
            <li @click="goAnchor('#contact')">
              <font-awesome-icon icon="fas fa-address-book" />
              | CONTACT
            </li>
          </ul>
        </div>
      </div>
    </div>

  </header>
</template>


<script>
export default {
  name: 'NavBar',
  data: () => ({
    isDarkMode: false,
    showSlideMenu: false
  }),

  methods: {
    goAnchor(selector) {
      console.log(selector)
      var anchor = document.querySelector(selector)
       document.querySelector("#test").classList.toggle("hide")

      window.scrollTo(0, anchor.offsetTop);
    },
    showHideSlideMenu() {
      console.log("shut")
      let slideMini = document.querySelector("#test")

      slideMini.classList.toggle("hide")

    },
    switchTheme() {
      if (this.isDarkMode) {
        this.isDarkMode = false;
      } else {
        this.isDarkMode = true
      }
      this.$emit("onChangeTheme", { isDarkTheme: this.isDarkMode })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@800&family=VT323&display=swap');

header {
  font-family: 'Raleway', sans-serif;
}

li:hover {
  color: var(--linkColor);
}

/*** SMALL NAV ***/
.icone {
  display: inline;
  min-width: 30px;
}

.big-nav {
  display: none;
}

.top-bar {
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  text-transform: uppercase;
  color: var(--textColor);
}

#burger:hover,
.right-items {
  cursor: pointer;
}

.right-items {
  height: 70px;
}

.right-items img {
  height: 100%;
}

.slide-container {
  position: relative;
}

.slide-container>div {
  position: absolute;
  bottom: -80;
  left: 2%;
  z-index: 2;

}

.slide-cat {
  animation: fadein 1s;
  padding: 10px 30px;
  background-color: var(--background-footer);
  font-weight: bolder;
  text-transform: uppercase;
  border-radius: 5%;
  width: 200px;
}

.slide-cat li {
  padding: 10px 0;
  color: white;
  text-align: left;
  cursor: pointer;
}

.slide-cat a {
  color: var(--text-invert-color) !important;
  text-decoration: none;
}

.slide-cat a:hover {
  color: var(--text-link) !important;
}

.slide-cat ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.left-items {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.left-items>div,
.right-items>div {
  border: dotted 1px;
  border-color: var(--background-footer);
  padding: 3px;
  border-radius: 20%;
  color: var(--background-footer);
}

.right-items {
  display: flex;
  align-items: center;
}

@keyframes fadein {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

/************************** DESKTOP ********************************/
@media screen and (min-width: 768px) {
  #test {
    display: none;
  }

  .top-bar {
    padding: 10px 20px;
    display: flex;
    justify-content: center;
    flex-direction: row;
    text-transform: uppercase;
    background-color: var(--primaryColor);
    color: var(--textColor);
  }

  .left-items {
    display: none;
  }

  .right-items {
    height: unset;
  }

  .big-nav {
    display: flex;
    justify-content: center;
    flex-direction: row;
    text-transform: uppercase;
    color: var(--textColor);
    font-weight: bolder;
  }

  .right-items {
    margin-right: 15px;
  }

  .big-nav>ul {
    list-style: none;
    display: inline;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
  }

  .big-nav li {
    display: inline;
    padding: 15px;
    cursor: pointer;
  }

  .big-nav a {
    color: var(--textColor);
    text-decoration: none;
  }

  .big-nav a:hover {
    color: var(--text-link);
    text-decoration: none;
  }
}

/*icon test*/
.right-items {
  position: relative;
  width: 45px;
}

.right-items>div {
  left: 0;
  position: absolute;
}
</style>
