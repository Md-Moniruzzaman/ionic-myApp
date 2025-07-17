<template>
  <ion-page>
    <ion-header
      ><ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Connectivity Check</ion-title>
      </ion-toolbar></ion-header>

    <ion-content class="ion-padding">
        <ion-card>
        <ion-card-header>
          <ion-card-title>Check Device Connectivity</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-button expand="block" @click="checkConnectivity">
            Check Connectivity
          </ion-button>

          <div v-if="connectivityStatus" class="ion-margin-top">
            <p><strong>Status:</strong> {{ connectivityStatus }}</p>
          </div>

          <ion-text
            color="medium"
            v-if="isLoading"
            class="ion-text-center ion-margin-top"
          >
            <div class="d-flex-start">
              <ion-spinner name="crescent" class="ion-margin-end"></ion-spinner>
              Checking connectivity...
            </div>
          </ion-text>
          <ion-text color="danger" v-if="loadError">
            <p class="ion-padding-top"><strong>Error:</strong> {{ loadError }}</p>
          </ion-text>
        </ion-card-content>
        </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonText, IonSpinner } from '@ionic/vue';
import { ref } from 'vue';
const connectivityStatus = ref(null);
const isLoading = ref(false);
const loadError = ref(null);
const checkConnectivity = async () => {
  isLoading.value = true;
  loadError.value = null;

  try {
    // Simulate a connectivity check
    await new Promise((resolve) => setTimeout(resolve, 2000));
    connectivityStatus.value = 'Device is connected to the internet';
  } catch (error) {
    loadError.value = 'Failed to check connectivity';
  } finally {
    isLoading.value = false;
  }
};
</script>
