<template>
  <div>
    <Banda label="Reserva tu atención" />

    <div class="busqueda">
      <q-img
        style="width: 165px; height: 141px;"
        class="busqueda__sucursal"
        src="~/assets/chatting.png"
      ></q-img>

      <q-select
        class="busqueda__select"
        clearable
        v-model="regionSeleccionada"
        :options="regiones"
        option-label="region"
        label="Región"
      />

      <q-select
        class="busqueda__select"
        clearable
        v-model="comunaSeleccionada"
        :options="comunas"
        option-label="nombre"
        label="Comuna"
        :disable="!regionSeleccionada"
      />

      <q-select
        class="busqueda__select"
        clearable
        v-model="sucursalSeleccionada"
        :options="sucursales"
        option-label="nombre"
        label="Sucursal"
        :disable="!comunaSeleccionada"
      />

      <q-btn
        class="busqueda__button"
        clearable
        label="seleccione sucursal"
        push
        style="color: white"
        :disable="!verDisponibilidad"
        :to="{ name: 'Reservar' }"
      />
    </div>
  </div>
</template>

<script>
import Banda from "../components/Banda.vue";
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "Busqueda",
  data() {
    return {
      model: null,
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"]
    };
  },
  components: {
    Banda
  },
  computed: {
    ...mapState("data", ["region", "comuna", "sucursal"]),
    ...mapGetters("data", [
      "regiones",
      "comunas",
      "sucursales",
      "verDisponibilidad"
    ]),
    regionSeleccionada: {
      get() {
        return this.region;
      },
      set(val) {
        this.setearRegion(val);
      }
    },
    comunaSeleccionada: {
      get() {
        return this.comuna;
      },
      set(val) {
        this.setearComuna(val);
      }
    },
    sucursalSeleccionada: {
      get() {
        return this.sucursal;
      },
      set(val) {
        this.setearSucursal(val);
      }
    }
  },
  methods: {
    ...mapMutations("data", ["setearRegion", "setearComuna", "setearSucursal"])
  }
};
</script>

<style lang="scss" scoped>
.busqueda {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 25px;
  &__sucursal {
    margin-bottom: 48px;
  }
  &__select {
    width: 100%;
    max-width: 315px;
    margin-bottom: 15px;
    @media screen and (min-width: 360px) {
      margin-bottom: 38px;
    }
    .q-field__label {
      color: #000000;
    }
  }
  &__button {
    width: 100%;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: #164b7d;
    border-radius: 0;
    height: 50px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    font-weight: 700;
    font-size: 11px;
    line-height: 13px;
    letter-spacing: 1px;
    color: #ffffff;
    text-transform: uppercase;
  }
  .q-field--disabled {
    opacity: 0.6;
  }
}
</style>
<style lang="scss">
.busqueda {
  &__select {
    .q-field__label {
      color: #050505;
      font-weight: 600;
      line-height: 16px;
      padding-bottom: 11px;
    }
    .q-field__native {
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      color: #7c87a5;
    }
  }
}
</style>
