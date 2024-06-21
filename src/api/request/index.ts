/**
 * 封装通用请求类Request
 */

import { message as $message } from 'ant-design-vue'
import axios from 'axios'

import { local } from '@/utils/Storage'

import type { RequestResopnse, InterceptorsRequestConfig } from './types'
import type { AxiosRequestConfig, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios'

class Request {
  private instance: AxiosInstance

  private defaultConfig: AxiosRequestConfig = {
    timeout: 6000
  }

  private UNKNOWN_ERROR = '未知错误'

  constructor(public config?: AxiosRequestConfig) {
    const newConfig = Object.assign(this.defaultConfig, this.config)
    // 创建axios实例
    this.instance = axios.create(newConfig)

    // 添加全局请求拦截器
    this.instance.interceptors.request.use(
      (_config: InternalAxiosRequestConfig) => {
        local.get('i-token') && (_config.headers.token = local.get('i-token'))
        return _config
      },
      (error: any) => {
        return Promise.reject(error)
      }
    )

    // 添加全局响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse<RequestResopnse>) => {
        const { data } = response

        if (data.errorCode && data.errorCode !== 200) {
          $message.error(data.msg || this.UNKNOWN_ERROR)
          return Promise.reject(data.msg)
        }
        $message.success(data.msg)
        return response
      },
      (error: any) => {
        console.log(error)
        $message.error(error.message)
        return Promise.reject(error)
      }
    )
  }

  /**
   * request请求
   */
  request<T = any>(config: InterceptorsRequestConfig<T> & { isRequestData: true }): Promise<RequestResopnse<T>>

  request<T = any>(config: InterceptorsRequestConfig<T>): Promise<AxiosResponse<RequestResopnse<T>>>

  request<T = any>(config: InterceptorsRequestConfig<T>) {
    /** 自定义请求拦截 */
    if (config.interceptors?.requestSuccess) {
      config = config.interceptors.requestSuccess(config as InternalAxiosRequestConfig)
    }
    return new Promise((reslove, reject) => {
      const { isRequestData = false, requestType = 'json', ...rest } = config

      const headers =
        requestType === 'form'
          ? { 'Content-Type': 'multipart/form-data' }
          : requestType === 'urlencoded'
            ? { 'Content-Type': 'application/x-www-form-urlencoded' }
            : {}

      this.instance
        .request<RequestResopnse<T>>({
          ...rest,
          headers: {
            ...headers,
            ...rest.headers
          }
        })
        .then((res) => {
          /** 自定义响应拦截 */
          if (config.interceptors?.responseSuccess) {
            res = config.interceptors.responseSuccess(res)
          }
          if (!isRequestData) {
            reslove(res)
          }
          reslove(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  /**
   * get请求
   */
  get<T = any>(url: string, params?: any, config?: InterceptorsRequestConfig<T>) {
    return this.request({
      method: 'get',
      url,
      params,
      ...config
    })
  }

  /**
   * post请求
   */
  post<T = any>(url: string, data?: any, config?: InterceptorsRequestConfig<T>) {
    return this.request({
      method: 'post',
      url,
      data,
      ...config
    })
  }
}
const instance = new Request({
  timeout: 1000,
  baseURL: '/api'
})
export default instance
