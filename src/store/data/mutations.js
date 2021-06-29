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

export function limpiarReserva(state) {
  state.region = null;
  state.comuna = null;
  state.sucursal = null;
  state.verDisponibilidad = false;
}
