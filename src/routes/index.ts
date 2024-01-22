import { lazy } from 'react';

const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));


const SeguimientoOV = lazy(() => import('../pages/Ventas/SeguimientoOV'));

const ResumenLocales = lazy(() => import('../pages/Ventas/ResumenLocales'));

const ResumenLocal = lazy(() => import('../pages/Ventas/ResumenLocal'));

const ResumenLocalDetalle = lazy(() => import('../pages/Ventas/ResumenLocalDetalle'));

const coreRoutes = [
  {
    path: '/ventas/seguimiento-ov',
    title: 'Seguimiento OV',
    component: SeguimientoOV,
  },

  
  {
    path: '/ventas/resumen-locales',
    title: 'Resumen de Ventas de Locales',
    component: ResumenLocales,
  },

  
  {
    path: '/ventas/resumen-local/',
    search:"?localId=number",
    title: 'Resumen de Ventas por Local',
    component: ResumenLocal,
  },
  
  {
    path: '/ventas/resumen-local-detalle/',
    search:"?localId=number",
    title: 'Resumen de Ventas por Local Detallado',
    component: ResumenLocalDetalle,
  },




  {
    path: '/calendar',
    title: 'Calender',
    component: Calendar,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/forms/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/tables',
    title: 'Tables',
    component: Tables,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
];

const routes = [...coreRoutes];
export default routes;
