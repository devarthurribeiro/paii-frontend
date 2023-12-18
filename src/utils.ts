import dayjs from 'dayjs';

export function formatDateTime(date?: string) {
  if (!date) return '--/--/-- --:--:--';
  return dayjs(date).format('DD/MM/YYYY, HH:mm:ss');
  // return new Date(date).toLocaleDateString('pt-BR', {
  //   hour: '2-digit',
  //   minute: '2-digit',
  //   second: '2-digit'
  // })
}

export function formatDate(date?: string) {
  if (!date) return '--/--/--';
  date = date.split('T')[0];
  return date.split('-').reverse().join('/');
}

export function formatMothYear(mesAno: number | string) {
  if (!mesAno) return '';
  if (typeof mesAno === 'number') {
    mesAno = mesAno.toString();
  }
  return `${mesAno.substr(4, 2)}/${mesAno.substr(0, 4)}`;
}

export function formatDayMothYear(
  dia: number | string,
  mesAno: number | string
) {
  const mothYear = formatMothYear(mesAno);
  if (typeof dia === 'number') dia = dia.toString();
  if (dia.length === 1) dia = '0' + dia;
  return `${dia}/${mothYear}`;
}

export function formatCnpj(value: string) {
  return value.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5'
  );
}

export function formatCpf(value: string) {
  return value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
}

export function formatCnpjOrCpf(value: string) {
  if (!value) return '';
  return value.length === 11 ? formatCpf(value) : formatCnpj(value);
}

export function formatCurrency(
  value: number | string,
  showCurrencySign = true
) {
  if (!value) return '';

  if (!showCurrencySign) {
    return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(
      Number(value)
    );
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(value));
}

export function formatPercent(value: number | string) {
  return formatNumberPtBr(value) + '%';
}

export function formatNumberPtBr(value: number | string) {
  return new Intl.NumberFormat('pt-BR').format(Number(value));
}

export function formatTypeMapaCompra(value: string) {
  return value === 'a' ? 'Normal' : 'Rede';
}

export function formatAbrangencias(
  abrangencias: Array<{ mneExibidora: string }>
) {
  return abrangencias.map((a) => a.mneExibidora).join(', ');
}

export function formatIndicacaoFaturavel(value: string) {
  return value === 'F' ? 'Faturável' : 'Não Faturável';
}

export function objectToURLSearchParams(obj: any) {
  const params = new URLSearchParams();
  Object.keys(obj).forEach((key) => {
    if (obj[key]) {
      params.append(key, obj[key]);
    }
  });
  return params;
}

export function saveJsonToFile(data: any, fileName: string) {
  const dataStr = 'data:text/plain;charset=utf-8,' + encodeURIComponent(data);
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', dataStr);
  downloadAnchorNode.setAttribute('download', fileName);
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

// recebe um array e um chave unica e retorna um Map com a chave unica como chave e o array como valor
export function arrayToMap<Key, Value>(array: any[], key: string) {
  return new Map<Key, Value>(
    array.map((object) => {
      return [object[key], object];
    })
  );
}

export const getDates = (dataInicio: string, dataFim: string) => {
  const dataInicioDate = new Date(dataInicio + 'T00:00:00');
  const dataFimDate = new Date(dataFim + 'T00:00:00');
  const dates = [];
  const currentDate = new Date(dataInicioDate);

  // eslint-disable-next-line no-unmodified-loop-condition
  while (currentDate <= dataFimDate) {
    const year = currentDate.getFullYear().toString().substr(-2);
    const month = currentDate.getMonth();
    const monthName = currentDate
      .toLocaleString('pt-BR', { month: 'short' })
      .slice(0, 3);
    const monthLabel = monthName + year;
    dates.push({
      name: `${monthLabel}`,
      label: `${monthLabel}`.toUpperCase(),
      field: 'coluna',
      anoMes: Number(
        `${currentDate.getFullYear()}${(month + 1).toString().padStart(2, '0')}`
      ),
      align: 'center',
      headerClasses: 'date-header-cell',
      slot: `body-cell-${monthLabel}`,
      idx: dates.length,
    });

    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return dates;
};

export function formatPropostaId(value: string) {
  if (!value) return '';

  return `(${value})`;
}

export function getDateTomorrow() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString().substr(0, 10);
}

export function formatTipoConteudo(value: string) {
  if (!value) return '-';

  if (value === 'NORMAL') {
    return 'NORMAL';
  }

  if (value.startsWith('INSERT')) {
    return 'INSERT';
  }

  if (value === 'BASKET') {
    return 'BASKET';
  }

  return '-';
}

export const requiredFieldRule = [(val: any) => !!val || 'Campo obrigatório!'];
