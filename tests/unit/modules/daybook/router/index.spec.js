import daybookRouter from "@/modules/daybook/router";

describe('Pruebas en el router module del Daybook', () => {

  it('el router debe de tener esta configuración', async () => {
    expect(daybookRouter).toMatchObject({
      name: 'daybook',
      component: expect.any(Function),
      children: [
        {
          path: '',
          name: 'no-entry',
          component: expect.any(Function),
        },
        {
          path: ':id',
          name: 'entry',
          component: expect.any(Function),
          props: expect.any(Function)
        },
      ],
    }) // Fin expect

    const promiseRoutes = []
    daybookRouter.children.forEach(el => promiseRoutes.push(el.component()))
    const routes = (await Promise.all(promiseRoutes)).map(r => r.default.name)

    expect(routes).toContain('NoEntrySelected')
    expect(routes).toContain('EntryView')

  });

  it('debe retornar el id de la ruta', () => {
    const route = {
      params: {
        id: 'ABC-123'
      }
    }

    // expect(daybookRouter.children[1].props(route)).toEqual({ id: 'ABC-123' })

    const entryRoute = daybookRouter.children.find(el => el.name === 'entry')
    expect(entryRoute.props(route))
  });

});