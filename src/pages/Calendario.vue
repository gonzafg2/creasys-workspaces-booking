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
        color="deep-purple-4"
        flat
        :events="diasSeleccionados"
        minimal
        v-model="fecha"
        :options="hoyActual"
      />
    </div>

    <div class="calendario__agenda-mensual">
      <p v-if="!hoySeleccionado" class="calendario__mes">
        {{ hoy.diaNum }} <span class="text-lowercase">de</span> {{ hoy.mesNom }}
      </p>
      <p v-else class="calendario__mes">{{ hoySeleccionado }}</p>

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
            @click="checkear(puesto.id, horario.hora, fecha)"
            class="calendario__puesto"
            :class="{
              'calendario__puesto--check': select(
                puesto.id,
                horario.hora,
                fecha
              )
            }"
            v-for="horario in horarios"
            :key="horario.id"
          >
            <p class="calendario__puesto-nombre">
              <q-icon
                :name="
                  select(puesto.id, horario.hora, fecha)
                    ? 'check_circle'
                    : 'check_circle_outline'
                "
                :class="
                  select(puesto.id, horario.hora, fecha)
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

      <button
        @click="agregarSeleccion"
        class="calendario__agregar"
        :disabled="puestosSeleccionados && puestosSeleccionados.length === 0"
      >
        +
      </button>

      <q-dialog v-model="confirm" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <span class="q-ml-sm q-mb-md text-bold"
              >¿Estás seguro de solicitar tu selección?</span
            >

            <p
              class="q-ml-md q-mb-sm"
              v-for="puesto in puestosSeleccionados"
              :key="puesto.idPuesto"
            >
              - Fecha: {{ puesto.fecha }} | Hora: {{ puesto.hora }}
            </p>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="negative" v-close-popup />
            <q-btn
              flat
              label="Aceptar"
              color="primary"
              @click="alert = true"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="alert">
        <q-card>
          <q-card-section>
            <p class="q-ml-sm q-mb-md text-bold">
              Se ha solicitado satisfactoriamente lo siguiente:
            </p>
            <p
              class="q-ml-md q-mb-sm"
              v-for="puesto in puestosSeleccionados"
              :key="puesto.idPuesto"
            >
              - Fecha: {{ puesto.fecha }} | Hora: {{ puesto.hora }}
            </p>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              @click="salir"
              flat
              label="OK"
              color="primary"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
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
      puestosSeleccionados: [],
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
      ],
      confirm: false,
      alert: false
    };
  },
  computed: {
    ...mapState("data", [
      "tipoCalendario",
      "fechaActual",
      "fechaSeleccionada",
      "hoy",
      "hoySeleccionado"
    ]),
    ...mapGetters("data", ["puestos"]),
    fecha: {
      get: function() {
        return this.fechaSeleccionada || this.fechaActual;
      },
      set: function(val) {
        this.setearFecha(val);
      }
    },
    diasSeleccionados() {
      return this.puestosSeleccionados.map(m => m.fecha) || [];
    }
  },
  methods: {
    checkear(id, hora, fecha) {
      const finder = this.puestosSeleccionados.find(
        f => f.hora === hora && f.fecha === fecha && f.idPuesto === id
      );
      if (finder) {
        const index = this.puestosSeleccionados.indexOf(finder);
        this.puestosSeleccionados.splice(index, 1);
        return;
      }
      this.puestosSeleccionados.push({ idPuesto: id, hora, fecha });
    },
    select(id, hora, fecha) {
      const selected = this.puestosSeleccionados.find(
        f => f.idPuesto === id && f.fecha === fecha && f.hora === hora
      );
      return selected ? true : false;
    },
    hoyActual(date) {
      return date >= this.fechaActual;
    },
    selectTipoCal(tipo) {
      this.setearTipoCal(tipo);
    },
    ...mapMutations("data", ["setearTipoCal", "setearFecha"]),
    agregarSeleccion() {
      this.confirm = true;
    },
    salir() {
      localStorage.clear();
      this.$router.push("/");
    }
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
