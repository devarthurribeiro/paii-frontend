<template>
  <q-page>
    <q-card>
      <q-card-section>
        <q-table
          key="id"
          title="Lista de Residências"
          :columns="columns"
          :rows="store.residencias"
          v-model:selected="selected"
          selection="single"
          flat
          dense
        >
          <template v-slot:body-cell-acoes="props">
            <q-td auto-width>
              <q-btn
                @click="editRow(props.row)"
                icon="sync_lock"
                size="sm"
                dense
              >
                <q-tooltip>Editar </q-tooltip>
              </q-btn>
            </q-td>
          </template>
        </q-table>
        <div class="flex justify-end q-mt-sm q-gutter-sm">
          <q-btn
            @click="remove"
            color="red"
            outline
            :disable="selected.length == 0"
            >Remover</q-btn
          >
          <q-btn @click="showForm = true" color="primary" outline
            >Adicionar</q-btn
          >
        </div>
      </q-card-section>
    </q-card>
  </q-page>
  <q-dialog v-model="showForm">
    <q-card>
      <q-card-section>
        <div class="text-h6">Residência</div>
        <q-form @submit.prevent="saveResidencia">
          <div class="row">
            <q-input v-model="cep" label="CEP" @blur="fetchCep" class="col-4" />
            <q-input
              v-model="store.current.endereco"
              label="Endereço"
              class="col-8"
            ></q-input>
            <q-input
              v-model="store.current.cargaInstalada"
              label="Carga Instalada"
              class="col-12"
            />
            <q-input
              v-model="store.current.padraoEntrada"
              label="Padrão de Entrada"
              class="col-12"
            />
            <q-input
              v-model="store.current.quadroDistribuicao"
              label="Quadro de Destribuição"
              class="col-12"
            />
          </div>
          <div class="flex justify-end q-mt-sm q-gutter-sm">
            <q-space></q-space>
            <q-btn @click="showForm = true" color="green" outline type="submit"
              >Salvar</q-btn
            >
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { QTable } from 'quasar';
import { onMounted, ref } from 'vue';

import { api } from '../boot/axios';
import { Residencia } from 'src/components/models';
import { useResidencia } from 'src/stores/residencias';

const cep = ref('');
const selected = ref([] as Residencia[]);
const showForm = ref(false);

const store = useResidencia();

const formData = ref({
  endereco: '',
  cargaInstalada: '',
  padraoEntrada: '',
  quadroDistribuicao: '',
});

const columns: QTable['columns'] = [
  {
    name: 'endereco',
    field: 'endereco',
    label: 'Endereço',
    align: 'left',
    sortable: true,
  },
  {
    name: 'cargaInstalada',
    field: 'cargaInstalada',
    label: 'Carga Instalada',
    align: 'left',
  },
  {
    name: 'padraoEntrada',
    field: 'padraoEntrada',
    label: 'Padrão Entrada',
  },
  {
    name: 'quadroDistribuicao',
    field: 'quadroDistribuicao',
    label: 'Quadro Distribuição',
  },
  {
    name: 'acoes',
    field: 'acoes',
    label: 'Açoes',
  },
];

async function saveResidencia() {
  await store.save();
  showForm.value = false;
  store.list();
}

async function remove() {
  if (!selected.value[0].id) return;
  store.delete(selected.value[0].id);
}

async function fetchCep() {
  const { data } = await api.get(`https://viacep.com.br/ws/${cep.value}/json/`);
  store.current.endereco = `${data.logradouro}`;
}

function editRow(row: any) {
  showForm.value = true;
  store.current = row;
}

onMounted(() => {
  store.list();
});
</script>
