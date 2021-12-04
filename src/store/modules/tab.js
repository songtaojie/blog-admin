const stateData = {
  options: [],
  activeIndex: '0',
  title: ''
}
const state = Object.assign(stateData)
const tab = {
  state: state,
  getters: {
    getTitle: (state) => {
      return state.title
    },
    getOptions: (state) => {
      return state.options
    }
  },
  mutations: {
    add_tabs(state, data) {
      state.options.push(data)
    },
    delete_tabs(state, route) {
      debugger
      state.options = state.options.filter(tab => tab.route !== route)
    },
    set_active_index(state, index) {
      state.activeIndex = index
    },
    set_title(state, title) {
      state.title = title
    }
  },
  actions: {}
}
export default tab
