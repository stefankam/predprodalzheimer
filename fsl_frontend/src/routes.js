import React from 'react'

const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const InputMRI = React.lazy(() => import('./pages/Input'))
const InputEEG = React.lazy(() => import('./pages/Page500'))
const InputNPT = React.lazy(() => import('./pages/Page500'))
const AnalyseMRI = React.lazy(() => import('./pages/Analysis'))
const AnalyseEEG = React.lazy(() => import('./pages/Page500'))
const AnalyseNPT = React.lazy(() => import('./pages/Page500'))
const Output = React.lazy(() => import('./pages/Output'))
const AboutProject = React.lazy(() => import('./pages/Settings'))
const Account = React.lazy(() => import('./pages/Account'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard},

  { path: '/input-mri', name: 'Input MRI', element: InputMRI },
  { path: '/input-eeg', name: 'Input EEG', element: InputEEG },
  { path: '/input-npt', name: 'Input MRI', element: InputNPT },

  { path: '/analyse-mri', name: 'Analyse MRI', element: AnalyseMRI },
  { path: '/analyse-eeg', name: 'Analyse EEG', element: AnalyseEEG },
  { path: '/analyse-npt', name: 'Analyse NPT', element: AnalyseNPT },

  { path: '/output', name: 'Output', element: Output },

  { path: '/account', name: 'Account', element: Account },
  { path: '/about', name: 'About this project', element: AboutProject }
]

export default routes
