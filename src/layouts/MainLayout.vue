<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <img src="/statics/logo.png" style="width: 46px" />
        <!-- <q-toolbar-title> Quasar App </q-toolbar-title> -->
        <!-- <q-toolbar-title> Quasar App </q-toolbar-title> -->
        <q-btn stretch flat label="Início" to="/" />
        <q-btn stretch flat label="Residências" to="/residencias" />
        <q-btn stretch flat label="Manutenções" to="/manutencoes" />
        <q-btn stretch flat label="Sobre" to="/sobre" />
        <q-space />
        <div>Seja bem-vindo, {{ store.userMeta.sub }}</div>
        <q-btn flat dense round icon="account_circle" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue';
import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';

import { useUserStore } from 'src/stores/user';
import { useResidencia } from 'src/stores/residencias';

const store = useUserStore();

const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework',
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev',
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev',
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev',
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev',
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev',
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

onBeforeMount(() => {
  store.updateAxiosToken();
});
</script>
