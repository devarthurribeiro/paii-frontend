import { defineStore } from 'pinia';
import { api } from '../boot/axios';
import { Residencia } from '../components/models';

export const useResidencia = defineStore('residencia', {
  state: () => ({
    current: {} as Partial<Residencia>,
    residencias: [] as Residencia[],
  }),
  getters: {
    selectOptions: (state) => {
      return state.residencias.map((residencia) => ({
        label: residencia.endereco,
        value: residencia.id,
      }));
    },
  },
  actions: {
    async list() {
      const { data } = await api.get('/residencias');
      this.residencias = data.content;
    },
    async save() {
      return this.current.id ? this.update() : this.create();
    },
    async create() {
      await api.post('/residencias', this.current);
      this.reset();
      this.list();
    },
    async update() {
      await api.put('/residencias/' + this.current.id, this.current);
      this.reset();
      this.list();
    },
    async delete(id: number) {
      await api.delete('/residencias/' + id);
      this.list();
    },
    async reset() {
      this.current = {};
    },
  },
});
