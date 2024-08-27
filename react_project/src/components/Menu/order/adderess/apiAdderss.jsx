const api_token = localStorage.getItem("token");
const BASE_URL = "https://myres.me/chilis-dev"
// const api_token = localStorage.getItem("api_token");
const API_CITIES = `${BASE_URL}/api/cities`
const API_AREAS = `${BASE_URL}/api/areas?city=`;
// const API_ADDRESS = https://myres.me/chilis/api//profile/address/?api_token=${api_token};
const API_ADDRESS = `${BASE_URL}/api/profile/address?api_token=${api_token}`;
const API_ADD_ADDRESS = `${BASE_URL}/api/profile/address/add?`;
const API_DELETE_ADDRESS = (id) =>
  `${BASE_URL}/profile/address/delete/${id}?api_token=${api_token}`;
export {api_token,API_AREAS,API_CITIES,API_ADDRESS,API_ADD_ADDRESS,API_DELETE_ADDRESS}

