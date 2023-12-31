/* tslint:disable */
/* eslint-disable */
/**
 * Admin.NET
 * 让 .NET 开发更简单、更通用、更流行。前后端分离架构(.NET6/Vue3)，开箱即用紧随前沿技术。<br/><a href='https://gitee.com/zuohuaijun/Admin.NET/'>https://gitee.com/zuohuaijun/Admin.NET</a>
 *
 * OpenAPI spec version: 1.0.0
 * Contact: 515096995@qq.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import globalAxios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
import { AddDictTypeInput } from '../models';
import { AdminResultListSysDictData } from '../models';
import { AdminResultListSysDictType } from '../models';
import { AdminResultSqlSugarPagedListSysDictType } from '../models';
import { AdminResultSysDictType } from '../models';
import { DeleteDictTypeInput } from '../models';
import { DictTypeInput } from '../models';
import { StatusEnum } from '../models';
import { UpdateDictTypeInput } from '../models';
/**
 * SysDictTypeApi - axios parameter creator
 * @export
 */
export const SysDictTypeApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 添加字典类型
         * @param {AddDictTypeInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sysDictTypeAddPost: async (body?: AddDictTypeInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/sysDictType/add`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required

            localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';

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
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 修改字典类型状态
         * @param {DictTypeInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sysDictTypeChangeStatusPost: async (body?: DictTypeInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/sysDictType/changeStatus`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required

            localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';

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
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 获取字典类型-值列表
         * @param {string} code 编码
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sysDictTypeDataListGet: async (code: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'code' is not null or undefined
            if (code === null || code === undefined) {
                throw new RequiredError('code','Required parameter code was null or undefined when calling sysDictTypeDataListGet.');
            }
            const localVarPath = `/sysDictType/dataList`;
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

            if (code !== undefined) {
                localVarQueryParameter['Code'] = code;
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
        /**
         * 
         * @summary 删除字典类型
         * @param {DeleteDictTypeInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sysDictTypeDeletePost: async (body?: DeleteDictTypeInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/sysDictType/delete`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required

            localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';

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
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 获取字典类型详情
         * @param {number} id 主键Id
         * @param {StatusEnum} [status] 状态
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sysDictTypeDetailGet: async (id: number, status?: StatusEnum, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling sysDictTypeDetailGet.');
            }
            const localVarPath = `/sysDictType/detail`;
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

            if (status !== undefined) {
                localVarQueryParameter['Status'] = status;
            }

            if (id !== undefined) {
                localVarQueryParameter['Id'] = id;
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
        /**
         * 
         * @summary 获取字典类型列表
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sysDictTypeListGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/sysDictType/list`;
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
        /**
         * 
         * @summary 获取字典类型分页列表
         * @param {string} [name] 名称
         * @param {string} [code] 编码
         * @param {number} [page] 当前页码
         * @param {number} [pageSize] 页码容量
         * @param {string} [field] 排序字段
         * @param {string} [order] 排序方向
         * @param {string} [descStr] 降序排序
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sysDictTypePageGet: async (name?: string, code?: string, page?: number, pageSize?: number, field?: string, order?: string, descStr?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/sysDictType/page`;
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

            if (name !== undefined) {
                localVarQueryParameter['Name'] = name;
            }

            if (code !== undefined) {
                localVarQueryParameter['Code'] = code;
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
        /**
         * 
         * @summary 更新字典类型
         * @param {UpdateDictTypeInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sysDictTypeUpdatePost: async (body?: UpdateDictTypeInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/sysDictType/update`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required

            localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';

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
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * SysDictTypeApi - functional programming interface
 * @export
 */
export const SysDictTypeApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 添加字典类型
         * @param {AddDictTypeInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysDictTypeAddPost(body?: AddDictTypeInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await SysDictTypeApiAxiosParamCreator(configuration).sysDictTypeAddPost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 修改字典类型状态
         * @param {DictTypeInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysDictTypeChangeStatusPost(body?: DictTypeInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await SysDictTypeApiAxiosParamCreator(configuration).sysDictTypeChangeStatusPost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 获取字典类型-值列表
         * @param {string} code 编码
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysDictTypeDataListGet(code: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultListSysDictData>>> {
            const localVarAxiosArgs = await SysDictTypeApiAxiosParamCreator(configuration).sysDictTypeDataListGet(code, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 删除字典类型
         * @param {DeleteDictTypeInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysDictTypeDeletePost(body?: DeleteDictTypeInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await SysDictTypeApiAxiosParamCreator(configuration).sysDictTypeDeletePost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 获取字典类型详情
         * @param {number} id 主键Id
         * @param {StatusEnum} [status] 状态
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysDictTypeDetailGet(id: number, status?: StatusEnum, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultSysDictType>>> {
            const localVarAxiosArgs = await SysDictTypeApiAxiosParamCreator(configuration).sysDictTypeDetailGet(id, status, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 获取字典类型列表
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysDictTypeListGet(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultListSysDictType>>> {
            const localVarAxiosArgs = await SysDictTypeApiAxiosParamCreator(configuration).sysDictTypeListGet(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 获取字典类型分页列表
         * @param {string} [name] 名称
         * @param {string} [code] 编码
         * @param {number} [page] 当前页码
         * @param {number} [pageSize] 页码容量
         * @param {string} [field] 排序字段
         * @param {string} [order] 排序方向
         * @param {string} [descStr] 降序排序
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysDictTypePageGet(name?: string, code?: string, page?: number, pageSize?: number, field?: string, order?: string, descStr?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultSqlSugarPagedListSysDictType>>> {
            const localVarAxiosArgs = await SysDictTypeApiAxiosParamCreator(configuration).sysDictTypePageGet(name, code, page, pageSize, field, order, descStr, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 更新字典类型
         * @param {UpdateDictTypeInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysDictTypeUpdatePost(body?: UpdateDictTypeInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await SysDictTypeApiAxiosParamCreator(configuration).sysDictTypeUpdatePost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * SysDictTypeApi - factory interface
 * @export
 */
export const SysDictTypeApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary 添加字典类型
         * @param {AddDictTypeInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysDictTypeAddPost(body?: AddDictTypeInput, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return SysDictTypeApiFp(configuration).sysDictTypeAddPost(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 修改字典类型状态
         * @param {DictTypeInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysDictTypeChangeStatusPost(body?: DictTypeInput, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return SysDictTypeApiFp(configuration).sysDictTypeChangeStatusPost(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 获取字典类型-值列表
         * @param {string} code 编码
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysDictTypeDataListGet(code: string, options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultListSysDictData>> {
            return SysDictTypeApiFp(configuration).sysDictTypeDataListGet(code, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 删除字典类型
         * @param {DeleteDictTypeInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysDictTypeDeletePost(body?: DeleteDictTypeInput, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return SysDictTypeApiFp(configuration).sysDictTypeDeletePost(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 获取字典类型详情
         * @param {number} id 主键Id
         * @param {StatusEnum} [status] 状态
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysDictTypeDetailGet(id: number, status?: StatusEnum, options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultSysDictType>> {
            return SysDictTypeApiFp(configuration).sysDictTypeDetailGet(id, status, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 获取字典类型列表
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysDictTypeListGet(options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultListSysDictType>> {
            return SysDictTypeApiFp(configuration).sysDictTypeListGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 获取字典类型分页列表
         * @param {string} [name] 名称
         * @param {string} [code] 编码
         * @param {number} [page] 当前页码
         * @param {number} [pageSize] 页码容量
         * @param {string} [field] 排序字段
         * @param {string} [order] 排序方向
         * @param {string} [descStr] 降序排序
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysDictTypePageGet(name?: string, code?: string, page?: number, pageSize?: number, field?: string, order?: string, descStr?: string, options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultSqlSugarPagedListSysDictType>> {
            return SysDictTypeApiFp(configuration).sysDictTypePageGet(name, code, page, pageSize, field, order, descStr, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 更新字典类型
         * @param {UpdateDictTypeInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysDictTypeUpdatePost(body?: UpdateDictTypeInput, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return SysDictTypeApiFp(configuration).sysDictTypeUpdatePost(body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * SysDictTypeApi - object-oriented interface
 * @export
 * @class SysDictTypeApi
 * @extends {BaseAPI}
 */
export class SysDictTypeApi extends BaseAPI {
    /**
     * 
     * @summary 添加字典类型
     * @param {AddDictTypeInput} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysDictTypeApi
     */
    public async sysDictTypeAddPost(body?: AddDictTypeInput, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return SysDictTypeApiFp(this.configuration).sysDictTypeAddPost(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 修改字典类型状态
     * @param {DictTypeInput} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysDictTypeApi
     */
    public async sysDictTypeChangeStatusPost(body?: DictTypeInput, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return SysDictTypeApiFp(this.configuration).sysDictTypeChangeStatusPost(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 获取字典类型-值列表
     * @param {string} code 编码
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysDictTypeApi
     */
    public async sysDictTypeDataListGet(code: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultListSysDictData>> {
        return SysDictTypeApiFp(this.configuration).sysDictTypeDataListGet(code, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 删除字典类型
     * @param {DeleteDictTypeInput} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysDictTypeApi
     */
    public async sysDictTypeDeletePost(body?: DeleteDictTypeInput, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return SysDictTypeApiFp(this.configuration).sysDictTypeDeletePost(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 获取字典类型详情
     * @param {number} id 主键Id
     * @param {StatusEnum} [status] 状态
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysDictTypeApi
     */
    public async sysDictTypeDetailGet(id: number, status?: StatusEnum, options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultSysDictType>> {
        return SysDictTypeApiFp(this.configuration).sysDictTypeDetailGet(id, status, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 获取字典类型列表
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysDictTypeApi
     */
    public async sysDictTypeListGet(options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultListSysDictType>> {
        return SysDictTypeApiFp(this.configuration).sysDictTypeListGet(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 获取字典类型分页列表
     * @param {string} [name] 名称
     * @param {string} [code] 编码
     * @param {number} [page] 当前页码
     * @param {number} [pageSize] 页码容量
     * @param {string} [field] 排序字段
     * @param {string} [order] 排序方向
     * @param {string} [descStr] 降序排序
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysDictTypeApi
     */
    public async sysDictTypePageGet(name?: string, code?: string, page?: number, pageSize?: number, field?: string, order?: string, descStr?: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultSqlSugarPagedListSysDictType>> {
        return SysDictTypeApiFp(this.configuration).sysDictTypePageGet(name, code, page, pageSize, field, order, descStr, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 更新字典类型
     * @param {UpdateDictTypeInput} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysDictTypeApi
     */
    public async sysDictTypeUpdatePost(body?: UpdateDictTypeInput, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return SysDictTypeApiFp(this.configuration).sysDictTypeUpdatePost(body, options).then((request) => request(this.axios, this.basePath));
    }
}
