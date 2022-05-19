import request from "./request";

// 获取未完成的订单列表
export function findUserOrderList(userId) {
  return request({
    url: `/api/current_order/${userId}`,
    method: "get",
  });
}

// 获取已完成的订单列表
export function findFinishOrderList(userId) {
  return request({
    url: `/api/sales_record/${userId}`,
    method: "get",
  });
}

// 完成订单
export function finishCurrentOrderById(id, data) {
  return request({
    url: `/api/current_order/${id}`,
    method: "post",
    data,
  });
}

// 删除订单
export function deleteOrderById(id) {
  return request({
    url: `/api/current_order/${id}`,
    method: "delete",
  });
}

// 添加订单
export function addOrder(data) {
  return request({
    url: `/api/current_order`,
    method: "post",
    data,
  });
}
