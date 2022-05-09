<template>
    <div id="projects">
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

export default {
    name: 'Project1View',
    methods: {
        goBack() {
            this.$router.push("/");
        }
    }
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
</style>