import type { RouteRecord } from 'vite-react-ssg'
import App from './App'
import Home from './pages/Home'
import CaseStudy from './pages/CaseStudy'
import { listCaseStudies } from './lib/case-studies'

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'case-studies/:slug',
        element: <CaseStudy />,
        getStaticPaths: () =>
          listCaseStudies().map((c) => `/case-studies/${c.slug}`),
      },
    ],
  },
]
