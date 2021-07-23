import App from './App';
import Home from './Home';
import Products from './Products';
import About from './About';
import NotFound from './NotFound';

import { loadData } from './utils/helpers';

const Routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/products',
    component: Products,
    loadData: () => loadData('posts')
  },
  {
    path: '/about',
    component: About,
    loadData: () => loadData('todos')
  },
  {
    path: '/404',
    component: NotFound
  }
];

export default Routes;