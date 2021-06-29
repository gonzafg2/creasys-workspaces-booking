import axios from "axios";

export async function getRegionesComuna({ commit }) {
  const url =
    "https://us-central1-apis-varias-mias.cloudfunctions.net/workspaces_booking";
  try {
    const req = await axios(url);
    commit("guardarRegionesComuna", req.data);
  } catch (error) {
    console.log(error);
  }
}
