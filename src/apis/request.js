import axios from "axios";
import JsCookie from "js-cookie";

axios.interceptors.response.use((resp) => {
  const authorization = resp.headers.authorization;

  if (authorization) {
    JsCookie.set("authorization", authorization);
  }

  return resp.data;
});

export default axios;
