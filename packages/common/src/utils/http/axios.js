import axios from 'axios'
import { MessageBox } from 'element-ui'
import { isUndefined } from 'lodash-es'
import xss from 'xss'
import axiosCanceler from './axiosCancel'
import httpErrorConfig from './httpErrorConfig'

class HttpRequest {
  constructor(options) {
    this.options = options
    this.axiosInstance = axios.create(options)
    this.setupInterceptors()
  }

  setupInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const { params, data, headers } = config
        const {
          authenticationScheme = 'Bearer',
          ignoreCancelToken: ignoreCancelTokenGlobal,
        } = this.options
        const {
          withToken = true,
          isXssTest = true,
          isEncrypt = true,
          ignoreCancelToken,
        } = config

        const ignoreCancel = isUndefined(ignoreCancelToken)
          ? ignoreCancelTokenGlobal
          : ignoreCancelToken

        !ignoreCancel && axiosCanceler.addPending(config)

        const token = 'getToken()'
        if (token && withToken) {
          // jwt token
          headers.Authorization = authenticationScheme
            ? `${authenticationScheme} ${token}`
            : token
        }

        const xssError = '您当前提交的字符可能威胁系统安全，不允许提交！'
        const xssErrorTip = () => {
          MessageBox.confirm(xssError, '警告', {
            showCancelButton: false,
            type: 'warning',
          })
          this.axiosCancel()
        }

        if (params) {
          if (isXssTest !== false && xss(JSON.stringify(params))) {
            xssErrorTip()
            return Promise.reject(xssError)
          }

          isEncrypt !== false && this.encrypt(params)
        }

        if (data) {
          if (isXssTest !== false && xss(JSON.stringify(data))) {
            xssErrorTip()
            return Promise.reject(xssError)
          }

          isEncrypt !== false && this.encrypt(data)
        }

        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )

    this.axiosInstance.interceptors.response.use(
      (res) => {
        return this.decrypt(res)
      },
      (error) => {
        const errorInfo = error.response
        if (errorInfo) {
          const { title, content, type } = httpErrorConfig
          content.forEach((item) => {
            if (item.code === errorInfo.status) {
              MessageBox.confirm(item.tip, title, {
                showCancelButton: false,
                type,
              })
            }
          })
        }
        return Promise.reject(error)
      },
    )
  }

  request(options) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request(options)
        .then((res) => {
          const { isReturnNativeResponse = false } = options
          resolve(isReturnNativeResponse ? res : res.data.data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }

  encrypt(data) {
    return data
  }

  decrypt(data) {
    return data
  }
}

export default HttpRequest
