import React from 'react'

const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const InputMRI = React.lazy(() => import('./pages/Input'))
const InputEEG = React.lazy(() => import('./pages/Page500'))
const InputNPT = React.lazy(() => import('./pages/Page500'))
const AnalyseMRI = React.lazy(() => import('./pages/Analysis'))
const AnalyseEEG = React.lazy(() => import('./pages/Page500'))
const AnalyseNPT = React.lazy(() => import('./pages/Page500'))
const Output = React.lazy(() => import('./pages/Output'))
const Settings = React.lazy(() => import('./pages/Settings'))
const AccountData = React.lazy(() => import('./pages/Account'))

const Tester = React.lazy(() => import('./pages/Account'))

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

  { path: '/settings', name: 'Settings', element: Settings },
  { path: '/account-data', name: 'Account data', element: AccountData }
]

export default routes
