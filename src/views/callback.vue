<template>
  <div>
    <div desktop="12" tablet="8">
      <dl>
        <dt>authorize successful</dt>
        <dt>Your browser should be redirected soon</dt>
      </dl>
    </div>
  </div>
</template>

<script>
import applicationUserManager from '../auth/oidcUserManager'


export default {
  name: 'callback',
  data() {
    return {}
  },
  async created() {
    try {
      const that = this
      await applicationUserManager.signinRedirectCallback()
      const user = await applicationUserManager.getUser()
      console.log(user)
      var curTime = new Date()
      var expiredate = new Date(
        curTime.setSeconds(curTime.getSeconds() + user.expires_at)
      )
      window.localStorage.refreshtime = expiredate // 保存刷新时间，这里的和过期时间一致
      var auth = {
        tokenExpire: expiredate,
        userId: user.profile.sub,
        userName: user.profile.preferred_username,
        nickName: user.profile.name
      }
      that.$store.commit('UPDATE_AUTH', auth)
      that.$store.commit('UPDATE_TOKEN', user.access_token)
      window.localStorage.user = JSON.stringify(user)
      that.$router.replace('/')
    } catch (e) {
      console.log(e)
      // this.$root.$emit('show-snackbar', { message: e })
    }
  },
  methods: {
    // 获取路由树
  }
}
</script>

<style>
</style>
