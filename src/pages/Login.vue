<template>
  <div class="q-pa-md login">
    <p class="login__supertitulo">Hola! Bienvenido a</p>
    <q-img
      class="login__logo"
      src="~/assets/logo-creasys.png"
      spinner-color="white"
    />

    <carruselLogin />

    <q-form @submit="Ingresar">
      <!-- <label class="login__label">Ingresa tu Usuario</label> -->
      <q-input
        bg-color="white"
        class="login__input"
        outlined
        maxlength="30"
        placeholder="Ingresa tu usuario"
        v-model="rut"
      />
      <div>
        <q-btn
          class="login__button"
          style="color: #ffffff;"
          label="Ingresar"
          type="submit"
        />
      </div>
    </q-form>
    <p class="login__ayuda">Ayuda</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import carruselLogin from "../components/CarruselLogin.vue";

export default {
  name: "Login",
  data() {
    return {
      rut: ""
    };
  },
  components: {
    carruselLogin
  },
  methods: {
    async Ingresar() {
      if (!this.rut) {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "Debes ingresar tu RUT para ingresar al sistema"
        });
        return;
      }

      const req = await this.userLogin(this.rut);

      if (!req) {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "Usuario no registrado en sistema"
        });
        return;
      }
      this.$router.push("/");
      return;
    },
    ...mapActions("auth", ["userLogin"])
  }
};
</script>

<style lang="scss">
.login {
  align-items: center;
  background-color: #164b7d;
  background-image: url("~assets/bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  color: white;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  text-align: center;
  &__ayuda {
    font-weight: 700;
    font-size: 11px;
    line-height: 13px;
    letter-spacing: 1px;
    color: #e6e6e6;
    margin-bottom: 0;
  }
  &__button {
    width: 100%;
    height: 56px;
    font-weight: 700;
    font-size: 13px;
    line-height: 15px;
    letter-spacing: 1px;
    background-color: #164b7d;
    border-radius: 3px;
    margin-bottom: 32px;
  }
  &__carrusel {
    font-weight: 400;
    font-size: 13px;
    line-height: 23px;
    margin: 0;
    @media screen and (min-width: 375px) {
      font-size: 15px;
    }
  }
  &__input {
    width: 295px;
    margin-bottom: 40px;
    .q-field__control {
      border-radius: 8px;
    }
    ::placeholder {
      font-weight: 500;
      font-size: 11px;
      line-height: 13px;
      letter-spacing: 1px;
      color: #000000;
    }
  }
  &__label {
    font-weight: 600;
    font-size: 17px;
    line-height: 23px;
    display: flex;
    justify-content: center;
    margin-bottom: 11px;
  }
  &__logo {
    width: 291px;
    height: 41px;
    margin-bottom: 0;
  }
  &__supertitulo {
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    margin: 30px 0;
    @media screen and (min-width: 375px) {
      margin: 30px 0 65px;
    }
  }
}
</style>
