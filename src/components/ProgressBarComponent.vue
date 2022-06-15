<template>
<div>
    <h3>{{title}}</h3>
      <div class="bar-value">
      <div   class="value" :style="'width:'+val+'%'">{{val}}%</div>
      </div>
</div>
</template>


<script>
export default{
name:"ProgressBar",
props:{    
    title:{
        type:String,
        required:true
    },
    val:{
        type:Number,
        default:100
    }
}
}
</script>

<style scoped>
h3{  color:  var(--title-frame)}
  .bar-value{
      position: relative;
      background-color: gray;    
      height: 40px;
      text-align: center;
    color: white;
      font-weight: bolder;
  }
  .value{
      background-color: var(--main-link);
        transition: all 2s linear; 
      height:100%;
      justify-content: center;
      display: flex;
      align-items:  center;
  }
 
 
</style>