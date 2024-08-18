const api_token = localStorage.getItem("token");
const API_CITIES = "https://myres.me/chilis/api/cities";
const API_AREAS = "https://myres.me/chilis/api/areas?city=";
// const API_ADDRESS = https://myres.me/chilis/api//profile/address/?api_token=${api_token};
const API_ADDRESS = `https://myres.me/chilis/api/profile/address?api_token=${api_token}`;
const API_ADD_ADDRESS = `https://myres.me/chilis/api/profile/address/add?`;
const API_DELETE_ADDRESS = (id) =>
  `https://myres.me/chilis/api/profile/address/delete/${id}?api_token=${api_token}`;
export {api_token,API_AREAS,API_CITIES,API_ADDRESS,API_ADD_ADDRESS,API_DELETE_ADDRESS}