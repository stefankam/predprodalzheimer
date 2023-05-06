import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://fsl.org" target="_blank" rel="noopener noreferrer">FSL</a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
