import { defineStore } from 'pinia';
import { api } from '../boot/axios';

export const useManutencao = defineStore('manutencao', {
  state: () => ({
    current: {
      id: null,
      dataFinalizacao: '',
      descricao: '',
      eletricistaResponsavel: '',
      residencia: {
        id: null,
      },
      status: '',
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
      await api.post('/manutencoes', {
        ...this.current,
        dataCadastro: new Date().toISOString().split('T')[0],
      });
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
        dataFinalizacao: '',
        descricao: '',
        eletricistaResponsavel: '',
        status: '',
      };
    },
  },
});
