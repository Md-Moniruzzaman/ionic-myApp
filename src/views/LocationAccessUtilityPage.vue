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
        <p>This utility helps you manage location access permissions.</p>
        <!-- Add your location access utility content here -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>Location Access Status</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>Check and manage your location access permissions.</p>
            <!-- Add more details or controls as needed -->
          </ion-card-content>
        </ion-card>
      </ion-content>
    </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonButtons, IonTitle, IonContent } from "@ionic/vue";
import { IonBackButton } from "@ionic/vue";

// import { ref } from "vue";
// const data = ref(null);
</script>