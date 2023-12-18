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
          <template v-slot:body-cell-possuiDR="props">
            <q-td auto-width>
              <q-badge
                :color="props.row.possuiDR ? 'green' : 'red'"
                :label="props.row.possuiDR ? 'Sim' : 'Não'"
              />
            </q-td>
          </template>
          <template v-slot:body-cell-possuiDPS="props">
            <q-td auto-width>
              <q-badge
                :color="props.row.possuiDPS ? 'green' : 'red'"
                :label="props.row.possuiDPS ? 'Sim' : 'Não'"
              />
            </q-td>
          </template>
          <template v-slot:body-cell-acoes="props">
            <q-td auto-width>
              <q-btn
                @click="showQrCode(props.row)"
                icon="qr_code"
                size="sm"
                dense
              >
                <q-tooltip>Mostar QR code </q-tooltip>
              </q-btn>
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
              store.current = {};
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
    <q-card>
      <q-card-section>
        <div class="text-h6">Residência</div>
        <q-form @submit.prevent="saveResidencia">
          <div class="row q-col-gutter-md">
            <q-input v-model="cep" label="CEP" @blur="fetchCep" class="col-4" />
            <q-input
              v-model="store.current.endereco"
              label="Endereço"
              class="col-8"
            ></q-input>
            <q-input
              v-model="store.current.cargaInstalada"
              label="Carga Instalada"
              class="col-6"
            />
            <q-input
              v-model="store.current.padraoEntrada"
              label="Padrão de Entrada"
              class="col-6"
            />
            <q-input
              v-model="store.current.tipoDisjuntor"
              label="Tipo disjuntor"
              class="col-6"
            />
            <q-select
              v-model="store.current.tipoEletroduto"
              label="Tipo eletroduto"
              :options="tiposEletrodutos"
              class="col-6"
            />
            <q-select
              v-model="store.current.voltagemPadrao"
              label="Voltagem Padrão"
              :options="[127, 220]"
              class="col-6"
            />

            <q-toggle
              v-model="store.current.possuiDR"
              label="Possui DR"
              class="col-6"
            />
            <q-toggle
              v-model="store.current.possuiDPS"
              label="Possui DPS"
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
  <q-dialog v-model="showQr">
    <q-card flat>
      <q-card-section>
        <qrcode-vue :value="qrCodeData" :size="350" level="H" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { QTable } from 'quasar';
import { onMounted, ref } from 'vue';
import QrcodeVue from 'qrcode.vue';

import { api } from '../boot/axios';
import { Residencia } from 'src/components/models';
import { useResidencia } from 'src/stores/residencias';
import { useRoute } from 'vue-router';
const tiposEletrodutos = [
  'Plástico Rígido Roscável',
  'Plástico Rígido Soldável',
  'Plástico Flexível',
  'Aço Carbono.',
];
const cep = ref('');
const selected = ref([] as Residencia[]);
const showForm = ref(false);
const showQr = ref(false);
const qrCodeData = ref('');
const store = useResidencia();
const route = useRoute();

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
    name: 'tipoDisjuntor',
    field: 'tipoDisjuntor',
    label: 'Tipo Disjuntor',
  },
  {
    name: 'voltagemPadrao',
    field: 'voltagemPadrao',
    label: 'Voltagem Padrão',
  },
  {
    name: 'possuiDR',
    field: 'possuiDR',
    label: 'Possui DR',
  },
  {
    name: 'possuiDPS',
    field: 'possuiDPS',
    label: 'Possui DPS',
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

function showQrCode(row: any) {
  showQr.value = true;
  const data = `Endereço: ${row.endereco}
  Carga Instalada: ${row.cargaInstalada}
  Padrão de Entrada: ${row.padraoEntrada}
  Tipo Disjuntor: ${row.tipoDisjuntor}
  Tipo Eletroduto: ${row.tipoEletroduto}
  Voltagem Padrão: ${row.voltagemPadrao}
  Possui DR: ${row.possuiDR ? 'Sim' : 'Não'}
  Possui DPS: ${row.possuiDPS ? 'Sim' : 'Não'}
  `;
  qrCodeData.value = encodeURI(
    `https://paii-frontend.vercel.app/qrcode?data=${data}`
  );
  console.log(
    encodeURI(`https://paii-frontend.vercel.app/qrcode?data=${data}`)
  );
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
  if (route.params.cadastrar) {
    showForm.value = true;
  }
});
</script>
