<template>
  <div class="hx-editor">
    <mavon-editor
      :boxShadow="false"
      :defaultOpen="defaultOpen"
      :editable="editable"
      :subfield="subfield"
      :toolbars="toolbars"
      :value="value"
      @change="onEditorInput"
      @imgAdd="onImgAdd"
      placeholder="开始编写博客"
      ref="mdedit"
    />
  </div>
</template>
<script>
// import 'mavon-editor/dist/css/index.css'
// import axios from 'axios'
import '@/scss/blog/hxeditor.scss'
import { isEmpty } from '../../common/index'
import attachApi from '../../api/attach.js'
export default {
  name: 'MdEdit',
  props: {
    value: {
      type: String,
      default: ''
    },
    editable: {
      type: Boolean,
      default: true
    }
  },
  // components:{
  //   mavonEditor:() => import('mavon-editor')
  // },
  data() {
    var clientWidth = document.body.clientWidth
    var mintoolbars = {
      header: true, // 标题
      imagelink: true, // 图片链接
      code: true, // code
      table: true, // 表格
      trash: true, // 清空
      fullscreen: true, // 全屏编辑
      preview: true // 预览
    }
    var maxtoolbars = {
      header: true, // 标题
      bold: true, // 粗体
      italic: true, // 斜体
      alignleft: true, // 左对齐
      aligncenter: true, // 居中
      alignright: true, // 右对齐
      ol: true, // 有序列表
      ul: true, // 无序列表
      imagelink: true, // 图片链接
      code: true, // code
      table: true, // 表格
      fullscreen: true, // 全屏编辑
      help: true, // 帮助
      undo: true, // 上一步
      redo: true, // 下一步
      trash: true, // 清空
      preview: true // 预览
    }
    return {
      mintoolbars,
      maxtoolbars,
      clientWidth: clientWidth,
      toolbars: clientWidth > 768 ? maxtoolbars : mintoolbars,
      timer: false,
      subfield: clientWidth > 768,
      defaultOpen: 'edit'
    }
  },
  methods: {
    onEditorInput(value, render) {
      this.$emit('input', value)
      this.$emit('getHtml', render)
    },
    /**
     * 添加图片
     */
    onImgAdd(pos, imgfile) {
      var that = this
      var formdata = new FormData()
      formdata.append('file', imgfile)
      formdata.append('makeThumbnail', true)
      formdata.append('makeLetterWater', true)
      that.$api.post('/api/attach/upload', formdata)
        .then(res => {
          if (res && res.successed) {
            that.$refs.mdedit.$img2Url(pos, res.url)
          }

        })
      // axios.post('/api/attach/upload', formdata, {
      //   'Content-Type':'multipart/form-data'
      // }).then(res => {
      //   console.log(res)
      // })
    },
    onResize() {
      var that = this
      if (that.clientWidth < 768) {
        that.subfield = false
        that.toolbars = that.mintoolbars
      } else {
        that.subfield = true
        that.toolbars = that.maxtoolbars
      }
    }
  },
  watch: {
    clientWidth(value) {
      var that = this
      if (!that.timer) {
        that.clientWidth = value
        that.timer = true
        setTimeout(function () {
          // that.screenWidth = that.$store.state.canvasWidth
          that.onResize()
          that.timer = false
        }, 400)
      }
    }
  },
  created() {
    var that = this
    if (isEmpty(that.value)) {
      attachApi.getMdTemplate().then(res => {
        that.onEditorInput(res.data)
      })
    }
  },
  mounted() {
    var that = this
    window.onresize = function () {
      that.clientWidth = document.body.clientWidth
    }
  }
}
</script>

<style lang="scss" scoped>
.mavonEditor {
  width: 100%;
  height: 100%;
}
</style>