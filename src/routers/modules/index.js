import LayoutMulti from '@/views/layout/index.vue'

export default [
  {
    path: '/list2',
    name: 'list2',
    component: LayoutMulti,
    meta: {
      requireAuth: true,
      title: '博客管理2',
      icon: 'document',
      permission: ['home']
    },
    children: [{
      path: '/list2',
      name: 'list2',
      component: () => import('@/views/blog/list.vue'),
      meta: {
        requireAuth: true,
        title: '文章列表',
        icon: 'document',
        permission: ['home']
      }
    },
    {
      path: '/edit2',
      name: 'edit2',
      component: () => import('@/views/blog/edit.vue'),
      meta: {
        requireAuth: true,
        title: '写博客',
        icon: 'edit-outline',
        permission: ['home']
      }
    }]
  }
]
