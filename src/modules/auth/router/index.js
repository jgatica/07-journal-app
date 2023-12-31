export default {
  name: 'auth',
  component: ()=>import(/* webpackChunkName: "auth" */'@/modules/auth/layouts/AuthLayout.vue'),
  children: [
    {
      path: '',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */'@/modules/auth/views/Login.vue'),
    },
  ],
}