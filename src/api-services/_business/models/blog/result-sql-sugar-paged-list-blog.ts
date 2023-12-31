/* tslint:disable */
/* eslint-disable */
/**
 * Hx.Blog
 * 让 .NET 开发更简单、更通用、更流行。前后端分离架构(.NET6/Vue3)，开箱即用紧随前沿技术。<br/><a href='https://gitee.com/zuohuaijun/Admin.NET/'>https://gitee.com/zuohuaijun/Admin.NET</a>
 *
 * OpenAPI spec version: 1.0.0
 * Contact: 515096995@qq.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import {HtBlog} from './HtBlog'
 
 /**
  * 分页泛型集合
  * @export
  * @interface SqlSugarPagedListBlog
  */
 export interface SqlSugarPagedListBlog {
     /**
      * 页码
      * @type {number}
      * @memberof SqlSugarPagedListBlog
      */
     page?: number;
     /**
      * 页容量
      * @type {number}
      * @memberof SqlSugarPagedListBlog
      */
     pageSize?: number;
     /**
      * 总条数
      * @type {number}
      * @memberof SqlSugarPagedListBlog
      */
     total?: number;
     /**
      * 总页数
      * @type {number}
      * @memberof SqlSugarPagedListBlog
      */
     totalPages?: number;
     /**
      * 当前页集合
      * @type {Array<HtBlog>}
      * @memberof SqlSugarPagedListBlog
      */
     items?: Array<HtBlog> | null;
     /**
      * 是否有上一页
      * @type {boolean}
      * @memberof SqlSugarPagedListBlog
      */
     hasPrevPage?: boolean;
     /**
      * 是否有下一页
      * @type {boolean}
      * @memberof SqlSugarPagedListBlog
      */
     hasNextPage?: boolean;
 }
 
 /**
  * 全局返回结果
  * @export
  * @interface ResultSqlSugarPagedListBlog
  */
 export interface ResultSqlSugarPagedListBlog {
     /**
      * 状态码
      * @type {number}
      * @memberof ResultSqlSugarPagedListBlog
      */
     code?: number;
     /**
      * 类型success、warning、error
      * @type {string}
      * @memberof ResultSqlSugarPagedListBlog
      */
     type?: string | null;
     /**
      * 错误信息
      * @type {string}
      * @memberof ResultSqlSugarPagedListBlog
      */
     message?: string | null;
     /**
      * 
      * @type {SqlSugarPagedListBlog}
      * @memberof ResultSqlSugarPagedListBlog
      */
     result?: SqlSugarPagedListBlog;
     /**
      * 附加数据
      * @type {any}
      * @memberof ResultSqlSugarPagedListBlog
      */
     extras?: any | null;
     /**
      * 时间
      * @type {Date}
      * @memberof ResultSqlSugarPagedListBlog
      */
     time?: Date;
 }
 