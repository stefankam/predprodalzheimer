import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilCalculator, cilUser, cilSettings, cilAccountLogout, cilEyedropper, cilCloudUpload} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'Input',
  },
  {
    component: CNavItem,
    name: 'Input MRI',
    to: '/input-mri',
    icon: <CIcon icon={cilCloudUpload} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Input EEG',
    to: '/input-eeg',
    icon: <CIcon icon={cilCloudUpload} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Input NPT',
    to: '/input-npt',
    icon: <CIcon icon={cilCloudUpload} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Analysis',
  },
  {
    component: CNavItem, //CNavGroup,
    name: 'Analyse MRI',
    to: '/analyse-mri',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
//    items: [
//      {
//        component: CNavItem,
//        name: 'Structural MRI',
//        to: 'analyse-mri/analyse-smri',
//      },
//      {
//        component: CNavItem,
//        name: 'Functional MRI',
//        to: '/analyse-mri/analyse-fmri',
//      }
//    ]
  },
  {
    component: CNavItem,
    name: 'Analyse EEG',
    to: '/analyse-eeg',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Analyse NPT',
    to: '/analyse-npt',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Output',
  },
  {
    component: CNavItem,
    name: 'View Anaysis',
    to: '/output',
    icon: <CIcon icon={cilEyedropper} customClassName="nav-icon" />,
  },
  
  {
    component: CNavTitle,
    name: 'Other',
  },
  {
    component: CNavItem,
    name: 'Account details',
    to: '/account-data',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'Settings',
    to: '/settings',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />
  }
]

export default _nav
