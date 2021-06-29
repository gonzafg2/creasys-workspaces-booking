<template>
  <div class="calendario">
    <div class="calendario__botones">
      <button
        @click="selectTipoCal('mensual')"
        class="calendario__tipo"
        :class="{ 'calendario__tipo--select': tipoCalendario === 'mensual' }"
      >
        Mes
      </button>
      <button
        @click="selectTipoCal('diario')"
        class="calendario__tipo"
        :class="{ 'calendario__tipo--select': tipoCalendario === 'diario' }"
      >
        Diario
      </button>
    </div>

    <q-date
      class="calendario__cal"
      v-model="date"
      color="deep-purple-4"
      :options="hoy"
      flat
      minimal
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "Calendario",
  data() {
    return {
      date: "2021/06/30"
    };
  },
  computed: {
    ...mapState("data", ["tipoCalendario"])
  },
  methods: {
    hoy(date) {
      return date >= "2021/06/28";
    },
    selectTipoCal(tipo) {
      this.setearTipoCal(tipo);
    },
    ...mapMutations("data", ["setearTipoCal"])
  }
};
</script>

<style lang="scss">
.calendario {
  background-color: #140a26;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &__botones {
    display: flex;
    height: 50px;
    margin: 30px 0 20px;
    width: 285px;
    background-color: #fff;
    border-radius: 100px;
  }
  &__cal {
    background-color: #140a26;
    color: #fff;
    width: 100%;
  }
  &__tipo {
    border: 0;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    width: 100%;
    &:first-child {
      border-radius: 100px 0 0 100px;
    }
    &:last-child {
      border-radius: 0 100px 100px 0;
    }
    &:focus-visible {
      outline: none;
    }
    &--select {
      background-color: #164b7d;
      font-weight: 600;
      font-size: 14px;
      line-height: 16px;
      color: #fff;
      margin: -1px;
      transition: all 75ms linear;
    }
  }
  .q-date__today {
    box-shadow: 0 0 5px 0 currentColor;
  }
  .q-date__calendar-weekdays {
    border-bottom: 1px solid white;
    margin-bottom: 5px;
    > div {
      font-weight: 600;
      font-size: 14px;
    }
  }
}
</style>
