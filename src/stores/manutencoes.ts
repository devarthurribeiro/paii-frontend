import { defineStore } from 'pinia';
import { api } from '../boot/axios';

export const useManutencao = defineStore('residencia', {
  state: () => ({
    current: {
      id: null,
      endereco: '',
      cargaInstalada: '',
      padraoEntrada: '',
      quadroDistribuicao: '',
    },
    manutencoes: [],
  }),
  getters: {},
  actions: {
    async list() {
      const { data } = await api.get('/manutencoes');
      this.manutencoes = data.content;
    },
    async save() {
      return this.current.id ? this.update() : this.create();
    },
    async create() {
      await api.post('/manutencoes', this.current);
      this.reset();
      this.list();
    },
    async update() {
      await api.put('/manutencoes/' + this.current.id, this.current);
      this.reset();
      this.list();
    },
    async delete(id: number) {
      await api.delete('/manutencoes/' + id);
      this.list();
    },
    async reset() {
      this.current = {
        id: null,
        endereco: '',
        cargaInstalada: '',
        padraoEntrada: '',
        quadroDistribuicao: '',
      };
    },
  },
});
