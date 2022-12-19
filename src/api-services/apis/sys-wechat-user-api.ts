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
import { AdminResultSqlSugarPagedListSysWechatUser } from '../models';
import { DeleteWechatUserInput } from '../models';
import { SysWechatUser } from '../models';
/**
 * SysWechatUserApi - axios parameter creator
 * @export
 */
export const SysWechatUserApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 增加微信用户
         * @param {SysWechatUser} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sysWechatUserAddPost: async (body?: SysWechatUser, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/sysWechatUser/add`;
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
         * @summary 删除微信用户
         * @param {DeleteWechatUserInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sysWechatUserDeletePost: async (body?: DeleteWechatUserInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/sysWechatUser/delete`;
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
         * @summary 获取微信用户列表
         * @param {string} [nickName] 昵称
         * @param {string} [mobile] 手机号码
         * @param {number} [page] 当前页码
         * @param {number} [pageSize] 页码容量
         * @param {string} [field] 排序字段
         * @param {string} [order] 排序方向
         * @param {string} [descStr] 降序排序
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sysWechatUserPageGet: async (nickName?: string, mobile?: string, page?: number, pageSize?: number, field?: string, order?: string, descStr?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/sysWechatUser/page`;
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

            if (nickName !== undefined) {
                localVarQueryParameter['NickName'] = nickName;
            }

            if (mobile !== undefined) {
                localVarQueryParameter['Mobile'] = mobile;
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
         * @summary 更新微信用户
         * @param {SysWechatUser} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sysWechatUserUpdatePost: async (body?: SysWechatUser, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/sysWechatUser/update`;
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
 * SysWechatUserApi - functional programming interface
 * @export
 */
export const SysWechatUserApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 增加微信用户
         * @param {SysWechatUser} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysWechatUserAddPost(body?: SysWechatUser, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await SysWechatUserApiAxiosParamCreator(configuration).sysWechatUserAddPost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 删除微信用户
         * @param {DeleteWechatUserInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysWechatUserDeletePost(body?: DeleteWechatUserInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await SysWechatUserApiAxiosParamCreator(configuration).sysWechatUserDeletePost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 获取微信用户列表
         * @param {string} [nickName] 昵称
         * @param {string} [mobile] 手机号码
         * @param {number} [page] 当前页码
         * @param {number} [pageSize] 页码容量
         * @param {string} [field] 排序字段
         * @param {string} [order] 排序方向
         * @param {string} [descStr] 降序排序
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysWechatUserPageGet(nickName?: string, mobile?: string, page?: number, pageSize?: number, field?: string, order?: string, descStr?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultSqlSugarPagedListSysWechatUser>>> {
            const localVarAxiosArgs = await SysWechatUserApiAxiosParamCreator(configuration).sysWechatUserPageGet(nickName, mobile, page, pageSize, field, order, descStr, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 更新微信用户
         * @param {SysWechatUser} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysWechatUserUpdatePost(body?: SysWechatUser, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await SysWechatUserApiAxiosParamCreator(configuration).sysWechatUserUpdatePost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * SysWechatUserApi - factory interface
 * @export
 */
export const SysWechatUserApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary 增加微信用户
         * @param {SysWechatUser} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysWechatUserAddPost(body?: SysWechatUser, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return SysWechatUserApiFp(configuration).sysWechatUserAddPost(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 删除微信用户
         * @param {DeleteWechatUserInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysWechatUserDeletePost(body?: DeleteWechatUserInput, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return SysWechatUserApiFp(configuration).sysWechatUserDeletePost(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 获取微信用户列表
         * @param {string} [nickName] 昵称
         * @param {string} [mobile] 手机号码
         * @param {number} [page] 当前页码
         * @param {number} [pageSize] 页码容量
         * @param {string} [field] 排序字段
         * @param {string} [order] 排序方向
         * @param {string} [descStr] 降序排序
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysWechatUserPageGet(nickName?: string, mobile?: string, page?: number, pageSize?: number, field?: string, order?: string, descStr?: string, options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultSqlSugarPagedListSysWechatUser>> {
            return SysWechatUserApiFp(configuration).sysWechatUserPageGet(nickName, mobile, page, pageSize, field, order, descStr, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 更新微信用户
         * @param {SysWechatUser} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysWechatUserUpdatePost(body?: SysWechatUser, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return SysWechatUserApiFp(configuration).sysWechatUserUpdatePost(body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * SysWechatUserApi - object-oriented interface
 * @export
 * @class SysWechatUserApi
 * @extends {BaseAPI}
 */
export class SysWechatUserApi extends BaseAPI {
    /**
     * 
     * @summary 增加微信用户
     * @param {SysWechatUser} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysWechatUserApi
     */
    public async sysWechatUserAddPost(body?: SysWechatUser, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return SysWechatUserApiFp(this.configuration).sysWechatUserAddPost(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 删除微信用户
     * @param {DeleteWechatUserInput} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysWechatUserApi
     */
    public async sysWechatUserDeletePost(body?: DeleteWechatUserInput, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return SysWechatUserApiFp(this.configuration).sysWechatUserDeletePost(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 获取微信用户列表
     * @param {string} [nickName] 昵称
     * @param {string} [mobile] 手机号码
     * @param {number} [page] 当前页码
     * @param {number} [pageSize] 页码容量
     * @param {string} [field] 排序字段
     * @param {string} [order] 排序方向
     * @param {string} [descStr] 降序排序
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysWechatUserApi
     */
    public async sysWechatUserPageGet(nickName?: string, mobile?: string, page?: number, pageSize?: number, field?: string, order?: string, descStr?: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultSqlSugarPagedListSysWechatUser>> {
        return SysWechatUserApiFp(this.configuration).sysWechatUserPageGet(nickName, mobile, page, pageSize, field, order, descStr, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 更新微信用户
     * @param {SysWechatUser} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysWechatUserApi
     */
    public async sysWechatUserUpdatePost(body?: SysWechatUser, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return SysWechatUserApiFp(this.configuration).sysWechatUserUpdatePost(body, options).then((request) => request(this.axios, this.basePath));
    }
}
