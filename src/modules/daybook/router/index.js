export default {
  name: 'daybook',
  component: () => import(/* webpackChunkName: "DayBookLayout" */ '@/modules/daybook/layouts/DayBookLayout.vue'),
  children: [
    {
      path: '',
      name: 'no-entry',
      component: ()=> import(/* webpackChunkName: "NoEntrySelected" */'@/modules/daybook/views/NoEntrySelected.vue'),
    },
  ],
}

