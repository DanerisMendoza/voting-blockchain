<template>
  <div>
    <ion-header>
      <ion-toolbar>
        <ion-title>Note Modal</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <ion-item>
        <ion-label color="primary" position="floating">Title</ion-label>
        <ion-input-vue
          type="text"
          name="title"
          placeholder="Title for note..."
          v-model="noteInfo.title"
        ></ion-input-vue>
      </ion-item>

      <ion-item>
        <ion-label color="primary" position="floating">Description</ion-label>
        <ion-textarea-vue rows="5" placeholder="Note description" v-model="noteInfo.description"></ion-textarea-vue>
      </ion-item>

      <ion-item style="font-size:smaller; text-align: center" lines="none">
        <ion-label>{{(timeStamp +"").split('(')[0]}}</ion-label>
      </ion-item>
      <ion-row>
        <ion-col>
          <ion-button expand="block" @click="modalClose(true)">Save Note</ion-button>
        </ion-col>
        <ion-col>
          <ion-button expand="block" color="danger" @click="modalClose(false)">Cancel</ion-button>
        </ion-col>
      </ion-row>
    </ion-content>
  </div>
</template>

<script>
export default {
  name: "SimpleModal",
  props: ["timeStamp"],
  methods: {
    modalClose: function(success) {
      let response = {
        success,
        noteInfo: success ? this.noteInfo : null
      };
      this.$ionic.modalController.dismiss(response);
    }
  },
  data() {
    return {
      noteInfo: {
        title: "",
        description: ""
      }
    };
  }
};
</script>
<style scoped>
.errors {
  font-size: smaller;
  color: red;
  font-weight: bold;
}
</style>