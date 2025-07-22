<template>
  <ion-page>
    <ion-header class="ion-padding-top">
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/home" />
        </ion-buttons>
        <ion-title>Device Info</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Device Details</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-button expand="block" @click="loadDeviceInfo">Load Device Info</ion-button>

          <div v-if="deviceInfo" class="ion-margin-top">
            <p><strong>Model:</strong> {{ deviceInfo.model }}</p>
            <p><strong>Platform:</strong> {{ deviceInfo.platform }}</p>
            <p><strong>Operating System:</strong> {{ deviceInfo.operatingSystem }}</p>
            <p><strong>OS Version:</strong> {{ deviceInfo.osVersion }}</p>
            <p><strong>Manufacturer:</strong> {{ deviceInfo.manufacturer }}</p>
            <p><strong>UUID:</strong> {{ deviceInfo.uuid }}</p>
            
            <p><strong>WebView Version:</strong> {{ deviceInfo.webViewVersion }}</p>
            <p><strong>Get UUID:</strong> {{ deviceInfo.uidInf }}</p>
            <p><strong>Device Charging Status:</strong> {{ deviceInfo.isCharging }}</p>
            <p><strong>Batter Charging level:</strong> {{ deviceInfo.batteryLevel }}</p>
            <p><strong>Language:</strong> {{ deviceInfo.language }}</p>
          </div>

          <ion-text
            color="medium"
            v-if="isLoading"
            class="ion-text-center ion-margin-top"
          >
            <div class="d-flex-start">
              <ion-spinner name="crescent" class="ion-margin-end"></ion-spinner>
              Fetching location and address...
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
  IonSpinner,
} from "@ionic/vue";

import { ref } from "vue";
import { Device } from "@capacitor/device";

const deviceInfo = ref(null);
const loadError = ref(null);
const isLoading = ref(false);

const loadDeviceInfo = async () => {
  loadError.value = ""; // Reset error message
  isLoading.value = true; // Set loading state
  try {
    const info = await Device.getInfo();
    deviceInfo.value = info;
    const batteryInfo = await Device.getBatteryInfo();
    deviceInfo.value.batteryLevel = batteryInfo.batteryLevel;
    deviceInfo.value.isCharging = batteryInfo.isCharging;
    const language = await Device.getLanguageCode();
    deviceInfo.value.language = language.value;
    const uidInfo = await Device.getId();
    deviceInfo.value.uuid = uidInfo.uuidinf;
  } catch (error) {
    console.error("Error loading device info:", error);
    loadError.value = error.message || "Failed to load device info";
  } finally {
    isLoading.value = false; // Reset loading state
  }
};
</script>
