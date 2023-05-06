import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import Page404 from '../pages/Page404.js'

// routes config
import routes from '../routes'

const AppContent = () => {

  return (
    <CContainer lg>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
    </CContainer>
  )
}

export default React.memo(AppContent)
