<template>
  <div class="sort-component d-inline-block position-relative">
    <slot v-bind:toggle="toggle">
      <button class="btn btn-sm btn-primary" @click="toggle">Фильтр</button>
    </slot>
    <div class="dropdown-menu dropdown-menu-right" :class="{'show': isOpened}">
      <form class="px-3 py-2">
        <template v-for="option in options">
          <h6
            class="dropdown-header"
            :key="option.groupKey"
          >{{option.groupTitle || option.groupKey}}</h6>
          <div
            v-for="filter in option.filters"
            :key="option.groupKey + '-' + filter.key"
            class="custom-control custom-checkbox"
          >
            <input
              type="checkbox"
              class="custom-control-input"
              :id="'filter-checkbox-' + option.groupKey + '-' + filter.key"
              :value="filter.key"
              :checked="isChecked(option.groupKey, filter.key)"
              @click="handleFilterClick(option.groupKey, filter.key)"
            />
            <label
              class="custom-control-label"
              :for="'filter-checkbox-' + option.groupKey + '-' + filter.key"
            >{{filter.title || filter.key}}</label>
          </div>
        </template>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilterComponent",

  props: {
    value: Object,
    options: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    isOpened: false,
    selectedFilters: {}
  }),

  mounted() {
    this.selectedFilters = this.value || {};

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
    },

    handleFilterClick(group, value) {
      if (this.selectedFilters[group]) {
        if (this.isChecked(group, value)) {
          this.selectedFilters[group] = [...this.selectedFilters[group]].filter(item => {
            return item !== value;
          });

          if (!this.selectedFilters[group].length) {
            this.$delete(this.selectedFilters, group);
          }
        } else {
          this.selectedFilters[group].push(value);
        }
      } else {
        this.$set(this.selectedFilters, group, [value]);
      }

      this.$emit("onChange", this.selectedFilters);
    },

    isChecked(group, value) {
      return (
        this.selectedFilters[group] &&
        this.selectedFilters[group].includes(value)
      );
    }
  }
};
</script>