/* eslint-disable import/prefer-default-export */
import {
  faBoxesPacking,
  faChartColumn,
  faSliders,
  faTachometerAlt,
  faTag,
  faUsers,
  faCheck,
  faFolderOpen,
  faHandshake,
  faFire
} from '@fortawesome/free-solid-svg-icons'
import { faClipboardCheck } from '@fortawesome/fontawesome-free-solid'
import Dashboard from '../pages/dashboard/dashboard'
import Teams from '../pages/teams/teams'
import AnalyticsReport from '../pages/analyticsReport/analyticsReport'
import Eptw from '../pages/eptw/eptw'
import Project from '../pages/project/project'
import EditCategory from '../pages/editCategory/editCategory'
import Task from '../pages/Task/task'
import Safety from '../pages/safety/safety'
import Template from '../pages/templates'

export const tabs = [
  {
    text: 'Analytic Report',
    id: 1,
    path: '/analytics',
    style: 'mb-4',
    icon: faChartColumn,
    tabComponent: AnalyticsReport
  },
  {
    text: 'Project',
    id: 2,
    path: '/project',
    style: 'mb-4',
    icon: faFolderOpen,
    tabComponent: Project
  },
  {
    text: 'Permit',
    id: 3,
    path: '/eptw',
    style: 'mb-4',
    icon: faHandshake,
    tabComponent: Eptw
  },
  {
    text: 'Templates',
    id: 4,
    path: '/templates',
    style: 'mb-4',
    icon: faFolderOpen,
    tabComponent: Template
  },
  {
    text: 'Safety Induction',
    id: 5,
    path: '/safety',
    icon: faFire,
    style: 'mb-4',
    tabComponent: Safety
  },
  {
    text: 'Teams',
    id: 6,
    path: '/teams',
    style: 'mb-4',
    icon: faUsers,
    tabComponent: Teams
  },
  {
    text: 'Data Customization',
    id: 7,
    path: '/editCategory',
    icon: faSliders,
    style: 'mb-4',
    tabComponent: EditCategory
  }
]
