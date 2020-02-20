<template>
  <div class="list-component">
    <div class="toolbar mb-3 d-flex">
      <button
        class="btn btn-sm btn-success mr-1"
        data-toggle="modal"
        data-target="#add-new-item-modal"
      >Добавить строку</button>
      <button
        v-if="$store.state.items.length"
        class="btn btn-sm btn-danger mr-auto"
        @click="$store.dispatch('removeLastItem')"
      >Удалить последнюю</button>
      <Sort v-if="$store.state.items.length" />
    </div>
    <table v-if="$store.state.items.length" class="table">
      <thead>
        <tr>
          <th width="50" scope="col">Name</th>
          <th width="50" scope="col">Gender</th>
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
import Sort from "./Sort";

export default {
  name: "List",

  components: { AddNewItemModal, Sort },

  methods: {
    handleCreate(user) {
      this.$store.dispatch("addItem", user);
    }
  }
};
</script>