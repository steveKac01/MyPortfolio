<template>
  
        <div class="project-container">
            <div class="project" v-for="(project, idx) in projects" :key="idx">
                <div class="project-img"><img :src="getImg(idx)" :alt="project.title">
                </div>
                <div class="desc-project">
                    <H4>{{ project.title }}</H4>
                    <p>{{ project.description }}</p>
                    <a v-if="project.githublink != ''" :href="project.githublink" target="_blank">
                        <font-awesome-icon icon="fab fa-github " alt="github-icon" style="margin-right:5px" /> GITHUB
                    </a>
                    <a v-if="project.link != ''" @click="goToProject(project.link)"> DETAILS</a>
                </div>
            </div>
        </div>
</template>

<script>
import { projects } from "../assets/datas/projects"

export default {
    name: 'ProjetsCompo',
    props: {
        isDarkMode: Boolean
    },
    data: () => ({
        projects: projects
    }),
    methods: {
        getImg(idx) {

            try {
                return require(`../assets/img/project${idx + 1}.png`)
            } catch {
                return "http://triathlondegerardmer.com/wp-content/uploads/2019/02/no-image.jpg"
            }

        },
        goToProject(url) {
            this.$router.push({ name: url })
        }
    }
}
</script>

<style scoped>
@import "@/assets/style/projects.css";
</style>
