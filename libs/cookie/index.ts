import {
  deleteCookie as del,
  getCookie as get,
  setCookie as set
} from 'cookies-next'
import type { OptionsType } from 'cookies-next/lib/types'

export const getCookie = <T = string>(
  key: string,
  options?: OptionsType
): T => {
  return get(key, options) as T
}

export const setCookie = (
  key: string,
  data: any,
  options?: OptionsType
): void => {
  set(key, data, options)
}

export const deleteCookie = (key: string, options?: OptionsType): void => {
  del(key, options)
}
