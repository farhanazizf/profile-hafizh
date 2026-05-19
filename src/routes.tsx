import type { RouteRecord } from 'vite-react-ssg'
import App from './App'
import Home from './pages/Home'

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <App />,
    children: [{ index: true, element: <Home /> }],
  },
]
