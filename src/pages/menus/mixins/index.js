export default {
  mounted() {
    document.title = this.$route.name.split('-')[0]
  },
}
