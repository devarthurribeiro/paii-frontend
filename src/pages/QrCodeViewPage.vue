<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <div>
          <div class="text-h5">Dados Residência:</div>
          <p class="subtitle" style="white-space: pre-line">
            {{ route.query.data }}
          </p>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute();
console.log(route.query);
</script>
