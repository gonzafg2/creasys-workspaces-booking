export function regiones(state) {
  const regionesComuna = state.regionesComuna;

  const regiones = regionesComuna
    .map(obj => {
      return {
        id: obj.id_region,
        region: obj.region
      };
    })
    .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)
    .sort((a, b) => b.region - a.region);
  return regiones;
}

export function comunas(state) {
  const regiones = state.regionesComuna;
  const region = state.region;

  if (!regiones || !region) return [];
  const comuna = regiones
    .filter(fil => fil.id_region === region.id)
    .map(obj => {
      return {
        id: obj.id_comuna,
        nombre: obj.comuna
      };
    })
    .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)
    .sort((a, b) => a.nombre - b.nombre);
  if (!comuna) return [];
  return comuna;
}

export function sucursales(state) {
  const regiones = state.regionesComuna;
  const comuna = state.comuna;

  if (!regiones || !comuna) return [];
  const sucursal = regiones
    .filter(fil => fil.id_comuna === comuna.id)
    .map(obj => {
      return {
        id: obj.id_sucursal,
        nombre: obj.sucursal,
        direccion: obj.direccion
      };
    })
    .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)
    .sort((a, b) => a.nombre - b.nombre);
  if (!sucursal || (sucursal && sucursal[0].nombre === "Sin Sucursal"))
    return [];
  return sucursal;
}

export function pisos(state) {
  const regiones = state.regionesComuna;
  const sucursal = state.sucursal;
  if (!regiones || !sucursal) return [];

  const piso = regiones
    .filter(fil => fil.id_sucursal === sucursal.id)
    .map(obj => {
      return {
        piso: obj.piso
      };
    })
    .filter((v, i, a) => a.findIndex(t => t.piso === v.piso) === i);
  if (!piso) return [];
  return piso;
}

export function departamentos(state) {
  const regiones = state.regionesComuna;
  const piso = state.piso;
  if (!regiones || !piso) return [];

  const departamento = regiones
    .filter(fil => fil.piso === piso.piso)
    .map(obj => {
      return {
        departamento: obj.departamento
      };
    })
    .filter(
      (v, i, a) => a.findIndex(t => t.departamento === v.departamento) === i
    );
  if (!departamento) return [];
  return departamento;
}
export function areas(state) {
  const regiones = state.regionesComuna;
  const departamento = state.departamento;
  if (!regiones || !departamento) return [];

  const area = regiones
    .filter(fil => fil.departamento === departamento.departamento)
    .map(obj => {
      return {
        area: obj.area
      };
    })
    .filter((v, i, a) => a.findIndex(t => t.area === v.area) === i);
  if (!area) return [];
  return area;
}

export function verDisponibilidad(state) {
  const region = state.region;
  const comuna = state.comuna;
  const sucursal = state.sucursal;
  if (!region || !comuna || !sucursal) return false;
  return true;
}
export function verUbicacion(state) {
  const piso = state.piso;
  const departamento = state.departamento;
  const area = state.area;
  if (!piso || !departamento || !area) return false;
  return true;
}
