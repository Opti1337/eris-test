<template>
  <div class="sort-component d-inline-block position-relative">
    <slot v-bind:toggle="toggle">
      <button class="btn btn-sm btn-primary" @click="toggle">Фильтр</button>
    </slot>
    <div class="dropdown-menu dropdown-menu-right" :class="{'show': isOpened}">
      <form class="px-3 py-2">
        <div v-for="option in options" :key="option.key" class="custom-control custom-checkbox">
          <input
            type="checkbox"
            class="custom-control-input"
            :id="'filter-checkbox' + option.key"
            :value="option.key"
            v-model="selectedFilters"
          />
          <label
            class="custom-control-label"
            :for="'filter-checkbox' + option.key"
          >{{option.title || option.key}}</label>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilterComponent",

  props: {
    value: Array,
    options: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    isOpened: false,
    selectedFilters: []
  }),

  watch: {
    selectedFilters: function(val) {
      this.$emit("onChange", val);
    }
  },

  mounted() {
    this.selectedFilters = this.value || []

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

    toggle() {
      this.isOpened = !this.isOpened;
    }
  }
};
</script>