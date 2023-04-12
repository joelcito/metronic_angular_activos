import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'builder',
    loadChildren: () =>
      import('./builder/builder.module').then((m) => m.BuilderModule),
  },

  // de aqui comienza lo de joel
  {
    path: 'activo',
    loadChildren: () =>
      import('./activo/activo.module').then((m) => m.ActivoModule),
  },
  {
    path: 'grupo',
    loadChildren: () =>
      import('./grupos/grupo.module').then((m) => m.GrupoModule),
  },
  // {
  //   path: 'componente',
  //   loadChildren: () =>
  //     import('./grupos/grupo.module').then((m) => m.GrupoModule),
  // },
  // aqui termina de joel

  {
    path: 'crafted/pages/profile',
    loadChildren: () =>
      import('../modules/profile/profile.module').then((m) => m.ProfileModule),
    data: { layout: 'light-sidebar' },
  },
  {
    path: 'crafted/account',
    loadChildren: () =>
      import('../modules/account/account.module').then((m) => m.AccountModule),
    data: { layout: 'dark-header' },
  },
  {
    path: 'crafted/pages/wizards',
    loadChildren: () =>
      import('../modules/wizards/wizards.module').then((m) => m.WizardsModule),
    data: { layout: 'light-header' },
  },
  {
    path: 'crafted/widgets',
    loadChildren: () =>
      import('../modules/widgets-examples/widgets-examples.module').then(
        (m) => m.WidgetsExamplesModule
      ),
    data: { layout: 'light-header' },
  },
  {
    path: 'apps/chat',
    loadChildren: () =>
      import('../modules/apps/chat/chat.module').then((m) => m.ChatModule),
    data: { layout: 'light-sidebar' },
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },

  // {
  //     path: 'my-page', // <= Page URL
  //     component: MyPageComponent // <= Page component registration
  // },

  // de aqui comienza lo de joel
  {
    path: 'activo',
    loadChildren: () =>
      import('./activo/activo.module').then((m) => m.ActivoModule),
  },
  // aqui termina de joel
];

export { Routing };
