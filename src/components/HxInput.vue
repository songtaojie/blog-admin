<template>
  <div class="hx-input-box">
    <div
      :contenteditable="editable"
      :Id="id"
      @blur="onInputBlur"
      @focus="isLocked = true"
      @input="onInputChange"
      @keydown.enter="onEnterKey"
      class="hx-input"
      ref="inputRef"
      tabindex="0"
      v-html="innerText"
    ></div>
    <i @click="onClear" class="el-icon-close"></i>
  </div>
</template>
<script>
export default {
  name: 'HxInput',
  props: {
    id: {
      type: String,
      default: '',
      required: true
    },
    value: {
      type: String,
      default: ''
    },
    editable: {
      type: Boolean,
      default: true
    }

  },
  data() {
    return {
      innerText: this.value,
      isLocked: true
    }
  },
  watch: {
    'value'() {
      if (!this.isLocked) {
        this.innerText = this.value
      }
    }
  },
  methods: {
    onInputChange() {
      this.$emit('input', this.$refs.inputRef.innerHTML)
    },
    onInputBlur() {
      this.isLocked = false
      this.$emit('blur', this.$refs.inputRef)
    },
    onClear() {
      this.$emit('clear', this.$refs.inputRef)
    },
    onEnterKey() {
      this.$emit('enter', this.$refs.inputRef)
    }
  },
  mounted() {
    if (this.editable) {
      this.$refs.inputRef.focus()
    }
  }
}
</script>
<style lang="scss" scoped>
.hx-input-box {
  line-height: 1.6rem;
  flex-wrap: wrap;
  margin-right: 0.3125rem;
  display: flex;
  i,
  svg {
    margin: auto 0;
    color: #a1a6b3;
    cursor: pointer;
    display: inline-block;
  }
  .hx-input {
    margin: auto 0;
    display: inline-block;
    padding: 3px 8px;
    font-size: 0.75rem;
    max-width: 40rem;
    background: #e9e9e9;
    border-radius: 2px;
    line-height: 1rem;
    color: #4f4f4f;
    overflow: hidden;
    white-space: nowrap;
    box-sizing: border-box;
    outline: none;
    // user-select: text;
    // white-space: pre-wrap;
    // text-align: left;
  }
}
.hx-input2 {
  width: 100%;
  height: 100%;
  overflow: auto;
  word-break: break-all;
  outline: none;
  user-select: text;
  white-space: pre-wrap;
  text-align: left;
  &[contenteditable="true"] {
    user-modify: read-write-plaintext-only;
    &:empty:before {
      content: attr(placeholder);
      display: block;
      color: #ccc;
    }
  }
}
</style>