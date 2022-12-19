<template>
  <el-drawer :before-close="onBeforeClose" :title="isAdd?'添加栏目':'编辑栏目'" :visible.sync="visible" @open="onDrawerOpen" ref="drawer" size="35%">
    <div class="d-flex flex-column p-4 h-100">
      <el-form :model="formData" :rules="rules" @submit.stop.prevent="onSubmit" class="flex-fill" label-width="85px" ref="ruleForm">
        <el-form-item label="栏目名称" prop="name">
          <el-input placeholder="请输入栏目名称" v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input placeholder="请输入描述" type="textarea" v-model="formData.description"></el-input>
        </el-form-item>
        <el-form-item label="序号:" prop="orderSort">
          <el-input placeholder="请输入序号" type="number" v-model="formData.orderSort"></el-input>
        </el-form-item>
        <el-form-item label="是否启用:" prop="isEnabled">
          <el-switch v-model="formData.isEnabled"></el-switch>
        </el-form-item>
      </el-form>
      <div class="d-flex">
        <el-button @click="onCancle" class="flex-fill">取 消</el-button>
        <el-button :loading="loading" @click="onSubmit" class="flex-fill" type="primary">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import { isEmpty } from '../../../common/index'
import blogApi from '../../../api/admin/blogmanage'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      formData: {
        id: '',
        name: '',
        description: '',
        orderSort: 0,
        isEnabled: true
      },
      logoList: [
      ],
      rules: {
        name: [
          { required: true, message: '请输入栏目名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      var that = this
      that.loading = true
      blogApi.addorUpdateCategory(that.formData)
        .then(() => {
          that.loading = false
          that.onSaveSuccess()
          that.onCancle()
        })
        .catch(() => {
          that.loading = false
        })
    },
    onCancle() {
      this.$refs.drawer.closeDrawer()
    },
    getDetail(id) {
      var that = this
      blogApi.getCategoryDetail(id)
        .then(res => {
          that.formData = res.data
        })
    },
    onBeforeClose() {
      this.$emit('update:visible', false)
    },
    onDrawerOpen() {
      if (!isEmpty(this.id)) {
        this.getDetail(this.id)
      } else if (this.$refs.ruleForm) {
        this.$refs.ruleForm.resetFields()
      }
    },
    onSaveSuccess() {
      this.$emit('success')
    }
  },
  computed: {
    isAdd() {
      return isEmpty(this.id)
    },
    showdrawer() {
      return this.visible
    }
  }
}
</script>
<style lang="scss">
#module-sidebar {
  .form-row {
    align-items: center;
  }
}
</style>
