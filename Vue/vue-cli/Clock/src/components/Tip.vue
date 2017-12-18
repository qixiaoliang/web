<template>
  <div class="tip-root">
      <slot></slot>
  </div>
</template>

<script>
</script>

<style scoped>
    .tip-root{
        min-width: 20px;
        padding: 2mm 3mm;
        background: #3eadc1;
        border-bottom-right-radius: 0;
        border-top-left-radius: 30px;
        border-bottom-left-radius: 30px;
        border-top-right-radius: 30px;
        text-align: center;
    }
</style>
