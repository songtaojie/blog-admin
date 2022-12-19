/* tslint:disable */
/* eslint-disable */
/**
 * 博客管理
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
 import globalAxios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';
 import { Configuration } from '../../../configuration';
 // Some imports not used depending on template conditions
 // @ts-ignore
 import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../../../base';
 import { ResultSqlSugarPagedListBlog } from '../../models';
 /**
  * BlogApi - axios parameter creator
  * @export
  */
 export const BlogApiAxiosParamCreator = function (configuration?: Configuration) {
     return {
          /**
         * 
         * @summary 获取访问日志分页列表
         * @param {Date} [startTime] 开始时间
         * @param {Date} [endTime] 结束时间
         * @param {number} [page] 当前页码
         * @param {number} [pageSize] 页码容量
         * @param {string} [field] 排序字段
         * @param {string} [order] 排序方向
         * @param {string} [descStr] 降序排序
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        blogPageGet: async (startTime?: Date, endTime?: Date, page?: number, pageSize?: number, field?: string, order?: string, descStr?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/blog/page`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required

            if (startTime !== undefined) {
                localVarQueryParameter['StartTime'] = (startTime as any instanceof Date) ?
                    (startTime as any).toISOString() :
                    startTime;
            }

            if (endTime !== undefined) {
                localVarQueryParameter['EndTime'] = (endTime as any instanceof Date) ?
                    (endTime as any).toISOString() :
                    endTime;
            }

            if (page !== undefined) {
                localVarQueryParameter['Page'] = page;
            }

            if (pageSize !== undefined) {
                localVarQueryParameter['PageSize'] = pageSize;
            }

            if (field !== undefined) {
                localVarQueryParameter['Field'] = field;
            }

            if (order !== undefined) {
                localVarQueryParameter['Order'] = order;
            }

            if (descStr !== undefined) {
                localVarQueryParameter['DescStr'] = descStr;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
     }
 };
 
 /**
  * BlogApi - functional programming interface
  * @export
  */
 export const BlogApiFp = function(configuration?: Configuration) {
     return {
       /**
         * 
         * @summary 获取访问日志分页列表
         * @param {Date} [startTime] 开始时间
         * @param {Date} [endTime] 结束时间
         * @param {number} [page] 当前页码
         * @param {number} [pageSize] 页码容量
         * @param {string} [field] 排序字段
         * @param {string} [order] 排序方向
         * @param {string} [descStr] 降序排序
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async blogPageGet(startTime?: Date, endTime?: Date, page?: number, pageSize?: number, field?: string, order?: string, descStr?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<ResultSqlSugarPagedListBlog>>> {
            const localVarAxiosArgs = await BlogApiAxiosParamCreator(configuration).blogPageGet(startTime, endTime, page, pageSize, field, order, descStr, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
     }
 };
 
 /**
  * BlogApi - factory interface
  * @export
  */
 export const BlogApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
     return {
         /**
         * 
         * @summary 获取访问日志分页列表
         * @param {Date} [startTime] 开始时间
         * @param {Date} [endTime] 结束时间
         * @param {number} [page] 当前页码
         * @param {number} [pageSize] 页码容量
         * @param {string} [field] 排序字段
         * @param {string} [order] 排序方向
         * @param {string} [descStr] 降序排序
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
          async sysLogVisPageGet(startTime?: Date, endTime?: Date, page?: number, pageSize?: number, field?: string, order?: string, descStr?: string, options?: AxiosRequestConfig): Promise<AxiosResponse<ResultSqlSugarPagedListBlog>> {
            return BlogApiFp(configuration).blogPageGet(startTime, endTime, page, pageSize, field, order, descStr, options).then((request) => request(axios, basePath));
        },
     };
 };
 
 /**
  * TenantBusinessApi - object-oriented interface
  * @export
  * @class TenantBusinessApi
  * @extends {BaseAPI}
  */
 export class BlogApi extends BaseAPI {
     /**
     * 
     * @summary 获取访问日志分页列表
     * @param {Date} [startTime] 开始时间
     * @param {Date} [endTime] 结束时间
     * @param {number} [page] 当前页码
     * @param {number} [pageSize] 页码容量
     * @param {string} [field] 排序字段
     * @param {string} [order] 排序方向
     * @param {string} [descStr] 降序排序
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysLogVisApi
     */
      public async blogPageGet(startTime?: Date, endTime?: Date, page?: number, pageSize?: number, field?: string, order?: string, descStr?: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<ResultSqlSugarPagedListBlog>> {
        return BlogApiFp(this.configuration).blogPageGet(startTime, endTime, page, pageSize, field, order, descStr, options).then((request) => request(this.axios, this.basePath));
    }
 }
 