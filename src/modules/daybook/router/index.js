export default {
  name: 'daybook',
  component: () => import(/* webpackChunkName: "DayBookLayout" */ '@/modules/daybook/layouts/DayBookLayout.vue'),
  children: [

  ],
}