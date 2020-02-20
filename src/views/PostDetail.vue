<template>
  <div>文章详情</div>
</template>

<script>
export default {
  mounted() {
    this.loadPage();
  },
  methods: {
    loadPage() {
      this.$axios({
        url: "/post/" + this.$route.query.id,
        method: "get"
      }).then(res => {
        console.log(res.data);
      });
    }
  }
};
</script>

<style>
</style>