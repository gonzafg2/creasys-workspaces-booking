import { Notify } from "quasar";

export async function userLogin({ commit }, payload) {
  const rut = payload;
  if (rut) {
    commit("guardarLogin", rut);
    Notify.create({
      color: "blue-4",
      textColor: "white",
      icon: "cloud_done",
      message: "Acceso exitoso"
    });
    localStorage.setItem("login", "1");
    return true;
  }
  return;
}
