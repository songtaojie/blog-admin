<template>
  <el-drawer :before-close="onBeforeClose" :title="isAdd?'添加菜单/按钮':'编辑菜单/按钮'" :visible.sync="visible" @open="onDrawerOpen" ref="drawer" size="40%">
    <div class="d-flex flex-column p-4 h-100">
      <el-form :model="formData" :rules="rules" @submit.stop.prevent="onSubmit" class="flex-fill" label-width="115px" ref="ruleForm">
        <el-form-item label="菜单类型:" prop="menuType">
          <el-radio-group :disabled="formData.isSystem" v-model="formData.menuType">
            <el-radio :label="0">目录</el-radio>
            <el-radio :label="1">菜单</el-radio>
            <el-radio :label="2">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上级菜单" prop="parentId">
          <!-- <el-input v-model="formData.parentId" v-show="false" /> -->
          <el-cascader
            :disabled="formData.isSystem"
            :options="menuTreeList"
            :props="{ checkStrictly: true, label: 'name', value: 'id' }"
            :show-all-levels="false"
            clearable
            ref="treeMenu"
            style="width: 100%"
            v-model="parentMenuIds"
          />
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="菜单/按钮编号:" prop="code">
              <el-input :disabled="formData.isSystem" autocomplete="off" placeholder="请输入菜单/按钮编号" v-model="formData.code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单/按钮名称:" prop="name">
              <el-input autocomplete="off" placeholder="请输入菜单/按钮名称" v-model="formData.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="菜单路由:" prop="path" v-if="formData.menuType !==2">
          <el-tooltip placement="top">
            <div slot="content">
              如果是目录，请填‘-’字符
              <br />如果是菜单，请输入路由
              <br />如果是按钮，请输入空格即可
              <br />如果是外链，请带上协议，比如 https://www.baidu.com
              <br />
            </div>
            <el-input :disabled="formData.isSystem" auto-complete="off" placeholder="请输入路由地址" v-model="formData.path"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="组件路径:" prop="component" v-if="formData.menuType !==2">
          <el-input :disabled="formData.isSystem" auto-complete="off" placeholder="请输入组件路径" v-model="formData.component"></el-input>
        </el-form-item>
        <el-form-item label="描述:">
          <el-input placeholder="请输入菜单描述" v-model="formData.description"></el-input>
        </el-form-item>
        <el-form-item label="菜单图标:" prop="icon">
          <el-popover placement="bottom-start" trigger="click" width="440">
            <el-input placeholder="点击选择图标" slot="reference" v-model="formData.icon">
              <i :class="formData.icon" slot="prefix" v-if="formData.icon" />
            </el-input>
            <iconList @selectIcon="selectIcon" class="iconList m-t-20" ref="iconSelect" />
          </el-popover>
        </el-form-item>
        <el-form-item label="接口地址" prop="moduleIds" v-if="formData.menuType !== 0">
          <el-select
            :loading="moduleLoading"
            :remote-method="searchModules"
            filterable
            multiple
            placeholder="请选择接口"
            remote
            style="width:100%"
            v-model="formData.moduleIds"
          >
            <el-option :key="item.id" :label="item.routeUrl" :value="item.id" text-field="routeUrl" v-for="item in moduleList" value-field="id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="序号:">
          <el-input placeholder="请输入序号" type="number" v-model.number="formData.orderSort"></el-input>
        </el-form-item>
        <el-row v-if="formData.menuType !==2">
          <el-col :span="8">
            <el-form-item label="启用/禁用:">
              <el-switch v-model="formData.isEnabled"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="隐藏菜单:" prop="isHide" sortable width>
              <el-switch v-model="formData.isHide"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="keepAlive:" prop="iskeepAlive" sortable width>
              <el-switch v-model="formData.iskeepAlive"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
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
import permissionApi from '../../api/admin/permission'
import moduleApi from '../../api/admin/module'
import iconList from '@/components/iconList'
export default {
  components: { iconList },
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
      name: 'RoleName',
      loading: false,
      moduleLoading: false,
      moduleList: [],
      formData: {
        id: '',
        code: '',
        parentId: '',
        name: '',
        menuType: 1,
        path: '',
        component: '',
        description: '',
        orderSort: 0,
        isEnabled: true,
        isHide: false,
        iskeepAlive: false,
        icon: '',
        isSystem: false,
        moduleIds: ''
      },
      menuTreeList: [],
      parentMenuIds: [],
      rules: {
        code: [
          { required: true, message: '请输入菜单/按钮编号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入菜单/按钮名称', trigger: 'blur' }
        ],
        path: [
          { required: true, message: '请输入菜单路由', trigger: 'blur' }
        ],
        component: [
          { required: true, message: '请输入菜单路由地址', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      var that = this
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          that.loading = true
          that.formData.parentId = ''
          if (that.parentMenuIds.length > 0) {
            that.formData.parentId = that.parentMenuIds[0]
          }
          if (isEmpty(that.id)) {
            permissionApi.add(that.formData)
              .then(() => {
                that.loading = false
                that.onSaveSuccess()
                that.onCancle()
              })
              .catch(() => {
                that.loading = false
              })
          } else {
            permissionApi.update(that.formData)
              .then(() => {
                that.loading = false
                that.onSaveSuccess()
                that.onCancle()
              })
              .catch(() => {
                that.loading = false
              })
          }
        }
      })

    },
    onCancle() {
      this.$refs.drawer.closeDrawer()
    },
    getDetail(id) {
      var that = this
      permissionApi.getDetail(id)
        .then(res => {
          if (res.succeeded) {
            that.formData = res.data
            that.parentMenuIds = [that.formData.parentId]
            that.moduleList = res.data.moduleList
            delete that.formData.moduleList
          }
        })
    },
    onBeforeClose() {
      this.$emit('update:visible', false)
    },
    onDrawerOpen() {
      if (!isEmpty(this.id)) {
        this.getDetail(this.id)
      } else {
        this.$nextTick(() => {
          this.$refs.ruleForm.clearValidate()
          this.$refs.ruleForm.resetFields()
        })
        if (this.$refs.treeMenu) this.$refs.treeMenu.handleClear()
        this.formData.code = ''
        this.formData.name = ''
        this.formData.parentId = ''
        this.formData.moduleId = ''
      }
    },
    onSaveSuccess() {
      this.$emit('success')
    },
    selectIcon(item) {
      this.formData.icon = item
    },
    selectParentMenu(value) {
      if (value && value.length > 0) {
        this.formData.parentId = value[0]
      }
    },
    getPullDownTree() {
      permissionApi.getUserMenuTree()
        .then(res => {
          this.menuTreeList = res.data
        })
    },
    searchModules(query) {
      var that = this
      that.moduleLoading = true
      var data = { name: query }
      moduleApi.getList(data)
        .then(res => {
          that.moduleLoading = false
          if (res.succeeded) {
            that.moduleList = res.data
          }
        })
    }
  },
  computed: {
    isAdd() {
      return isEmpty(this.id)
    },
    showdrawer() {
      return this.visible
    }
  },
  created() {
    this.getPullDownTree()
  }
}
</script>
<style lang="scss">
</style>
