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
import { BlogTypeEnum,BlogStatusEnum } from './blog-enum';
/**
  * 系统访问日志表
  * @export
  * @interface HtBlog
  */
export interface HtBlog {
    /**
      * 雪花Id
      * @type {number}
      * @memberof HtBlog
      */
    id?: number;
    /**
      * 创建时间
      * @type {Date}
      * @memberof HtBlog
      */
    createTime?: Date | null;
    /**
      * 更新时间
      * @type {Date}
      * @memberof HtBlog
      */
    updateTime?: Date | null;
    /**
      * 创建者Id
      * @type {number}
      * @memberof HtBlog
      */
    creatorId?: number | null;
    /**
      * 修改者Id
      * @type {number}
      * @memberof HtBlog
      */
    updaterId?: number | null;
    /**
      * 软删除
      * @type {boolean}
      * @memberof HtBlog
      */
    isDelete?: boolean;
    /**
      * 租户Id
      * @type {number}
      * @memberof HtBlog
      */
    tenantId?: number | null;
    /**
      * 博客标题
      * @type {string}
      * @memberof HtBlog
      */
    title?: string;
    /**
      * 是否使用MarkDown编辑的
      * @type {boolean}
      * @memberof HtBlog
      */
    isMd?: boolean;
    /**
     * 是否使用MarkDown编辑的
     * @type {boolean}
     * @memberof HtBlog
     */
    isTop?: boolean;
    /**
     * 是否允许评论
     * @type {boolean}
     * @memberof HtBlog
     */
    isAllowCmt?: boolean;
    /**
     * 封面图url地址
     * @type {string}
     * @memberof HtBlog
     */
    coverImgUrl?: string | null;
    /**
     * 系统分类id，前端、后端、编程语言等
     * @type {number}
     * @memberof HtBlog
     */
    categoryId?: number;
    /**
     * 博客类型
     * @type {BlogTypeEnum}
     * @memberof HtBlog
     */
    blogType?: BlogTypeEnum;
    /**
     * 转载或者翻译需要有来源链接
     * @type {string}
     * @memberof HtBlog
     */
    sourceLink?: string | null;
    /**
     * 转载或者翻译需要有来源链接
     * @type {BlogStatusEnum}
     * @memberof HtBlog
     */
     status?: BlogStatusEnum;
}
