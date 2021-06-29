<template>
  <div>
    <div class="calendario">
      <div class="calendario__botones">
        <button
          class="calendario__tipo disabled"
          :class="{ 'calendario__tipo--select': tipoCalendario === 'mensual' }"
          :disable="tipoCalendario === 'diario'"
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
        v-model="fecha"
        color="deep-purple-4"
        :options="hoyActual"
        flat
        minimal
      />
    </div>

    <div class="calendario__agenda-mensual">
      <p class="calendario__mes">
        {{ hoy.diaNum }} <span class="text-lowercase">de</span> {{ hoy.mesNom }}
      </p>

      <q-list
        dark
        class="rounded-borders q-mb-md"
        v-for="puesto in puestos"
        :key="puesto.id"
      >
        <q-expansion-item
          expand-separator
          icon="badge"
          :label="`Puesto ${puesto.puesto}`"
        >
          <div
            @click="checkear(puesto.id, horario.id)"
            class="calendario__puesto"
            :class="{
              'calendario__puesto--check':
                puesto.id === puestoSeleccionado.id &&
                horario.id === puestoSeleccionado.hora
            }"
            v-for="horario in horarios"
            :key="horario.id"
          >
            <p class="calendario__puesto-nombre">
              <q-icon
                :name="
                  puesto.id === puestoSeleccionado.id &&
                  horario.id === puestoSeleccionado.hora
                    ? 'check_circle'
                    : 'check_circle_outline'
                "
                :class="
                  puesto.id === puestoSeleccionado.id &&
                  horario.id === puestoSeleccionado.hora
                    ? 'calendario__check'
                    : 'calendario__uncheck'
                "
              />
              Puesto {{ puesto.puesto }}
            </p>

            <div class="calendario__fecha">
              <p class="calendario__dia">Hoy</p>
              &nbsp; · &nbsp;
              <p class="calendario__hora">{{ horario.hora }}</p>
            </div>
          </div>
        </q-expansion-item>
      </q-list>

      <button class="calendario__agregar">+</button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState, mapGetters, mapMutations } from "vuex";

export default Vue.extend({
  name: "Calendario",
  data() {
    return {
      puestoSeleccionado: {
        id: null,
        hora: null
      },
      horarios: [
        {
          id: 0,
          hora: "09:00"
        },
        {
          id: 1,
          hora: "10:00"
        },
        {
          id: 2,
          hora: "11:00"
        },
        {
          id: 3,
          hora: "12:00"
        },
        {
          id: 4,
          hora: "14:00"
        },
        {
          id: 5,
          hora: "15:00"
        },
        {
          id: 6,
          hora: "16:00"
        },
        {
          id: 7,
          hora: "17:00"
        }
      ]
    };
  },
  computed: {
    ...mapState("data", [
      "tipoCalendario",
      "fechaActual",
      "fechaSeleccionada",
      "hoy"
    ]),
    ...mapGetters("data", ["puestos"]),
    fecha: {
      get: function() {
        return this.fechaSeleccionada;
      },
      set: function(val) {
        this.setearFecha(val);
      }
    }
  },
  methods: {
    checkear(id, hora) {
      if (
        !this.puestoSeleccionado ||
        !this.puestoSeleccionado.id ||
        this.puestoSeleccionado.id !== id ||
        this.puestoSeleccionado.hora !== hora
      ) {
        this.puestoSeleccionado.id = id;
        this.puestoSeleccionado.hora = hora;
        return;
      }
      this.puestoSeleccionado.id = null;
      this.puestoSeleccionado.hora = null;
    },
    hoyActual(date) {
      return date >= this.fechaActual;
    },
    selectTipoCal(tipo) {
      this.setearTipoCal(tipo);
    },
    ...mapMutations("data", ["setearTipoCal", "setearFecha"])
  }
});
</script>

<style lang="scss">
.calendario {
  background-color: #140a26;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  &__agenda-mensual {
    background-color: #164b7d;
    min-height: calc(100vh - 389px - 60px);
    color: #fff;
    display: flex;
    flex-direction: column;
    padding: 20px 40px 100px;
    .q-item.q-item-type.q-item--clickable.q-link.cursor-pointer.q-focusable.q-hoverable {
      border: 1px solid #fff;
      border-radius: 3px;
      height: 50px;
    }
    .q-expansion-item__content {
      padding: 0px 7px;
    }
  }
  &__agregar {
    background-color: #164b7d;
    border: 1px solid #fff;
    border-radius: 100px;
    bottom: 20px;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.04);
    color: #fff;
    font-size: 66px;
    height: 60px;
    left: 0;
    line-height: 0;
    margin-left: auto;
    margin-right: auto;
    outline: none;
    right: 0;
    position: fixed;
    width: 60px;
    &:focus-visible {
      outline: none;
    }
  }
  &__botones {
    display: flex;
    height: 45px;
    margin: 30px 0 20px;
    width: 285px;
    background-color: #fff;
    border-radius: 100px;
  }
  &__cal {
    background-color: #140a26;

    width: 100%;
  }
  &__check {
    font-size: 22px;
    color: #39c4a5;
    margin-right: 5px;
    transition: all 250ms linear;
  }
  &__dia {
    margin-bottom: 0;
  }
  &__fecha {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: #050505;
    margin-bottom: 0;
  }
  &__hora {
    margin-bottom: 0;
  }
  &__mes {
    margin-bottom: 23px;
    line-height: 28px;
    font-size: 24px;
    font-weight: 700;
    text-transform: capitalize;
  }
  &__puesto {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    border-radius: 3px;
    margin: 15px 0;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.04);
    padding: 0 16px 0 10px;
    transform: scale(1);
    transition: transform 200ms linear;
    &--check {
      transform: scale(1.05);
      border: 2px solid #39c4a5;
      transition: all 200ms linear;
    }
  }
  &__puesto-nombre {
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    color: #050505;
    margin-bottom: 0;
    display: flex;
    align-items: center;
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
      transition: all 100ms linear;
    }
  }
  &__uncheck {
    font-size: 22px;
    opacity: 0.37;
    color: #000;
    margin-right: 5px;
    transition: all 250ms linear;
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
      line-height: 16px;
      letter-spacing: 0.76px;
      color: #dfdfe4;
      opacity: 1;
    }
  }
}
</style>
