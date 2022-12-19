<template>
  <div v-if="!item.hidden">
    <el-menu-item :index="item.path" v-if="!(item.children && item.children.length > 0)">
      <i :class="item.meta.icon" v-if="item.meta"></i>
      <span slot="title">{{item.meta.title}}</span>
    </el-menu-item>
    <el-submenu :index="resolvePath(item.path)" ref="submenu" v-else>
      <template slot="title" v-if="item.meta">
        <i :class="item.meta.icon"></i>
        <span>{{item.meta.title}}</span>
      </template>

      <template v-for="child in item.children">
        <div :key="child.path" v-if="!child.hidden">
          <sidebar-item
            :base-path="resolvePath(child.path)"
            :is-nest="true"
            :item="child"
            :key="child.path"
            class="nest-menu"
            v-if="child.children && child.children.length > 0"
          />
          <el-menu-item :index="child.path" :key="child.path" v-else>
            <i :class="child.meta.icon"></i>
            {{child.meta.title}}
          </el-menu-item>
        </div>
      </template>
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/common'

export default {
  name: 'SideMenuItem',
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      onlyOneChild: null
    }
  },
  methods: {
    resolvePath(routePath) {
      if (this.isExternalLink(routePath)) {
        return routePath
      }
      return path.resolve(this.basePath, routePath)
    },
    isExternalLink(routePath) {
      return isExternal(routePath)
    }
  }
}
</script>
