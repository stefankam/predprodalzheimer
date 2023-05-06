import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {CContainer, CHeader, CHeaderBrand, CHeaderDivider, CHeaderNav, CHeaderToggler, CNavLink, CNavItem} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu, cilReload } from '@coreui/icons'
import { CAvatar, CBadge, CDropdown, CDropdownDivider, CDropdownHeader, CDropdownItem, CDropdownMenu, CDropdownToggle} from '@coreui/react'
import { cilAccountLogout, cilSettings, cilUser} from '@coreui/icons'
import { Component, Suspense } from 'react'
//              <CAvatar src={} size="md" />
import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'
import fsl from './../assets/fsl-logo.png'
import routes from '../routes'

const AppHeader = () => {
  const loading = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  )

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const currentLocation = useLocation().pathname
  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname)
    return currentRoute ? currentRoute.name : false }  
  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      const routeName = getRouteName(currentPathname, routes)
      routeName &&
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          active: index + 1 === array.length ? true : false,
        })
      return currentPathname
    })
    return breadcrumbs
  }
  const breadcrumbs = getBreadcrumbs(currentLocation)

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/" >
          <h3></h3>
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>FSL Web application</CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CNavLink onClick={() => window.location.reload(() => <Suspense fallback={loading}></Suspense>)} style={{cursor:'pointer'}}>
              <CIcon icon={cilReload} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <CDropdown variant="nav-item">
            <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>

            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
              <CDropdownItem href="#"><CIcon icon={cilUser} className="me-2" /> Personal data </CDropdownItem>
              <CDropdownItem href="#"><CIcon icon={cilSettings} className="me-2" /> Settings </CDropdownItem>
              <CDropdownDivider />
              <CDropdownItem href="/login"><CIcon icon={cilAccountLogout} className="me-2" />Logout</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <CBreadcrumb className="m-0 ms-2">
          <CBreadcrumbItem href="/dashboard">Home</CBreadcrumbItem>
          {breadcrumbs.map((breadcrumb, index) => {
            return (
              <CBreadcrumbItem {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })} key={index}>{breadcrumb.name}</CBreadcrumbItem>)
          })}
        </CBreadcrumb>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
