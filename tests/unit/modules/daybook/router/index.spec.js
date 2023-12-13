import daybookRouter from "@/modules/daybook/router";

describe('Pruebas en el router module del Daybook', () => {

  it('el router debe de tener esta configuración', () => {
    expect(daybookRouter).toMatchObject({
        name: 'daybook',
        component: () => import(/* webpackChunkName: "DayBookLayout" */ '@/modules/daybook/layouts/DayBookLayout.vue'),
        children: [
          {
            path: '',
            name: 'no-entry',
            component: ()=> import(/* webpackChunkName: "NoEntrySelected" */'@/modules/daybook/views/NoEntrySelected.vue'),
          },
          {
            path: ':id',
            name: 'entry',
            component: ()=> import(/* webpackChunkName: "EntryView" */'@/modules/daybook/views/EntryView.vue'),
            props: (route) => {
              return {
                id: route.params.id
              }
            }
          },
        ],
      }) // Fin expect

  });

});