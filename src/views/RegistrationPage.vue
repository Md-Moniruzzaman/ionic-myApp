<template>
  <ion-page>
    <ion-header class="ion-padding-top" >
      <ion-toolbar >
        <ion-title class="ion-text-center">Registration</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      
      <form @submit.prevent="submitForm">
        <ion-item>
          <ion-label position="floating">Full Name</ion-label>
          <ion-input class="ion-margin-top" v-model="form.name" required></ion-input>
        </ion-item>

        <ion-text color="danger" v-if="errors.name">
          <p class="ion-padding-start">{{ errors.name }}</p>
        </ion-text>

        <ion-item>
          <ion-label position="floating">Email</ion-label>
          <ion-input class="ion-margin-top" v-model="form.email" type="email" required></ion-input>
        </ion-item>
        <ion-text color="danger" v-if="errors.email">
          <p class="ion-padding-start">{{ errors.email }}</p>
        </ion-text>

        <ion-item>
          <ion-label position="floating">Password</ion-label>
          <ion-input class="ion-margin-top" v-model="form.password" type="password" required></ion-input>
        </ion-item>
        <ion-text color="danger" v-if="errors.password">
          <p class="ion-padding-start">{{ errors.password }}</p>
        </ion-text>

        <ion-button expand="block" type="submit" class="ion-margin-top">Register</ion-button>


     <div class="ion-text-center">
         <ion-text  color="medium"  >
          <p class="ion-padding-top" >Already have an account? <a href="/home">Login here</a></p> 
        </ion-text>
     </div> 
     <div class="ion-text-center ">
         <ion-text  color="medium"  >
          <p class="ion-padding-top" > <a href="/home">Home</a></p> 
        </ion-text>
     </div>


      </form>

      <ion-toast
        :is-open="toastVisible"
        message="Registration Successful!"
        icon="checkmark-circle"
        color="Success"
        position="botom-middle"
        duration="2000"
        @didDismiss="toastVisible = false"
      />

    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
  IonToast
} from '@ionic/vue'
import { reactive, ref } from 'vue'

const form = reactive({
  name: '',
  email: '',
  password: ''
})

const errors = ref({
  name: '',
  email: '',
  password: ''
})

const toastVisible = ref(false)


const validateForm = () => {
  errors.value = { name: '', email: '', password: '' }
  let valid = true

  if (form.name.trim().length < 2) {
    errors.value.name = 'Name must be at least 2 characters'
    valid = false
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(form.email)) {
    errors.value.email = 'Please enter a valid email address'
    valid = false
  }

  if (form.password.length < 6) {
    errors.value.password = 'Password must be at least 6 characters'
    valid = false
  }

  return valid
}

const submitForm = () => {

  console.log('Form submitted:', form)

  if (!validateForm()) return
  
  toastVisible.value = true
  form.name = ''
  form.email = ''
  form.password = ''
}
</script>

