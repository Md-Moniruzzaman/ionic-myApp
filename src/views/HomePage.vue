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
          <ion-button slot="end" router-link="/connected-devices" fill="outline"
            >Scan</ion-button
          >
        </ion-item>

        <ion-item>
          <ion-label>Connectivity Check</ion-label>
          <ion-button slot="end" router-link="/connection_check" fill="outline"
            >Ping</ion-button
          >
        </ion-item>

        <ion-item>
          <ion-label>Get App Path</ion-label>
          <ion-button slot="end" router-link="/login" fill="outline">Fetch</ion-button>
        </ion-item>

        <ion-item>
          <ion-label>Local Notification</ion-label>
          <ion-button slot="end" fill="outline" @click="sendLocalNotification"
            >Show</ion-button
          >
        </ion-item>

        <!-- <ion-item>
          <ion-label>Background location</ion-label>
          <ion-button slot="end" fill="outline" @click="startTracking">start</ion-button>
        </ion-item> -->

        <ion-item>
          <ion-label>Background location</ion-label>
          <ion-button
            slot="end"
            fill="outline"
            @click="tracking ? stopTracking() : startTracking()"
          >
            {{ tracking ? "Stop" : "Start" }}
          </ion-button>
        </ion-item>

        <ion-item lines="none">
          <ion-label>{{ location }}</ion-label>
        </ion-item>

        <div v-if="errorMessage">
          <ion-text color="danger" class="ion-padding-top">
            <strong>Error:</strong> {{ errorMessage }}
          </ion-text>
        </div>
        <!-- <div v-if="location">
          <ion-text color="danger" class="ion-padding-top">
            <strong>Live tracking:</strong> {{ location }}
          </ion-text>
        </div> -->
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
import { LocalNotifications } from "@capacitor/local-notifications";
import { Geolocation } from "@capacitor/geolocation";
import { BackgroundTask } from "@capawesome/capacitor-background-task";

import { ref } from "vue";

const errorMessage = ref("");
const sendLocalNotification = async () => {
  try {
    const permission = await LocalNotifications.requestPermissions();

    if (permission.display === "granted") {
      errorMessage.value = ""; // Reset error message
      await LocalNotifications.schedule({
        notifications: [
          {
            title: "Hello!",
            body: "This is a local Ionic notification test.",
            id: 1,
            schedule: { at: new Date(Date.now() + 1000) },
          },
        ],
      });
    } else {
      console.warn("[MyApp] Notification permission not granted.");
      errorMessage.value = "Notification permission not granted.";
    }
  } catch (error) {
    console.error("[MyApp] Error while sending local notification:", error);
    errorMessage.value = error.message || "Failed to send local notification";
  }
};

const location = ref("Waiting...");
const tracking = ref(false); // To control UI button toggle
let watchId = null;

const startTracking = async () => {
  try {
    console.log("🔄 Starting tracking...");
    const permission = await Geolocation.requestPermissions({ background: true });
    if (permission.location !== "granted") {
      location.value = "Permission denied";
      return;
    }

    await LocalNotifications.requestPermissions();
    await LocalNotifications.schedule({
      notifications: [
        {
          title: "Tracking Started",
          body: "Your location is being tracked in background.",
          id: 1001,
        },
      ],
    });

    // Optional: Live location updates
    watchId = await Geolocation.watchPosition({}, (position, err) => {
      if (err) {
        location.value = `Error: ${err.message}`;
        return;
      }
      const lat = position.coords.latitude.toFixed(6);
      const lon = position.coords.longitude.toFixed(6);
      location.value = `Live: ${lat}, ${lon}, Accuracy: ${position.coords.accuracy}, timestamp: ${new Date(position.timestamp).toLocaleTimeString()}`;
    });

    // Background task
    const taskId = await BackgroundTask.beforeExit(async () => {
      const pos = await Geolocation.getCurrentPosition();
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      console.log(" [MyApp]📍 BG Location:", lat, lon);
      location.value = `📍 BG: ${lat.toFixed(6)}, ${lon.toFixed(6)}`;
      BackgroundTask.finish({ taskId });
    });

    tracking.value = true;
    console.log("[MyApp] ✅ Background task scheduled:", taskId);
  } catch (err) {
    console.error(err);
    location.value = `Error: ${err.message}`;
  }
};

const stopTracking = async () => {
  try {
    if (watchId) {
      await Geolocation.clearWatch({ id: watchId });
      watchId = null;
    }
    await LocalNotifications.schedule({
      notifications: [
        {
          title: "Tracking Stopped",
          body: "Background location tracking has been turned off.",
          id: 1002,
        },
      ],
    });

    location.value = "Tracking stopped.";
    tracking.value = false;
    console.log(" [MyApp] 🛑 Tracking stopped.");
  } catch (err) {
    console.error(err);
    location.value = `Error: ${err.message}`;
  }
};

// const location = ref("Waiting for location...");

// const startTracking = async () => {
//   try {
//     console.log("📍 Tracking started");

//     // 1. Request location permission (foreground + background)
//     const permission = await Geolocation.requestPermissions({ background: true });

//     if (permission.location !== "granted") {
//       location.value = "Permission denied";
//       return;
//     }

//     // 2. Show local notification
//     await LocalNotifications.requestPermissions();
//     await LocalNotifications.schedule({
//       notifications: [
//         {
//           title: "Tracking Started",
//           body: "Your location is being tracked in the background.",
//           id: 1,
//           schedule: { at: new Date(Date.now() + 1000) },
//         },
//       ],
//     });

//     // 3. Background task before exit (triggered before app is killed/suspended)
//     const taskId = await BackgroundTask.beforeExit(async () => {
//       const pos = await Geolocation.getCurrentPosition();
//       const lat = pos.coords.latitude;
//       const lon = pos.coords.longitude;

//       console.log("📍 Background location:", lat, lon);
//       // location.value = `📍 BG Update: ${lat.toFixed(6)}, ${lon.toFixed(6)}`;
//       Geolocation.watchPosition({}, (position) => {
//         location.value = `Live: ${position.coords.latitude}, ${
//           position.coords.longitude
//         }, Accuracy: ${position.coords.accuracy}, timestamp: ${new Date(
//           position.timestamp
//         ).toLocaleTimeString()}`;
//       });

//       // Mark background task as complete
//       BackgroundTask.finish({ taskId });
//     });

//     console.log("✅ Background task scheduled:", taskId);
//     location.value = `Tracking started. Task ID: ${taskId}`;
//   } catch (err) {
//     console.error("❌ Error starting tracking:", err);
//     location.value = `Error: ${err.message}`;
//   }
// };
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
