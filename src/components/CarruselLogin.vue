<template>
  <q-carousel
    animated
    arrows
    class="bg-transparent text-white rounded-borders"
    control-color="white"
    control-type="flat"
    height="200px"
    infinite
    navigation
    padding
    swipeable
    v-model="slide"
  >
    <q-carousel-slide name="simple" class="column no-wrap justify-end">
      <div class="text-center text-white login__carrusel">
        Ahora es más simple reservar tu puesto de trabajo. Te ayudamos a agendar fácilmente.
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>

<script>
export default {
  name: "Carrusel",
  data() {
    return {
      slide: "simple",
    };
  },
};
</script>

<style>

</style>
