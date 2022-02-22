// Pathify
import { make } from 'vuex-pathify'

// Data
const state = {
  drawer: null,
  drawerImage: true,
  mini: false,
  items: [
    // {
    //   title: 'Dashboard',
    //   icon: 'mdi-view-dashboard',
    //   to: '/',
    // },
    // {
    //   title: 'User Profile',
    //   icon: 'mdi-account',
    //   to: '/components/profile/',
    // },
    // {
    //   title: 'Regular Tables',
    //   icon: 'mdi-clipboard-outline',
    //   to: '/tables/regular/',
    // },
    // {
    //   title: 'Typography',
    //   icon: 'mdi-format-font',
    //   to: '/components/typography/',
    // },
    // {
    //   title: 'Icons',
    //   icon: 'mdi-chart-bubble',
    //   to: '/components/icons/',
    // },
    
   
    {
      title: 'Thêm bài viết',
      icon: '1',
      to: '/news/',
    },
    {
      title: 'Đăng video',
      icon: '2',
      to: '/video/',
    },
    {
      title: 'Quản lý video',
      icon: '3',
      to: '/listvideo/',
    },
    {
      title: 'Quản lý bài viết',
      icon: '4',
      to: '/listnews/',
    },
    {
      title: 'Quản lý User',
      icon: '4',
      to: '/users/',
    },
    // {
    //   title: 'Quản lý user',
    //   icon: '3',
    //   to: '/component/user/',
    // },
    // {
    //   title: 'texteditor',
    //   icon: 'mdi-bell',
    //   to: '/components/texteditor/',
    // },
  ],
}

const mutations = make.mutations(state)

const actions = {
  ...make.actions(state),
  init: async ({ dispatch }) => {
    //
  },
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
