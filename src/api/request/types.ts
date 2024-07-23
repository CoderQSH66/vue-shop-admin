import type { AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from 'axios'

/**
 * 通用请求响应接口类型
 */
export interface RequestResopnse<T = any> {
  errorCode?: number
  data: T
  msg: string
}
export interface InterceptorsRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  /** 添加单个请求拦截器 */
  interceptors?: {
    requestSuccess?: (config: InternalAxiosRequestConfig) => any
    requestFail?: (error: any) => any
    responseSuccess?: (response: AxiosResponse<RequestResopnse<T>>) => any
    responceFail?: (error: any) => any
  }
  /** 是否直接返回res.data */
  isRequestData?: boolean
  /** 设置请求头内容 */
  requestType?: 'urlencoded' | 'form' | 'json'
  /** 是否提示 */
  isShowMessage?: boolean
  /** 成功提示信息 */
  successMessage?: string
}
