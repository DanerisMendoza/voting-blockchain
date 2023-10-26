<template>
  <ion-page>
    <ion-tabs>
      <router-view/>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="PROFILE" href="/TABSPAGE/PROFILE">
          <ion-label>PROFILE</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="DASHBOARD" href="/TABSPAGE/DASHBOARD">
          <ion-label>DASHBOARD</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="VOTING" href="/TABSPAGE/VOTING">
          <ion-label>VOTING</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

