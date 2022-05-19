import request from "./request";

// 获取未完成的订单列表
export function addComment(data) {
  return request({
    url: `/api/comment`,
    method: "post",
    data
  });
}
