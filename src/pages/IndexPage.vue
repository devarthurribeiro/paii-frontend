<template>
  <q-page class="row q-pa-lg">
    <div class="col-6">
      <div class="flex q-gutter-md">
        <div class="text-h4 text-bold">SUAS RESIDÊNCIAS</div>
        <q-btn to="/residencias/cadastrar" rounded color="green"
          >Nova RESIDÊNCIAS</q-btn
        >
      </div>
      <q-list class="q-mt-md" style="max-width: 700px">
        <q-item
          v-for="residencia in store.residencias"
          :key="residencia.id"
          bordered
        >
          <q-item-section top>
            <q-item-label class="text-h6">{{
              residencia.endereco
            }}</q-item-label>
          </q-item-section>
          <q-item-section top side>
            <div>
              <q-btn dense icon="visibility" flat></q-btn>
              <q-btn
                @click="store.current = residencia"
                to="/residencias/cadastrar"
                dense
                icon="edit"
                flat
              ></q-btn>
              <q-btn dense icon="delete" flat></q-btn>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <div class="col-6">
      <div class="flex q-gutter-md">
        <div class="text-h4 text-bold">MANUTENÇÕES</div>
        <q-btn to="/manutencoes/cadastrar" rounded color="green"
          >Nova MANUTENÇÕES</q-btn
        >
      </div>
      <div class="row q-mt-md q-gutter-md">
        <div class="col-6">
          <div class="text-h6">Em Aberto</div>
          <q-btn
            v-for="m in manutencoeStore.getEmAndamento"
            :key="m.id"
            rounded
            size="lg"
            color="green"
            class="q-ma-sm"
          >
            {{ m.residencia.endereco }} <br />
            20/10/2023
          </q-btn>
        </div>
        <div class="col-6">
          <div class="text-h6">Finalizadas</div>
          <q-btn
            v-for="m in manutencoeStore.getFinalizadas"
            :key="m.id"
            rounded
            size="lg"
            color="red"
            class="q-ma-sm"
          >
            {{ m.residencia.endereco }} <br />
            20/10/2023
          </q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useManutencao } from '../stores/manutencoes';
import { useResidencia } from '../stores/residencias';

const store = useResidencia();
const manutencoeStore = useManutencao();
store.list();
manutencoeStore.list();
</script>
