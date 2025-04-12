import { http } from "@/utils/http";

//获取所有数据项(普通类型)如：airport,auditmethod,company,findingtype
export function getDataItem(url: string, params?: object): Promise<Object> {
  return http.request({
    url: url,
    method: "get",
    params
  });
}

// 新增数据项
export function createDataItem(
  url: string,
  requestBody: object
): Promise<Object> {
  return http.request({
    url: url,
    method: "post",
    data: requestBody // 使用 data 属性发送请求体
  });
}

// 删除数据项
export function deleteDataItem(
  url: string,
  id: string | number
): Promise<Object> {
  return http.request({
    url: `${url}/${id}`, // 构建带有 ID 的 URL
    method: "delete"
  });
}
