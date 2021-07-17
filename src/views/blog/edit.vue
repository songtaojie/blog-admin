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
            <hx-select api="/admin/api/enum/getcategorylist" placeholder="请选择系统分类" v-model="formData.categoryId"></hx-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-row>
          <el-col>
            <el-upload
              :action="attachApi + '/api/attach/upload'"
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
            <ck-edit v-model="formData.content"></ck-edit>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-col class="d-flex align-items-center">
            <label class="text-left mb-0 blog-category-label">个人分类：</label>
            <hx-input
              :editable="item.editable"
              :id="item.id"
              :key="item.id"
              @blur="onInputBlur"
              @clear="onClear"
              @enter="onEnter"
              v-for="item in formData.personTags"
              v-model.trim="item.name"
            ></hx-input>
            <el-button @click="onAddTag" class="hx-icon-square d-flex align-items-center" type="text">
              <i class="el-icon-circle-plus"></i>添加分类
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-col :span="12">
            <el-checkbox-group class="d-flex flex-wrap justify-content-start align-items-start" v-model="tagSelected">
              <el-checkbox :key="tag.id" :label="tag.id" border v-for="tag in tagList">{{tag.name}}</el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-col :sm="8" :xs="24">
            <hx-select api="/admin/api/enum/GetBlogTypeList" placeholder="请选择文章类型" v-model="formData.blogTypeId"></hx-select>
          </el-col>
          <el-col :sm="16" :xs="24">
            <el-checkbox false-label="N" true-label="Y" v-model="formData.personTop">个人置顶</el-checkbox>
            <el-checkbox false-label="N" true-label="Y" v-model="formData.private">仅自己可见</el-checkbox>
            <el-checkbox false-label="N" true-label="Y" v-model="formData.canCmt">允许评论</el-checkbox>
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
import HxInput from '@/components/HxInput.vue'
import { guid, isEmpty } from '../../common/index'
import HxSelect from '@/components/HxSelect.vue'
import blogApi from '../../api/blog'
import { TOKEN_TYPE } from '../../common/constkey'
export default {
  name: 'edit',
  components: {
    CkEdit: resolve => require(['./ckedit.vue'], resolve),
    MdEdit: resolve => require(['./mdedit.vue'], resolve),
    HxInput,
    HxSelect
  },
  data() {
    var useMdEdit = this.$route.params.useMdEdit
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
      tagSelected: [],
      attachApi: process.env.VUE_APP_ATTACH_API,
      isUseMdEdit: useMdEdit === true, // 是否是markdown编辑器
      formData: {
        id: '',
        markDown: useMdEdit ? 'Y' : 'N',
        blogTypeId: null,
        categoryId: null,
        coverImgUrl: '',
        title: '',
        personTop: 'N',
        private: 'N',
        canCmt: 'Y',
        content: '',
        contentHtml: '',
        publish: 'N',
        personTags: []
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
                debugger
                that.loading = false
                that.$router.push({
                  name: 'list'
                })
              }).catch(() => {
                that.loading = false
              })
          } else {
            blogApi.update(that.formData)
              .then(() => {
                that.loading = false
                that.$router.push({
                  name: 'list'
                })
              })
              .catch(() => {
                that.loading = false
              })
          }
        }
      })
    },
    /**
     * 删除时，清除输入的数据
     */
    onClear(input) {
      this.addOrClearTag(input, true)
      var index = this.tagSelected.findIndex(t => {
        return t === input.id
      })
      if (index >= 0) {
        this.tagSelected.splice(index, 1)
      }
    },
    /**
     * 失去焦点时，存储输入的数据
     */
    onInputBlur(input) {
      this.addOrClearTag(input)
    },
    /**
     * 添加标签
     */
    onAddTag() {
      var newTag = {
        id: `newData${guid()}`,
        editable: true,
        name: ''
      }
      this.formData.personTags.push(newTag)
    },
    /**
     * 回车键按下时，存储输入的数据
     */
    onEnter(input) {
      this.addOrClearTag(input)
    },
    addOrClearTag(input, isClear) {
      var that = this,
        tags = that.formData.personTags
      var id = input.id
      var index = tags.findIndex(p => {
        return p.id === id
      })
      if (index >= 0) {
        var o = tags[index]
        var name = o.name
        if (isClear) {
          tags.splice(index, 1)
        } else {
          if (isEmpty(name)) {
            tags.splice(index, 1)
          } else {
            var filterTags = tags.filter(p => {
              return p.name === name
            })
            if (filterTags.length > 1) {
              tags.splice(index, 1)
            } else {
              // 到这一步才算添加进去
              tags.editable = false
              input.blur()
            }
          }
        }
      }
    },
    removeTag2(id) {
      var tags = this.formData.personTags
      var index = tags.findIndex(p => {
        return p.id === id
      })
      if (index >= 0) {
        var o = tags[index]
        var name = o.name
        if (isEmpty(name)) {
          this.formData.personTags.splice(index, 1)
        } else {
          var filterTags = tags.filter(p => {
            return p.name === name
          })
          if (filterTags.length > 1) {
            this.formData.personTags.splice(index, 1)
          } else {
            this.formData.personTags[index].editable = false
          }
        }
      }
    },
    getBlogTagList() {
      var that = this
      this.$api.post('/admin/api/blogmanage/GetTagList')
        .then(res => {
          if (res && res.success) {
            that.tagList = res.data
          }
        })
    },
    getHtml(data) {
      this.formData.contentHtml = data
    },
    getDetail(id) {
      const that = this
      blogApi.getDetail(id).then(res => {
        that.formData = res.data
        if (!isEmpty(that.formData.blogTags)) {
          that.tagSelected = that.formData.blogTags.split(',')
        }
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
      if (res && res.succeeded) {
        this.formData.coverImgUrl = res.data.url
      }
    },
    handlePictureExceed() {
      this.$message({
        message: '最多上传一个图片',
        type: 'warning'
      })
    }
  },
  watch: {
    tagSelected: function (newTags, oldTags) {
      var that = this
      var personTags = that.formData.personTags
      var tagList = that.tagList
      oldTags.forEach(t => {
        var index = personTags.findIndex(p => p.id === t)
        if (index >= 0) {
          personTags.splice(index, 1)
        }
      })
      newTags.forEach(t => {
        var index = personTags.findIndex(p => p.id === t)
        var o = tagList.find(p => p.id === t)
        if (index < 0) {
          personTags.push(o)
        }
      })
    }
  },
  created: function () {
    this.getBlogTagList()
    const id = this.$route.params.id
    if (!isEmpty(id)) {
      this.getDetail(id)
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