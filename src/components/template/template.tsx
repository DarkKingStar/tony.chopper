import React from 'react'
import Navabr from './navbar/navbar'
import FooterFC from './footer/footer';

function Template({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <>
    <Navabr/>
    <div style={{minHeight:"80dvh", margin: "54px 0 0 0"}}>
        {children}
    </div>
    <FooterFC/>
    </>
  )
}

export default Template