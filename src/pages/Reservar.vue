<template>
  <div>
    <Banda label="Búsqueda Ubicación" />

    <div class="ubicacion">
      <q-img
        style="width: 165px; height: 141px;"
        class="ubicacion__sucursal"
        src="~/assets/chilling.png"
      ></q-img>

      <q-select
        class="ubicacion__select"
        clearable
        v-model="pisoSeleccionado"
        :options="pisos"
        option-label="piso"
        label="Piso"
      />

      <q-select
        class="ubicacion__select"
        clearable
        v-model="departamentoSeleccionado"
        :options="departamentos"
        option-label="departamento"
        label="Departamento"
        :disable="!pisoSeleccionado"
      />

      <q-select
        class="ubicacion__select"
        clearable
        v-model="areaSeleccionada"
        :options="areas"
        option-label="area"
        label="Área del Departamento"
        :disable="!departamentoSeleccionado"
      />

      <q-btn
        class="ubicacion__button"
        clearable
        label="seleccione ubicación"
        push
        style="color: white"
        :disable="!verUbicacion"
        :to="{ name: 'Calendario' }"
      />
    </div>
  </div>
</template>

<script>
import Banda from "../components/Banda.vue";
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "Reservar",
  components: {
    Banda
  },
  computed: {
    ...mapState("data", ["piso","departamento","area"]),
    ...mapGetters("data", ["pisos", "departamentos", "areas", "verUbicacion"]),
    pisoSeleccionado: {
      get() {
        return this.piso;
      },
      set(val) {
        this.setearPiso(val);
      }
    },
    departamentoSeleccionado: {
      get() {
        return this.departamento;
      },
      set(val) {
        this.setearDepartamento(val);
      }
    },
    areaSeleccionada: {
      get() {
        return this.area;
      },
      set(val) {
        this.setearArea(val);
      }
    },
  },
  methods: {
    ...mapMutations("data", ["setearPiso", "setearDepartamento", "setearArea"])
  }
};
</script>

<style lang="scss" scoped>
.ubicacion {
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
.ubicacion {
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
