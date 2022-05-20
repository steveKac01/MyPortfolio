<template>
        <button :style="border===true?'button_border':''"><font-awesome-icon v-if="github===true" icon="fab fa-github " alt="github-icon" style="margin-right:5px" />  {{label}}</button>
</template>


<script>
export default{
name:"ButtonProject",
props:{
     github:{
        type:Boolean,
        default:false
    },
    label:{
        type:String,
        required:true
    },
    border:{
        type:Boolean,
        default:false
    }
}
}
</script>

<style scoped>
 button {
    background-color: var(--background-footer);
    color: var(--text-focus);
    text-decoration: none;
    padding: 10px 22px;
    font-weight: bolder;
    transition:all 1s;
}

 button:hover {
    background-color: var(--text-focus) ;
    color: var(--background-footer);
    transition:all 1s;
}

.button_border{
    padding: 10px 20px 9px;
    border:  var(--text-focus) 1px solid ;
}
</style>