(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-37f23f87"],{4852:function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"p-4 h-100"},[e("el-form",{ref:"ruleForm",staticClass:"flex-fill",attrs:{model:t.formData,rules:t.rules,"label-width":"90px",width:"50%"},on:{submit:function(a){return a.stopPropagation(),a.preventDefault(),t.onSubmit(a)}}},[e("el-form-item",{attrs:{label:"用户名称:",prop:"userName"}},[e("el-input",{attrs:{autocomplete:"off",disabled:"",placeholder:"请输入用户名"},model:{value:t.formData.userName,callback:function(a){t.$set(t.formData,"userName",a)},expression:"formData.userName"}})],1),e("el-form-item",{attrs:{label:"邮箱:",prop:"email"}},[e("el-input",{attrs:{autocomplete:"off",disabled:"",placeholder:"请输入邮箱"},model:{value:t.formData.email,callback:function(a){t.$set(t.formData,"email",a)},expression:"formData.email"}})],1),e("el-form-item",{attrs:{label:"昵称:",prop:"nickName"}},[e("el-input",{attrs:{placeholder:"请输入昵称"},model:{value:t.formData.nickName,callback:function(a){t.$set(t.formData,"nickName",a)},expression:"formData.nickName"}})],1),e("el-form-item",{attrs:{label:"用户头像:",prop:"avatarUrl"}},[e("el-upload",{ref:"uploadRef",class:{hideUpload:!t.isEmpty(t.formData.avatarUrl)},attrs:{action:t.attachApi+"/api/attach/upload","before-upload":t.beforeAvatarUpload,"file-list":t.fileList,headers:t.attachHeaders,limit:1,"on-success":t.handleAvatarSuccess,"list-type":"picture-card"},scopedSlots:t._u([{key:"file",fn:function(a){var i=a.file;return e("div",{},[e("img",{staticClass:"el-upload-list__item-thumbnail",attrs:{src:i.url,alt:""}}),e("span",{staticClass:"el-upload-list__item-actions"},[e("span",{staticClass:"el-upload-list__item-preview",on:{click:function(a){return t.handlePictureCardPreview(i)}}},[e("i",{staticClass:"el-icon-zoom-in"})]),e("span",{staticClass:"el-upload-list__item-delete",on:{click:function(a){return t.handlePictureRemove(i)}}},[e("i",{staticClass:"el-icon-delete"})])])])}}])},[e("i",{staticClass:"el-icon-plus"})]),e("el-dialog",{attrs:{visible:t.imgDialogVisible},on:{"update:visible":function(a){t.imgDialogVisible=a}}},[e("img",{attrs:{src:t.dialogImageUrl,alt:"",width:"100%"}})])],1),e("el-form-item",{attrs:{label:"默认编辑器:",prop:"useMdEdit"}},[e("el-switch",{attrs:{"active-text":"Md编辑器","active-value":"Y","inactive-text":"富文本编辑器","inactive-value":"N"},model:{value:t.formData.useMdEdit,callback:function(a){t.$set(t.formData,"useMdEdit",a)},expression:"formData.useMdEdit"}})],1)],1),e("div",[e("el-button",{staticClass:"flex-fill",attrs:{loading:t.loading,type:"primary"},on:{click:t.onSubmit}},[t._v(t._s(t.loading?"提交中 ...":"保存"))])],1)],1)},r=[],n=(e("99af"),e("c975"),e("8c1b")),o=e("e17e"),l=e("dd9a"),s={props:{visible:{type:Boolean,default:!1},id:{type:String,default:""}},data:function(){return{loading:!1,attachApi:"http://118.31.119.35/badmin",attachHeaders:{Authorization:"".concat(l["e"]," ").concat(this.$store.state.auth.access_token)},fileList:[],imgDialogVisible:!1,dialogImageUrl:"",formData:{id:"",userName:"",email:"",passWord:"",nickName:"",avatarUrl:"",lock:!1,useMdEdit:"N"},rules:{nickName:[{required:!0,message:"请输入昵称",trigger:"blur"}]}}},methods:{isEmpty:n["e"],onSubmit:function(){var t=this;t.loading=!0;var a=t.$store.getters.user;o["a"].updateMyInfo(t.formData).then((function(){t.$store.commit("UPDATE_USER",{userId:a.userId,userName:a.userName,nickName:t.formData.nickName,avatarUrl:t.formData.avatarUrl,isUseMdEdit:"Y"===t.formData.useMdEdit}),t.loading=!1})).catch((function(){t.loading=!1}))},getDetail:function(){var t=this;o["a"].getCurrentUserInfo().then((function(a){t.formData=a.data,Object(n["e"])(t.formData.avatarUrl)||t.fileList.push({url:t.formData.avatarUrl})}))},handleAvatarSuccess:function(t){t&&1===t.success&&(this.formData.avatarUrl=t.url)},beforeAvatarUpload:function(t){var a=["image/jpeg","image/png"," image/jpg"],e=a.indexOf(t.type)>=0,i=t.size/1024/1024<2;return e||this.$message.error("请上传图片!"),i||this.$message.error("上传头像图片大小不能超过 2MB!"),e&&i},handlePictureCardPreview:function(t){this.dialogImageUrl=t.url,this.imgDialogVisible=!0},handlePictureRemove:function(){this.formData.avatarUrl="",this.$refs.uploadRef.clearFiles()}},created:function(){this.getDetail()}},c=s,u=(e("f33a"),e("2877")),d=Object(u["a"])(c,i,r,!1,null,"65d6b90d",null);a["default"]=d.exports},b219:function(t,a,e){},c975:function(t,a,e){"use strict";var i=e("23e7"),r=e("4d64").indexOf,n=e("a640"),o=e("ae40"),l=[].indexOf,s=!!l&&1/[1].indexOf(1,-0)<0,c=n("indexOf"),u=o("indexOf",{ACCESSORS:!0,1:0});i({target:"Array",proto:!0,forced:s||!c||!u},{indexOf:function(t){return s?l.apply(this,arguments)||0:r(this,t,arguments.length>1?arguments[1]:void 0)}})},e17e:function(t,a,e){"use strict";var i=e("c1fb"),r="/admin/api/user";a["a"]={getPage:function(t){return i["a"].post("".concat(r,"/getpage"),t)},add:function(t){return i["a"].post("".concat(r,"/add"),t)},getDetail:function(t){return i["a"].get("".concat(r,"/get/").concat(t))},getCurrentUserInfo:function(){return i["a"].get("".concat(r,"/GetCurrentUserInfo"))},update:function(t){return i["a"].post("".concat(r,"/Update"),t)},updateMyInfo:function(t){return i["a"].post("".concat(r,"/UpdateMyInfo"),t)},del:function(t){return i["a"].del("".concat(r,"/Delete/").concat(t))},changePwd:function(t){return i["a"].get("".concat(r,"/ChangePwd"),t)},changeMyPwd:function(t){return i["a"].get("".concat(r,"/ChangeMyPwd"),t)},checkUserName:function(t){return i["a"].get("".concat(r,"/CheckUserName/").concat(t))},checkEmail:function(t){return i["a"].get("".concat(r,"/CheckEmail/").concat(t))},assignRole:function(t){return i["a"].post("".concat(r,"/AssignRole"),t)},getRoleById:function(t){return i["a"].get("".concat(r,"/GetRoleById/").concat(t))}}},f33a:function(t,a,e){"use strict";e("b219")}}]);
//# sourceMappingURL=chunk-37f23f87.14952c99.js.map