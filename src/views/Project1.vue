<template>

<div id="projects" class="TEST">
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero tenetur omnis cumque praesentium dolorum
            accusamus cupiditate dolore nam impedit vel? Inventore pariatur asperiores natus itaque vel reprehenderit
            odit ipsum, dolorum ratione numquam, necessitatibus recusandae hic? Amet soluta beatae sed recusandae? Est
            obcaecati quo minus deleniti vero fuga veniam sunt cum unde laboriosam saepe neque, at, nostrum porro
            tempora perferendis ab assumenda vel beatae? Nobis distinctio facilis aspernatur illo natus amet minima
            exercitationem, hic rem eligendi optio cum est quasi assumenda recusandae voluptas tenetur reprehenderit
            temporibus omnis quos animi ea. Unde consequatur sequi omnis, in ab soluta eos officia sint cum.
        </p>
        <div>
            
            <a @click="goBack()"> RETOUR</a>
        </div>
    </div>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
gsap.registerPlugin(ScrollTrigger);

export default {
    name: 'Project1View',
    methods: {
        goBack() {
            this.$router.push("/");
        },
        /* pierreQuiRoule(a) {
      
        gsap.to(a, {
          scrollTrigger: {
            trigger: a,
            start: "0 70%",
            toggleActions: "play",
          },
          opacity: 1,
          ease: "power1.inOut",
          duration: 7, 
        }
       
        );

      
    } */
    }, mounted() {
   // let proj = document.querySelector(".TEST");
   // this.pierreQuiRoule(proj);
  },
  data: () => ({

  })
}

</script>

<style scoped>
p {
    text-align: start;
}

#projects>div {
    padding: 0 3%;
    text-align: right;
}

a {
    background-color: var(--background-footer);
    color: var(--text-focus);
    text-decoration: none;
    padding: 10px 22px;
    font-weight: bolder;
    transition: all 1s;

}

a:hover {
    cursor: pointer;
    background-color: var(--text-focus);
    color: var(--background-footer);
    transition: all 1s;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>