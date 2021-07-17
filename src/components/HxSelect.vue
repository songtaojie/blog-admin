<template>
  <div>
    <!-- <b-form-select :value="value" :required="required" :options="items" :placeholder="placeholder"
  :value-field="valueField" :text-field="textField" @change="onChange">
    </b-form-select>-->
    <el-select :placeholder="placeholder" @change="onChange" style="width:100%" v-model="selected">
      <el-option :key="item.id" :label="item.label" :text-field="textField" :value="item.value" :value-field="valueField" v-for="item in items"></el-option>
    </el-select>
  </div>
</template>
<script>
import { isEmpty } from '../common/index'
export default {
  name: 'HxSelect',
  props: {
    value: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: ''
    },
    api: {
      type: String,
      default: '',
      required: true
    },
    valueField: {
      type: String,
      default: 'id'
    },
    textField: {
      type: String,
      default: 'name'
    }
  },
  data() {
    return {
      items: []
    }
  },
  computed: {
    selected: {
      get: function () {
        return this.value
      },
      set: function (val) {
        this.onChange(val)
      }
    }
  },
  methods: {
    onChange(val) {
      this.$emit('input', val)
    }
  },
  created() {
    var that = this
    if (!isEmpty(that.api)) {
      that.$api.post(that.api)
        .then(res => {
          if (res && res.succeeded) {
            that.items = res.data.map(function (item) {
              return {
                value: item[that.valueField],
                label: item[that.textField]
              }
            })
            that.items.splice(0, 0, { value: null, label: that.placeholder || '--请选择--' })
          }
        }).catch(() => {

        })
    }
  }
}
</script>