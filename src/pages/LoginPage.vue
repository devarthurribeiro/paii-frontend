<template>
  <q-layout>
    <q-header elevated>
      <q-toolbar>
        <img src="/public/statics/logo.png" style="width: 46px" />
        <div class="text-h5">GESTÃO DE DADOS ELÉTRICOS</div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page class="login flex flex-center full-heigth">
        <q-page-container>
          <q-card class="login-card">
            <q-card-section>
              <form @submit.prevent="login">
                <q-input v-model="user.login" label="Usuário">
                  <template v-slot:prepend>
                    <q-icon name="account_circle" />
                  </template>
                </q-input>
                <q-input v-model="user.password" type="password" label="Senha">
                  <template v-slot:prepend>
                    <q-icon name="lock" />
                  </template>
                </q-input>
                <br />
                <br />
                <q-btn
                  @click="login"
                  type="submit"
                  icon="check_circle"
                  color="primary"
                  label="Entrar"
                  class="full-width"
                />
                <br />
                <br />
                <div class="flex flex-center">
                  <p>
                    Não tem uma conta?
                    <q-btn flat @click="user.showForm = true"
                      >Cadastre-se.</q-btn
                    >
                  </p>
                </div>
              </form>
            </q-card-section>
          </q-card>
        </q-page-container>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { api } from 'src/boot/axios';
import { useUserStore } from '../stores/user';
import { useRouter } from 'vue-router';

const store = useUserStore();
const router = useRouter();

const user = ref({
  login: '',
  password: '',
  showForm: false,
});

async function login() {
  try {
    const { data } = await api.post('/login', {
      login: user.value.login,
      password: user.value.password,
    });
    store.login(data);
    router.push('/');
  } catch (e) {}
}
</script>

<style>
.login {
  background-color: #d9d9d9;
}
.login-card {
  background-color: #fff;
}
</style>
