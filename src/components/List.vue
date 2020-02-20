<template>
  <div class="list-component">
    <div class="toolbar mb-3 d-flex">
      <button
        class="btn btn-sm btn-success mr-1"
        data-toggle="modal"
        data-target="#add-new-item-modal"
      >Добавить строку</button>
      <button
        v-if="$store.getters.filteredItems.length"
        class="btn btn-sm btn-danger"
        @click="$store.dispatch('removeLastItem')"
      >Удалить последнюю</button>
      <FilterComponent
        class="ml-auto"
        v-if="$store.state.items.length"
        :value="$store.state.filter"
        :options="filterOptions"
        @onChange="handleFilterChanged"
      >
        <template v-slot:default="slotProps">
          <button class="btn btn-sm btn-secondary" @click="slotProps.toggle">Фильтр</button>
        </template>
      </FilterComponent>
    </div>
    <table v-if="$store.getters.filteredItems.length" class="table">
      <thead>
        <tr>
          <th width="50" scope="col">Имя</th>
          <th width="50" scope="col">Пол</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in $store.getters.filteredItems" :key="item.name">
          <td>{{item.name}}</td>
          <td>{{item.gender}}</td>
        </tr>
      </tbody>
    </table>
    <div v-else class="alert alert-secondary" role="alert">Записей нет!</div>
    <AddNewItemModal id="add-new-item-modal" @onCreate="handleCreate" />
  </div>
</template>

<script>
import AddNewItemModal from "./AddNewItemModal";
import FilterComponent from "./FilterComponent";

export default {
  name: "List",

  data: () => ({
    filterOptions: [
      { key: "Male", title: "Male" },
      { key: "Female", title: "Female" }
    ]
  }),

  components: { AddNewItemModal, FilterComponent },

  methods: {
    handleCreate(user) {
      this.$store.dispatch("addItem", user);
    },

    handleFilterChanged(filter) {
      this.$store.commit("setFilter", filter);
    }
  }
};
</script>