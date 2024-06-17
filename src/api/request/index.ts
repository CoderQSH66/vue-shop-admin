/**
 * 封装通用请求类Request
 */
import { message } from 'ant-design-vue'
import axios from 'axios'

import type { AxiosRequestConfig, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios'

const [messageApi] = message.useMessage()
/**
 * 通用请求响应接口类型
 */
interface RequestResopnse<T = any> {
  error_code: number
  result: T
  reason: string
}
class Request {
  private instance: AxiosInstance

  constructor(public config: AxiosRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)

    // 添加全局请求拦截器
    this.instance.interceptors.request.use(
      (_config: InternalAxiosRequestConfig) => {
        return _config
      },
      (error: any) => {
        return Promise.reject(error)
      }
    )
    // 添加全局响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response
      },
      (error: any) => {
        console.log(error.message)
        messageApi.info(error.message)
        return Promise.reject(error)
      }
    )
  }

  /**
   * request请求
   */
  request<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<RequestResopnse<T>>> {
    return new Promise((reslove, reject) => {
      this.instance
        .request<RequestResopnse<T>>(config)
        .then((res) => {
          reslove(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}
const instance = new Request({
  baseURL: '/api',
  timeout: 1000
})
export default instance
