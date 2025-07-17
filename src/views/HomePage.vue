<template>
  <ion-page>
    <!-- Header -->
    <ion-header class="ion-padding-top">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/registration"></ion-back-button>
        </ion-buttons>
        <ion-title class="ion-text-center">IONIC Kitchen</ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- Main Content -->
    <ion-content class="ion-padding">
      <!-- Welcome Text -->
      <ion-card class="ion-text-center">
        <ion-card-header>
          <ion-card-title>Welcome to IONIC Kitchen</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>
            This dashboard provides system diagnostic and device-level tools for field
            testing and integration.
          </p>
        </ion-card-content>
      </ion-card>

      <!-- Tools Section -->
      <ion-list lines="full">
        <ion-item>
          <ion-label>Camera Check</ion-label>
          <ion-button slot="end" router-link="/camera" fill="outline">Open</ion-button>
        </ion-item>

        <ion-item>
          <ion-label>Location Access</ion-label>
          <ion-button slot="end" router-link="/location" fill="outline">Check</ion-button>
        </ion-item>

        <ion-item>
          <ion-label>Device Details</ion-label>
          <ion-button slot="end" router-link="/device-info" fill="outline"
            >View</ion-button
          >
        </ion-item>

        <ion-item>
          <ion-label>Connected Devices</ion-label>
          <ion-button slot="end" router-link="/login" fill="outline">Scan</ion-button>
        </ion-item>

        <ion-item>
          <ion-label>Connectivity Check</ion-label>
          <ion-button slot="end" router-link="/connection_check" fill="outline">Ping</ion-button>
        </ion-item>

        <ion-item>
          <ion-label>Get App Path</ion-label>
          <ion-button slot="end" router-link="/login" fill="outline">Fetch</ion-button>
        </ion-item>
      </ion-list>
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
  IonList,
  IonItem,
  IonLabel,
  IonButton,
} from "@ionic/vue";
</script>

<style scoped>
ion-card {
  margin-bottom: 20px;
  border-radius: 12px;
}
ion-item {
  --inner-padding-end: 0;
}
</style>
