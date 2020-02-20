<template>
  <div class="sort-component d-inline-block position-relative">
    <div class="btn btn-sm btn-primary" @click="toggleDropdown">Фильтр</div>
    <div class="dropdown-menu" :class="{'show': isOpened}">
      <button
        class="dropdown-item"
        :class="{'active': $store.state.sortDir === 'asc'}"
        @click="setSortDir('asc')"
      >По возрастанию</button>
      <button
        class="dropdown-item"
        :class="{'active': $store.state.sortDir === 'desc'}"
        @click="setSortDir('desc')"
      >По убыванию</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Sort",

  data: () => ({
    isOpened: false
  }),

  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },

  destroyed() {
    document.removeEventListener("click", this.handleClickOutside);
  },

  methods: {
    handleClickOutside(event) {
      if (this.isOpened) {
        if (!this.$el.contains(event.target)) {
          this.isOpened = false;
        }
      }
    },

    toggleDropdown() {
      this.isOpened = !this.isOpened;
    },

    setSortDir(dir) {
      this.isOpened = false;
      this.$store.commit("setSortDir", dir);
    }
  }
};
</script>