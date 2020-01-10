import axios from "services/defaultClient";

const COUNTRY_URL = "global/countries";

export const getCountryData = async () => {
  return axios.get(COUNTRY_URL).then(resp => {
    const data = resp.data;
    return data;
  });
};

export const getSubdivisionData = async countryCode => {
  const url = `${COUNTRY_URL}/${countryCode}`;

  return axios.get(url).then(resp => resp.data);
};
// export const postSupplyGroup = async shopGroupName => {
//   const requestBody = {
//     name: shopGroupName
//   };
//   return axios.post(SUPPLY_GROUP_URL, requestBody).then(resp => {
//     console.log(resp);
//     console.log(resp.data);
//     return resp.data;
//   });
// };
