<template>
  <el-drawer :before-close="onBeforeClose" :title="isAdd?'添加角色':'编辑角色'" :visible.sync="visible" @open="onDrawerOpen" ref="drawerRef" size="35%">
    <div class="d-flex flex-column p-4 h-100">
      <el-form :model="formData" :rules="rules" @submit.stop.prevent="onSubmit" class="flex-fill" label-width="85px" ref="ruleForm">
        <el-form-item label="角色名称" prop="name">
          <el-input autocomplete="off" placeholder="请输入角色名称" v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="角色Code:" prop="code">
          <el-input placeholder="请输入角色Code" required v-model="formData.code"></el-input>
        </el-form-item>
        <el-form-item label="描述说明:" prop="description">
          <el-input :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入描述说明" type="textarea" v-model="formData.description"></el-input>
        </el-form-item>
        <el-form-item label="序号:" prop="orderSort">
          <el-input placeholder="请输入序号" type="number" v-model.number="formData.orderSort"></el-input>
        </el-form-item>
        <el-form-item label="是否启用:" prop="isEnabled">
          <el-switch v-model="formData.isEnabled"></el-switch>
        </el-form-item>
        <el-form-item label="菜单权限" prop="menuIds">
          <el-tree :data.sync="menuTreeList" :props="menuTreeProps" empty-text="加载中，请稍后" node-key="id" ref="menuTree" show-checkbox />
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
import roleApi from '../../api/admin/role.js'
import permissionApi from '../../api/admin/permission.js'
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
      superAdminCode: 'SuperAdmin',
      formData: {
        id: '',
        name: '',
        code: '',
        description: '',
        orderSort: 0,
        isEnabled: true
      },
      menuTreeProps: {
        checkStrictly: false,
        label: 'name',
        value: 'id'
      },
      menuTreeList: [],
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      var that = this
      if (isEmpty(that.id)) {
        that.loading = true
        roleApi.add(that.formData)
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
        roleApi.update(that.formData)
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
      this.$refs.drawerRef.closeDrawer()
    },
    getDetail(id) {
      var that = this
      roleApi.getDetail(id)
        .then(res => {
          that.formData = res.data
          that.changeMenuTreeData()
        })
    },
    onBeforeClose() {
      this.$emit('update:visible', false)
    },
    onDrawerOpen() {
      if (!isEmpty(this.id)) {
        this.getDetail(this.id)
        roleApi.getSelectMenuList(this.id).then(res => {
          this.$nextTick(() => {
            this.$refs.menuTree.setCheckedKeys(res.data)
          })
        })
      } else if (this.$refs.ruleForm) {
        this.$refs.ruleForm.resetFields()
        this.changeMenuTreeData()
      }
    },
    onSaveSuccess() {
      this.$emit('success')
    },
    initRoleMenu() {
      permissionApi.getUserMenuTree()
        .then(res => {
          this.menuTreeList = res.data
        })
    },
    changeMenuTreeData() {
      var menuTreeList = [...this.menuTreeList]
      if (this.formData.code === this.superAdminCode) {
        this.setDsiabledCheck(menuTreeList, true)
      } else {
        this.setDsiabledCheck(menuTreeList, false)
      }
      this.menuTreeList = menuTreeList
    },
    setDsiabledCheck(menuTreeList, disabled) {
      if (menuTreeList && menuTreeList.length > 0) {
        menuTreeList.forEach(m => {
          m.disabled = disabled
          if (m.children && m.children.length > 0) {
            this.setDsiabledCheck(m.children, disabled)
          }
        })
      }
    }
  },
  computed: {
    isAdd() {
      return isEmpty(this.id)
    }
  },
  created() {
    this.initRoleMenu()
  }
}
</script>
<style lang="scss">
</style>
