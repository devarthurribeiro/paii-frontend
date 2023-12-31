<template>
  <q-page>
    <q-card>
      <q-card-section>
        <q-table
          key="id"
          title="Lista de Manutenções"
          :columns="columns"
          :rows="store.manutencoes"
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
          <q-btn
            @click="
              store.reset();
              showForm = true;
            "
            color="primary"
            outline
            >Adicionar</q-btn
          >
        </div>
      </q-card-section>
    </q-card>
  </q-page>
  <q-dialog v-model="showForm">
    <q-card style="width: 400px">
      <q-card-section>
        <div class="text-h6">Residência</div>
        <q-form @submit.prevent="saveResidencia">
          <q-select
            v-model="store.current.residencia.id"
            :options="residenciaStore.selectOptions"
            emit-value
            map-options
            label="Residência"
          ></q-select>
          <q-input
            v-model="store.current.descricao"
            label="Descrição"
          ></q-input>
          <q-input
            v-model="store.current.eletricistaResponsavel"
            label="Eletricista Responsável"
          ></q-input>
          <div class="row">
            <q-select
              v-model="store.current.status"
              :options="['PENDENTE', 'FINALIZADO']"
              label="Status"
              class="col-6"
            ></q-select>
            <q-input
              v-model="store.current.dataFinalizacao"
              type="date"
              label="Data finalização"
              class="col-6"
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
import { useManutencao } from '../stores/manutencoes';
import { useRoute } from 'vue-router';
import { useResidencia } from '../stores/residencias';
import { formatDate, formatDateTime } from '../utils';

const cep = ref('');
const selected = ref([] as Residencia[]);
const showForm = ref(false);

const store = useManutencao();
const residenciaStore = useResidencia();
const route = useRoute();

const formData = ref({
  endereco: '',
  cargaInstalada: '',
  padraoEntrada: '',
  quadroDistribuicao: '',
});

const columns: QTable['columns'] = [
  {
    name: 'dataCadastro',
    field: 'dataCadastro',
    label: 'Data Cadastro',
    align: 'left',
    sortable: true,
    format: (val) => formatDateTime(val),
  },
  {
    name: 'residencia',
    field: (row) => (row.residencia ? row.residencia.endereco : ''),
    label: 'Residência',
    align: 'left',
  },
  {
    name: 'descricao',
    field: 'descricao',
    label: 'Descrição',
  },
  {
    name: 'eletricistaResponsavel',
    field: 'eletricistaResponsavel',
    label: 'Eletricista Responsável',
  },
  {
    name: 'dataFinalizacao',
    field: 'dataFinalizacao',
    label: 'Data Finalização',
    format: (val) => formatDate(val),
    align: 'left',
  },
  {
    name: 'status',
    field: 'status',
    label: 'Status',
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
  await store.delete(selected.value[0].id);
  selected.value = [];
}

function editRow(row: any) {
  showForm.value = true;
  store.current = {
    ...row,
    dataFinalizacao: row.dataFinalizacao.split('T')[0],
  };
}

onMounted(() => {
  store.list();
  residenciaStore.list();
  if (route.params.cadastrar) {
    showForm.value = true;
  }
});
</script>
