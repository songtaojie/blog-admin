<template>
  <div class="hx-editor bg-white py-1 px-2">
    <el-form :model="formData" :rules="rules" ref="editForm">
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item prop="title">
            <el-input placeholder="文章标题,请控制在100字以内" v-model="formData.title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="categoryId">
            <hx-select api="/admin/api/enum/getcategorylist" placeholder="请选择文章分类" v-model="formData.categoryId"></hx-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-row>
          <el-col>
            <el-upload
              :action="attachApi + '/api/attach/upload'"
              :data="attachData"
              :file-list="fileList"
              :headers="attachHeaders"
              :limit="1"
              :on-exceed="handlePictureExceed"
              :on-success="handlePictureSuccess"
              class="hx-upload d-flex flex-row-reverse justify-content-end align-items-center"
              drag
              list-type="picture-card"
              ref="uploadRef"
            >
              <div slot="default">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  封面图，拖拽或
                  <em>点击上传</em>
                  <br />
                  <small>只能上传jpg/png文件，且不超过2M</small>
                </div>
              </div>
              <div slot="file" slot-scope="{file}">
                <img :src="file.url" alt class="el-upload-list__item-thumbnail" />
                <span class="el-upload-list__item-actions">
                  <span @click="handlePictureCardPreview(file)" class="el-upload-list__item-preview">
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span @click="handlePictureRemove(file)" class="el-upload-list__item-delete">
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img :src="dialogImageUrl" alt width="100%" />
            </el-dialog>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-col v-if="isUseMdEdit">
            <md-edit @getHtml="getHtml" v-model="formData.content"></md-edit>
          </el-col>
          <el-col v-else>
            <ck-edit @getHtml="getHtml" v-model="formData.content"></ck-edit>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-col :span="12">
            <label class="text-left mb-0 blog-category-label">文章标签：</label>
            <el-checkbox-group class="d-flex flex-wrap justify-content-start align-items-start" v-model="formData.blogTags">
              <el-checkbox :key="tag.id" :label="tag.id" border v-for="tag in tagList">{{tag.name}}</el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="文章类型:">
        <el-row>
          <el-col :sm="8" :xs="24">
            <el-select placeholder="请选择文章类型" v-model="formData.blogType">
              <el-option :value="0" label="原创"></el-option>
              <el-option :value="1" label="转载"></el-option>
              <el-option :value="2" label="翻译"></el-option>
            </el-select>
          </el-col>
          <el-col :sm="8" :xs="24">
            <label class="text-left mb-0 blog-category-label">文章设置：</label>
            <el-checkbox false-label="N" true-label="Y" v-model="formData.isTop">置顶</el-checkbox>
            <el-checkbox false-label="N" true-label="Y" v-model="formData.canCmt">允许评论</el-checkbox>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="原文链接:" v-if="formData.blogType !== 0">
        <el-row>
          <el-col :sm="12" :xs="24">
            <el-input placeholder="请输入转载/翻译原文链接" v-model="formData.sourceLink"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-col class="text-left">
            <el-button :disabled="loading" @click="handleSubmit('Y')" type="success">{{loading?"保存中...":"发布文章"}}</el-button>
            <el-button :disabled="loading" @click="handleSubmit('N')" type="info">{{loading?"保存中...":"保存草稿"}}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { isEmpty, formHex } from '../../common/index'
import HxSelect from '@/components/HxSelect.vue'
import blogApi from '../../api/admin/blogmanage.js'
import { TOKEN_TYPE } from '../../common/constkey'
export default {
  name: 'edit',
  components: {
    CkEdit: resolve => require(['./ckedit.vue'], resolve),
    MdEdit: resolve => require(['./mdedit.vue'], resolve),
    HxSelect
  },
  data() {
    var isUseMdEdit = this.$store.getters.user.isUseMdEdit
    return {
      title: '写博客-海·星の博客',
      attachHeaders: {
        Authorization: `${TOKEN_TYPE} ${this.$store.state.auth.token}`
      }, // 上传的头信息
      dialogVisible: false,
      dialogImageUrl: '',
      fileList: [],
      tagList: [],
      loading: false,
      attachApi: process.env.VUE_APP_ATTACH_API,
      isUseMdEdit: isUseMdEdit === true, // 是否是markdown编辑器
      formData: {
        id: '',
        markDown: isUseMdEdit ? 'Y' : 'N',
        blogType: 0,
        sourceLink: '',
        categoryId: null,
        coverImgUrl: '',
        title: '',
        isTop: 'N',
        canCmt: 'Y',
        content: '',
        contentHtml: '',
        publish: 'N',
        blogTags: []
      },
      attachData: {
        makeThumbnail: true
      },
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' }
        ],
        categoryId: [
          { required: true, message: '请选择系统类型', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入博客内容', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit(publish) {
      var that = this
      if (isEmpty(that.formData.content)) {
        that.$message({
          message: '请填写博客内容',
          type: 'error'
        })
        return
      }
      that.$refs.editForm.validate(valid => {
        if (valid) {
          that.formData.publish = publish
          if (!that.isUseMdEdit) {
            that.formData.contentHtml = that.formData.content
          }
          that.loading = true
          if (isEmpty(that.formData.id)) {
            blogApi.add(that.formData)
              .then(() => {
                that.loading = false
                that.$router.push('/blog/list')
              }).catch(() => {
                that.loading = false
              })
          } else {
            blogApi.update(that.formData)
              .then(() => {
                that.loading = false
                that.$router.push('/blog/list')
              })
              .catch(() => {
                that.loading = false
              })
          }
        }
      })
    },
    getBlogTagList() {
      var that = this
      blogApi.getTagList().then(res => {
        that.tagList = res.data
      })
    },
    getHtml(data) {
      this.formData.contentHtml = data
    },
    getDetail(id) {
      const that = this
      blogApi.getDetail(id).then(res => {
        that.formData = res.data
        if (!isEmpty(that.formData.coverImgUrl)) {
          that.fileList.push({ url: that.formData.coverImgUrl })
        }
      })
    },
    // 图片上传穿
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handlePictureRemove() {
      this.$refs.uploadRef.clearFiles()
    },
    handlePictureSuccess(res) {
      if (res && res.successed) {
        this.formData.coverImgUrl = res.thumUrl
      }
    },
    handlePictureExceed() {
      this.$message({
        message: '最多上传一个图片',
        type: 'warning'
      })
    }
  },
  created: function () {
    this.getBlogTagList()
    if (!isEmpty(this.$route.query.p)) {
      var param = formHex(this.$route.query.p, true)
      if (!isEmpty(param.id)) {
        this.isUseMdEdit = param.isMd
        this.getDetail(param.id)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.hx-icon-square::before {
  font-size: 1.35em;
}
.el-checkbox.is-bordered + .el-checkbox.is-bordered {
  margin-left: 0;
}
.hx-upload {
  ::v-deep.el-upload--picture-card {
    width: auto;
    height: auto;
    border: none;
    line-height: unset;
  }
  ::v-deep.el-upload-list--picture-card {
    display: flex;
    margin-left: 0.75rem;
  }
  &.hide {
    ::v-deep.el-upload {
      display: none;
    }
  }
}
</style>