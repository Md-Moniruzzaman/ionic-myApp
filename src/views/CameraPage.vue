<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/home" />
        </ion-buttons>
        <ion-title>Camera</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-button expand="block" @click="takePhoto">Take Photo</ion-button>

      <div v-if="photo">
        <img :src="photo" alt="Captured Photo" style="margin-top: 20px; width: 100%;" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonButtons, IonTitle, IonContent, IonButton } from '@ionic/vue';
import { ref } from 'vue';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

const photo = ref(null);

const takePhoto = async () => {
  try {
    const image = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });
    photo.value = image.dataUrl;
  } catch (error) {
    console.error('Camera error:', error);
  }
};
</script>
