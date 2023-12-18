<template></template>

<script lang="ts" setup>
import QRCode from 'qrcodejs';
//gera qrcode com dados da residencia por meio de uma string
function generateQRCode() {
  const qrCode = new QRCode(document.getElementById('qrcode'), {
    width: 100,
    height: 100,
  });
  qrCode.makeCode(
    JSON.stringify({
      endereco: store.current.endereco,
      cargaInstalada: store.current.cargaInstalada,
      padraoEntrada: store.current.padraoEntrada,
      quadroDistribuicao: store.current.quadroDistribuicao,
    })
  );
}
</script>
