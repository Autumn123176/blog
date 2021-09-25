<template>
  <component :is="headType"></component>
</template>

<script>
import MSearch from '@/components/m/MSearch'
import MNavBar from '@/components/m/MNavBar'
export default {
  name: "MHeader",
  data() {
    return {
      
    };
  },
  components:{
    MNavBar,MSearch
  },
  computed: {
    headType(){
      return this.$route.meta.title.trim() === '文章' ? 'MNavBar' : 'MSearch'
    }
  },
};
</script>

<style>
</style>