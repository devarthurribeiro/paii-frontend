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
                <q-badge
                  v-if="error"
                  color="negative"
                  icon="report_problem"
                  border="left"
                  >Login ou senha inválido.</q-badge
                >
                <br />
                <q-btn
                  @click="login"
                  :loading="loading"
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
                    <q-btn @click="show = true" flat>Cadastre-se.</q-btn>
                  </p>
                </div>
              </form>
            </q-card-section>
          </q-card>
        </q-page-container>
      </q-page>
    </q-page-container>
  </q-layout>
  <q-dialog v-model="show">
    <q-card style="width: 350px">
      <q-card-section>
        <div class="text-h5">Criar conta</div>
        <q-form @submit="createAccount">
          <q-input v-model="newUser.username" label="Nome" />
          <q-input v-model="newUser.login" label="Usuário" />
          <q-input v-model="newUser.password" label="Senha" />
          <q-input v-model="newUser.email" label="E-mail" />
          <br />
          <div class="flex justify-end">
            <q-btn type="submit" color="green">Cadastre-se</q-btn>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { api } from 'src/boot/axios';
import { useUserStore } from '../stores/user';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const store = useUserStore();
const router = useRouter();
const $q = useQuasar();

const user = ref({
  login: '',
  password: '',
  showForm: false,
});

const newUser = ref({
  username: '',
  login: '',
  password: '',
  email: '',
  tipo: '',
});

const show = ref(false);
const error = ref(false);
const loading = ref(false);

async function login() {
  loading.value = true;
  error.value = false;
  try {
    const { data } = await api.post('/login', {
      login: user.value.login,
      password: user.value.password,
    });

    store.login(data);
    router.push('/');
  } catch (e) {
  } finally {
    loading.value = false;
    error.value = true;
  }
}

async function createAccount() {
  try {
    const { data } = await api.post('/usuarios', newUser.value);
    show.value = false;
    newUser.value = {};
    $q.notify({
      message: 'Usuário criado com sucesso!',
      color: 'positive',
      icon: 'check_circle',
    });
  } catch (e) {
    $q.notify({
      message: 'Erro ao criar usuário.',
      color: 'negative',
      icon: 'report_problem',
    });
  } finally {
  }
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
