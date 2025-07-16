<template>
  <ion-page>
    <ion-header class="ion-padding-top">
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/home" />
        </ion-buttons>
        <ion-title>Location Access Utility</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Location Info</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-button expand="block" @click="getCurrentLocation">Get Location</ion-button>

          <div v-if="latitude && longitude" class="ion-margin-top">
            <p><strong>Latitude:</strong> {{ latitude }}</p>
            <p><strong>Longitude:</strong> {{ longitude }}</p>
          </div>

          <ion-text
            color="medium"
            v-if="isLoading"
            class="ion-text-center ion-margin-top"
          >
            <div class="d-flex-start">
              <ion-spinner name="crescent" class="ion-margin-end "></ion-spinner>
              Fetching location and address...
            </div>
          </ion-text>

          <div v-if="address" class="ion-margin-top">
            <p><strong>Address:</strong> {{ address }}</p>
          </div>

          <ion-text color="danger" v-if="locationError">
            <p class="ion-padding-top"><strong>Error:</strong> {{ locationError }}</p>
          </ion-text>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonText,
} from "@ionic/vue";

import { ref } from "vue";
import { Geolocation } from "@capacitor/geolocation";

const latitude = ref(null);
const longitude = ref(null);
const address = ref("");
const locationError = ref("");
const isLoading = ref(false);

const getCurrentLocation = async () => {
  locationError.value = "";
  address.value = "";
  isLoading.value = true;
  try {
    await Geolocation.requestPermissions();

    const position = await Geolocation.getCurrentPosition();
    latitude.value = position.coords.latitude;
    longitude.value = position.coords.longitude;

    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude.value}&lon=${longitude.value}`
    );
    const data = await response.json();
    address.value = data.display_name || "Address not found";
  } catch (error) {
    locationError.value = error.message || "Location fetch failed.";
  } finally {
    isLoading.value = false;
  }
};
</script>
