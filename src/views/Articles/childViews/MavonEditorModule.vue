<template>
  <div class='markdowns'>
    <mavon-editor :codeStyle="codeStyle" :ishljs='true' :toolbarsFlag='false' :subfield="false" defaultOpen="preview"  :value='content'></mavon-editor>
  </div>
</template>

<script>
export default {
  props:{   
    content:{
      default(){
        return ""
      }
    },
  },
  data(){
    return {
      codeStyle:'monokai-sublime',
    }
  },
  components:{

  }
}
</script>

<style>
  .markdowns{
    padding: 0rem 0rem;
    overflow-x: auto;
    line-height: 0.4rem;
    font-size: 0.32rem;
  }
</style>