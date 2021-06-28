<template>
  <div class="banda">
    <div class="banda__label">{{ label }}</div>
  </div>
</template>

<script>
export default {
  name: "Banda",
  props: {
    label: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="scss">
.banda {
  align-items: center;
  color: #050505;
  display: flex;
  height: 45px;
  justify-content: space-between;
  margin-bottom: 12px;
  padding: 0 20px;
  width: 100%;
  &__label {
    line-height: 28px;
    font-size: 24px;
    font-weight: 700;
  }
}
</style>
