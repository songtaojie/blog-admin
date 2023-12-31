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
import { AdminResultInt32 } from '../models';
import { AdminResultListString } from '../models';
import { AdminResultObject } from '../models';
import { TimeSpan } from '../models';
/**
 * SysCacheApi - axios parameter creator
 * @export
 */
export const SysCacheApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 增加缓存并设置过期时间
         * @param {any} [body] 
         * @param {string} [key] 
         * @param {TimeSpan} [expire] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sysCacheAddExpirePost: async (body?: any, key?: string, expire?: TimeSpan, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/sysCache/add/expire`;
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

            if (key !== undefined) {
                localVarQueryParameter['key'] = key;
            }

            if (expire !== undefined) {
                localVarQueryParameter['expire'] = expire;
            }

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
         * @summary 增加缓存
         * @param {any} [body] 
         * @param {string} [key] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sysCacheAddPost: async (body?: any, key?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/sysCache/add`;
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

            if (key !== undefined) {
                localVarQueryParameter['key'] = key;
            }

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
         * @summary 根据键名前缀删除缓存
         * @param {string} [prefixKey] 键名前缀
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sysCacheDelByParentKeyPost: async (prefixKey?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/sysCache/delByParentKey`;
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

            if (prefixKey !== undefined) {
                localVarQueryParameter['prefixKey'] = prefixKey;
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
         * @summary 删除缓存
         * @param {string} [key] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sysCacheDeletePost: async (key?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/sysCache/delete`;
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

            if (key !== undefined) {
                localVarQueryParameter['key'] = key;
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
         * @summary 获取所有缓存键名
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sysCacheKeyListGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/sysCache/keyList`;
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
         * @summary 获取缓存值
         * @param {string} [key] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sysCacheValueGet: async (key?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/sysCache/value`;
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

            if (key !== undefined) {
                localVarQueryParameter['key'] = key;
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
 * SysCacheApi - functional programming interface
 * @export
 */
export const SysCacheApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 增加缓存并设置过期时间
         * @param {any} [body] 
         * @param {string} [key] 
         * @param {TimeSpan} [expire] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysCacheAddExpirePost(body?: any, key?: string, expire?: TimeSpan, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await SysCacheApiAxiosParamCreator(configuration).sysCacheAddExpirePost(body, key, expire, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 增加缓存
         * @param {any} [body] 
         * @param {string} [key] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysCacheAddPost(body?: any, key?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await SysCacheApiAxiosParamCreator(configuration).sysCacheAddPost(body, key, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 根据键名前缀删除缓存
         * @param {string} [prefixKey] 键名前缀
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysCacheDelByParentKeyPost(prefixKey?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultInt32>>> {
            const localVarAxiosArgs = await SysCacheApiAxiosParamCreator(configuration).sysCacheDelByParentKeyPost(prefixKey, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 删除缓存
         * @param {string} [key] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysCacheDeletePost(key?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await SysCacheApiAxiosParamCreator(configuration).sysCacheDeletePost(key, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 获取所有缓存键名
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysCacheKeyListGet(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultListString>>> {
            const localVarAxiosArgs = await SysCacheApiAxiosParamCreator(configuration).sysCacheKeyListGet(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 获取缓存值
         * @param {string} [key] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysCacheValueGet(key?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultObject>>> {
            const localVarAxiosArgs = await SysCacheApiAxiosParamCreator(configuration).sysCacheValueGet(key, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * SysCacheApi - factory interface
 * @export
 */
export const SysCacheApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary 增加缓存并设置过期时间
         * @param {any} [body] 
         * @param {string} [key] 
         * @param {TimeSpan} [expire] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysCacheAddExpirePost(body?: any, key?: string, expire?: TimeSpan, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return SysCacheApiFp(configuration).sysCacheAddExpirePost(body, key, expire, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 增加缓存
         * @param {any} [body] 
         * @param {string} [key] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysCacheAddPost(body?: any, key?: string, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return SysCacheApiFp(configuration).sysCacheAddPost(body, key, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 根据键名前缀删除缓存
         * @param {string} [prefixKey] 键名前缀
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysCacheDelByParentKeyPost(prefixKey?: string, options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultInt32>> {
            return SysCacheApiFp(configuration).sysCacheDelByParentKeyPost(prefixKey, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 删除缓存
         * @param {string} [key] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysCacheDeletePost(key?: string, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return SysCacheApiFp(configuration).sysCacheDeletePost(key, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 获取所有缓存键名
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysCacheKeyListGet(options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultListString>> {
            return SysCacheApiFp(configuration).sysCacheKeyListGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 获取缓存值
         * @param {string} [key] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysCacheValueGet(key?: string, options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultObject>> {
            return SysCacheApiFp(configuration).sysCacheValueGet(key, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * SysCacheApi - object-oriented interface
 * @export
 * @class SysCacheApi
 * @extends {BaseAPI}
 */
export class SysCacheApi extends BaseAPI {
    /**
     * 
     * @summary 增加缓存并设置过期时间
     * @param {any} [body] 
     * @param {string} [key] 
     * @param {TimeSpan} [expire] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysCacheApi
     */
    public async sysCacheAddExpirePost(body?: any, key?: string, expire?: TimeSpan, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return SysCacheApiFp(this.configuration).sysCacheAddExpirePost(body, key, expire, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 增加缓存
     * @param {any} [body] 
     * @param {string} [key] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysCacheApi
     */
    public async sysCacheAddPost(body?: any, key?: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return SysCacheApiFp(this.configuration).sysCacheAddPost(body, key, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 根据键名前缀删除缓存
     * @param {string} [prefixKey] 键名前缀
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysCacheApi
     */
    public async sysCacheDelByParentKeyPost(prefixKey?: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultInt32>> {
        return SysCacheApiFp(this.configuration).sysCacheDelByParentKeyPost(prefixKey, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 删除缓存
     * @param {string} [key] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysCacheApi
     */
    public async sysCacheDeletePost(key?: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return SysCacheApiFp(this.configuration).sysCacheDeletePost(key, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 获取所有缓存键名
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysCacheApi
     */
    public async sysCacheKeyListGet(options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultListString>> {
        return SysCacheApiFp(this.configuration).sysCacheKeyListGet(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 获取缓存值
     * @param {string} [key] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysCacheApi
     */
    public async sysCacheValueGet(key?: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultObject>> {
        return SysCacheApiFp(this.configuration).sysCacheValueGet(key, options).then((request) => request(this.axios, this.basePath));
    }
}
