<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/home" />
        </ion-buttons>
        <ion-title>Device Info</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-card>
        <ion-card-content>
          <ion-title>
            <p><strong>Connected Device List</strong></p>
          </ion-title>
          <p>This page lists all connected USB devices.</p>
          <div v-if="result"> {{ result }}</div>
          <ion-button expand="block" @click="listUsbDevices">
            List Devices
          </ion-button>
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
  IonCardContent,
  IonButton,
} from "@ionic/vue";
import { ref } from "vue";
// import { Plugins } from '@capacitor/core';
// const { UsbDeviceComm } = Plugins;

const result = ref(null);

// UsbDeviceComm.echo({ value: 'Hello USB' }).then(result => {
//   console.log(result.value); // Hello USB
// });

const listUsbDevices = async () => {
  try {
    const response = await UsbSerial.listDevices();
    result.value = response.devices;
    console.log(response.devices);
  } catch (error) {
    console.error("Error listing devices:", error);
    result.value = error.message;
  }
};
</script>

