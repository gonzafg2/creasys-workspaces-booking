const mes = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre"
];
const dia = [
  "domingo",
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado"
];

export function guardarRegionesComuna(state, payload) {
  state.regionesComuna = payload;
}

export function setearRegion(state, payload) {
  state.region = payload;
}

export function setearComuna(state, payload) {
  state.comuna = payload;
}

export function setearSucursal(state, payload) {
  state.sucursal = payload;
}

export function setearPiso(state, payload) {
  state.piso = payload;
}

export function setearDepartamento(state, payload) {
  state.departamento = payload;
}

export function setearArea(state, payload) {
  state.area = payload;
}

export function setearTipoCal(state, payload) {
  state.tipoCalendario = payload;
}
export function setearFecha(state, payload) {
  if (!payload) return;
  state.fechaSeleccionada = payload;
  const day = payload.slice(8, 10).toString();
  const mesNum = Number(payload.slice(5, 7)).toString();
  const month = mes[mesNum - 1];
  state.hoySeleccionado = `${day} de ${month}`
}

export function limpiarReserva(state) {
  state.region = null;
  state.comuna = null;
  state.sucursal = null;
  state.verDisponibilidad = false;
}
export function setearDiaActual(state, payload) {
  const now = payload;
  const hoy = state.hoy;

  let day = now.getDate();

  const diaNom = dia[now.getDay()];

  if (day >= 1 && day <= 9) day = "0" + day;

  let month = now.getMonth();
  const mesNom = mes[month];
  if (month >= 1 && month <= 9) month = "0" + (month + 1);

  hoy.año = now.getFullYear().toString();
  hoy.mesNum = month;
  hoy.mesNom = mesNom;
  hoy.diaNum = day.toString();
  hoy.diaNom = diaNom;

  state.fechaActual = `${hoy.año}/${hoy.mesNum}/${hoy.diaNum}`;
}
