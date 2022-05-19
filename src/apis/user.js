import request from "./request";

export function login(loginId, loginPwd) {
  return request({
    method: "POST",
    url: "/api/user/login",
    data: {
      loginId,
      loginPwd,
    },
  });
}

export function whoami(token) {
  return request({
    url: "/api/user/whoami",
    method: "post",
    data: { authorization: token },
  });
}