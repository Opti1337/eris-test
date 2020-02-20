<template>
  <div :id="id" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Добавить пользователя</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label :for="id + '-name'">Имя</label>
              <input type="text" class="form-control" :id="id + '-name'" v-model="name" />
            </div>
            <div class="form-group">
              <label :for="id + '-gender'">Пол</label>
              <select :id="id + '-gender'" class="custom-select" v-model="gender">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
          <button
            type="button"
            class="btn btn-primary"
            data-dismiss="modal"
            @click="createUser()"
          >Создать</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: String
  },

  data: () => ({
    name: "",
    gender: "Male"
  }),

  methods: {
    resetForm() {
      this.name = "";
      this.gender = "Male";
    },
    
    createUser() {
      this.$emit("onCreate", {
        name: this.name,
        gender: this.gender
      });

      this.resetForm();
    }
  }
};
</script>