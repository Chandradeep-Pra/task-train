import Topbar from '@/components/Topbar'
import React from 'react'

const DashboardLayout = ({children}:{children: React.ReactNode}) => {
  return (
    <>
      <main>
        {children}
      </main>
    </>
  )
}

export default DashboardLayout