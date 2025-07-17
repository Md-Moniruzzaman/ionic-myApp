<template>
  <ion-page>
  <div inert></div>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/home" />
        </ion-buttons>
        <ion-title>Network Connectivity</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <!-- Warning if offline -->
      <ion-card color="danger" v-if="!isConnected">
        <ion-card-header>
          <ion-card-title>Offline</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-text color="light">
            <p>You are currently offline. Please check your internet connection.</p>
            <ion-button expand="block" fill="outline" @click="checkNetworkStatus">
              Retry
            </ion-button>
          </ion-text>
        </ion-card-content>
      </ion-card>

      <!-- Status if online -->
      <ion-card v-else>
        <ion-card-header>
          <ion-card-title>Online</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-text>
            <p><strong>Connected:</strong> {{ isConnected ? 'Yes' : 'No' }}</p>
            <p><strong>Connection Type:</strong> {{ connectionType }}</p>
            <ion-button expand="block" @click="checkNetworkStatus">Refresh</ion-button>
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
  IonText,
  IonButton,
} from '@ionic/vue';

import { ref, onMounted, onUnmounted } from 'vue';
import { Network } from '@capacitor/network';
import { onIonViewWillLeave } from '@ionic/vue';

const isConnected = ref(false);
const connectionType = ref('unknown');

// Remove focus when page is about to be hidden
onIonViewWillLeave(() => {
  document.activeElement?.blur()
})

const checkNetworkStatus = async () => {
  try {
    const status = await Network.getStatus();
    isConnected.value = status.connected;
    connectionType.value = status.connectionType;
  } catch (error) {
    console.error('Error checking network:', error);
  }
};

onMounted(() => {
  checkNetworkStatus();
  Network.addListener('networkStatusChange', status => {
    isConnected.value = status.connected;
    connectionType.value = status.connectionType;
  });
});

onUnmounted(() => {
  Network.removeAllListeners(); // clean up on page leave
});
</script>
