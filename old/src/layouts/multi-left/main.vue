<template>
  <main class="hx-main" role="main">
    <layout-tab></layout-tab>
    <div class="hx-content">
      <keep-alive v-if="$route.meta && $route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </div>
  </main>
</template>

<script>
import LayoutTab from './tab'
export default {
  name: 'layout-main',
  components: {
    LayoutTab
  }
}
</script>


<style lang="scss" >
</style>