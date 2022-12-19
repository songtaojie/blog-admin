<template>
  <el-drawer :before-close="onBeforeClose" :title="isAdd?'添加接口':'编辑接口'" :visible.sync="visible" @open="onDrawerOpen" ref="drawer" size="35%">
    <div class="d-flex flex-column p-4 h-100">
      <el-form :model="formData" :rules="rules" @submit.stop.prevent="onSubmit" class="flex-fill" label-width="85px" ref="ruleForm">
        <el-form-item label="接口名称" prop="name">
          <el-input autocomplete="off" placeholder="请输入接口名称" v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="接口地址:" prop="routeUrl">
          <el-input placeholder="请输入接口地址" required v-model="formData.routeUrl"></el-input>
        </el-form-item>
        <el-form-item label="控制器:">
          <el-input placeholder="请输入控制器" v-model="formData.controller"></el-input>
        </el-form-item>
        <el-form-item label="方法名:">
          <el-input placeholder="请输入方法名" v-model="formData.action"></el-input>
        </el-form-item>
        <el-form-item label="接口描述:">
          <el-input :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入接口描述" type="textarea" v-model="formData.description"></el-input>
        </el-form-item>
        <el-form-item label="序号:">
          <el-input placeholder="请输入序号" type="number" v-model="formData.orderSort"></el-input>
        </el-form-item>
        <el-form-item label="是否启用:">
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
import { isEmpty } from '../../common/index'
import moduleApi from '../../api/admin/module'
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
        routeUrl: '',
        controller: '',
        action: '',
        description: '',
        orderSort: '',
        isEnabled: true
      },
      rules: {
        name: [
          { required: true, message: '请输入接口名称', trigger: 'blur' }
        ],
        routeUrl: [
          { required: true, message: '请输入接口地址', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      var that = this
      if (isEmpty(that.id)) {
        that.loading = true
        moduleApi.add(that.formData)
          .then(() => {
            that.loading = false
            that.onSaveSuccess()
            that.onCancle()
          })
          .catch(() => {
            that.loading = false
          })
      } else {
        that.loading = true
        moduleApi.update(that.formData)
          .then(() => {
            that.loading = false
            that.onSaveSuccess()
            that.onCancle()
          })
          .catch(() => {
            that.loading = false
          })
      }
    },
    onCancle() {
      this.$refs.drawer.closeDrawer()
    },
    getDetail(id) {
      var that = this
      moduleApi.getDetail(id)
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
