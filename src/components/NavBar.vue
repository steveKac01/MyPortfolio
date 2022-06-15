<template>
  <header>
    <div class="top-bar">
      <div class="left-items" @click="showSlideMenu = !showSlideMenu">
        <div>
          <div id="burger">
            <font-awesome-icon icon="fas fa-bars " size="2x" />
          </div>
        </div>
      </div>
      <div class="right-items btn-theme" @click="switchTheme()">
        <div
          :style="
            this.isDarkMode
              ? 'animation: fadeout 1s ease-out forwards'
              : 'animation: fadein 1s ease-out forwards'
          "
        >
          <font-awesome-icon icon="fas fa-moon" size="2x" />
        </div>
        <div
          :style="
            this.isDarkMode
              ? 'animation: fadein 1s ease-out forwards'
              : 'animation: fadeout 1s ease-out forwards'
          "
        >
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
            <li @click="goAnchor('#skills')">COMPETENCES</li>
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
      <Transition>
        <div id="slide" v-if="showSlideMenu">
          <div class="slide-cat">
            <ul>
              <li @click="goAnchor('#about')">
                <font-awesome-icon icon="fas fa-user-tie" />
                | A PROPOS DE MOI
              </li>
              <hr />
              <li @click="goAnchor('#skills')">
                <font-awesome-icon icon="fas fa-cog" />
                | COMPETENCES
              </li>
              <hr />
              <li @click="goAnchor('#projects')">
                <font-awesome-icon icon="fas fa-folder " />
                | PROJETS
              </li>
              <hr />
              <li @click="goAnchor('#contact')">
                <font-awesome-icon icon="fas fa-address-book" />
                | CONTACT
              </li>
            </ul>
          </div>
        </div></Transition
      >
    </div>
  </header>
</template>


<script>
export default {
  name: "NavBar",
  data: () => ({
    isDarkMode: false,
    showSlideMenu: false,
  }),

  methods: {
    /**
     * Scroll to the selector page & close the menu slide min.
     *
     * @param {
     * } selector  selector to scroll. debug this !!
     */
    goAnchor(selector) {
      var anchor = document.querySelector(selector);
      this.showSlideMenu = this.showSlideMenu ? false : false;
      window.scrollTo(0, anchor.offsetTop);
    },
    switchTheme() {
      if (this.isDarkMode) {
        this.isDarkMode = false;
      } else {
        this.isDarkMode = true;
      }
      this.$emit("onChangeTheme", { isDarkTheme: this.isDarkMode });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@800&family=VT323&display=swap");

header {
  font-family: "Raleway", sans-serif;
  caret-color: transparent;
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

.slide-container > div {
  position: absolute;
  bottom: -80;
  left: 2%;
  z-index: 2;
}

.slide-cat {
  animation: fadein 1s;
  padding: 10px 30px;
  background-color: var(--background-slide);
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
.slide-cat li:last-child {
  margin: unset;
}

.slide-cat a {
  color: var(--text-invert-color) !important;
  text-decoration: none;
}

.slide-cat li:hover {
  color: var(--text-focus) !important;
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

.left-items > div,
.right-items > div {
  border: dotted 1px;
  padding: 3px;
  border-radius: 20%;
}

.right-items {
  display: flex;
  align-items: center;
}

.btn-theme {
  border-color: var(--main-link);
  color: var(--main-link);
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
  #slide {
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

  .big-nav > ul {
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
    position: relative;
    transition: color 1s;
  }

  .big-nav li:after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleY(0);
    height: 4px;
    bottom: 3px;
    left: 0;
    background-color: var(--main-link);
    transform-origin: bottom right;
    transition: transform 0.50s ease-out;
  }

  .big-nav li:hover:after {
    transform: scaleY(1);
    transform-origin: bottom left;
  }

  .big-nav li:hover {
    color: var(--main-link);
  }
}

/*icons*/
.right-items {
  position: relative;
  width: 45px;
}

.right-items > div {
  left: 0;
  position: absolute;
}

/* Transitions menu slide */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
