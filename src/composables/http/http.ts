import type { AxiosError, AxiosRequestConfig } from 'axios'
import {
  type UseQueryOptions,
  type UseMutationOptions,
  useQuery,
  useMutation
} from '@tanstack/vue-query'
import type { ComputedRef, Ref } from 'vue'
import axios from 'axios'
import { Env } from '@/config'

export const http = axios.create({
  baseURL: Env().API_BASE_URL
})

type Config<TData = any, TError = any> = {
  keys?: any[]
  params?: Ref
  httpOptions?: AxiosRequestConfig
  queryOptions?: UseQueryOptions<TData, TError>
}

/**
 * API GET Method request only.
 * @example
    const { data: items, isLoading, isError } = useHttp<number, string>('/', {
      keys: ['id']
      queryOptions: {
        onSuccess: function (data) {
          return
        },
        onError: function (data) {
          data
        },
      },
    })
 * @param url URL API
 * @param options HTTP Mutation Options
 */
export function useHttp<TData = any, TError = any>(
  url: ComputedRef<string> | string,
  options?: Config<TData, TError>
) {
  if (options) {
    const { httpOptions, queryOptions, keys = [], params } = options
    return useQuery(
      [url, params, ...keys],
      async () => {
        try {
          const { data } = await http.get<TData>(unref(url), {
            ...httpOptions,
            params: unref(params)
          })
          return data
        } catch (e: any) {
          Promise.reject(e?.response ?? e)
        }
      },
      queryOptions as any
    )
  }
  return useQuery([url], async () => {
    try {
      const { data } = await http.get<TData>(unref(url))
      return data
    } catch (e: any) {
      Promise.reject(e?.response ?? e)
    }
  })
}

type HttpMutationOptions<TData = any, TError = any, TVariables = any, TContext = any> = {
  method: 'GET' | 'HEAD' | 'POST' | 'OPTIONS' | 'PUT' | 'DELETE' | 'PATCH'
  httpOptions?: AxiosRequestConfig
  queryOptions?: UseMutationOptions<TData, TError, TVariables, TContext>
}

/**
 * Update data to the server.
 * @example
  const {mutate, isLoading, isError, error} =  useHttpMutation<TData, TError>('todos/:id', {
    method: 'POST',
    httpOptions: { // axios options
      timeout: 30000,
    },
    queryOptions: { // vue-query options
      onSuccess: function (data) {
        console.log(data);
      },
      onError: function (data) {
        console.log(data);
      },
    },
    })
    const onSubmitForm = (data) => {
      mutate(data)
    }
 * @param url URL API
 * @param options HTTP Mutation Options
 */
export function useHttpMutation<TData = any, TError = any, TVariables = any>(
  url: string,
  options: HttpMutationOptions<TData, TError>
) {
  return useMutation(
    (value: TVariables) => {
      return new Promise((resolve, reject) => {
        return http
          .request<TData>({
            url: unref(url),
            method: options.method,
            ...options.httpOptions,
            data: value
          })
          .then((response) => {
            resolve(response.data)
          })
          .catch((error: AxiosError<TError>) => {
            reject(error.response ?? error.message)
          })
      })
    },
    { ...options.queryOptions } as any
  )
}
