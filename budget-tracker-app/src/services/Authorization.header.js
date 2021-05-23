export default function authorizationHeader() {
  const dataToken = JSON.parse(localStorage.getItem("dataToken"));
  if (dataToken && dataToken.jwt) {
    return { Authorization: "Bearer " + dataToken.jwt };
  } else {
    return {};
  }
}
