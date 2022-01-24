import { Collapse, Space } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import CollapsePanel from 'antd/lib/collapse/CollapsePanel'
import { Header } from 'antd/lib/layout/layout'

import { ThemeContext } from 'contexts/themeContext'
import { useContext, useState } from 'react'

import { ThemeOption } from 'constants/theme/theme-option'

import Account from './Account'
// import ThemePicker from './ThemePicker' hide 2021-12-21 明暗风格切换

export default function Navbar() {
  const [activeKey, setActiveKey] = useState<0 | undefined>()

  const { forThemeOption } = useContext(ThemeContext)

  const menuItem = (text: string, route?: string, onClick?: VoidFunction) => {
    const external = route?.startsWith('http')

    return (
      <a
        className="hover-nav"
        style={{
          fontWeight: 400,
          color: '#ffffff',
        }}
        href={route}
        onClick={onClick}
        {...(external
          ? {
              target: '_blank',
              rel: 'noreferrer',
            }
          : {})}
      >
        {text}
      </a>
    )
  }

  const logo = (height = 42) => (
    <img
      style={{ height }}
      src={
        forThemeOption &&
        forThemeOption({
          [ThemeOption.light]: '/assets/metis-logo.png',
          [ThemeOption.dark]: '/assets/metis-logo.png',
        })
      }
      alt="Utopians logo"
    />
  )

  const menu = () => {
    return (
      <>
        {menuItem('Home', '/')}
        {menuItem('Projects', '/#/projects')}
        {menuItem('FAQ', '/#/faq')}
        {/* {menuItem('Docs', 'https://docs.juicebox.money')}
        {menuItem('Blog', 'https://blog.juicebox.money')}
        {menuItem('Discord', 'https://discord.gg/6jXrJSyDFf')}
        {menuItem('Workspace', 'https://juicebox.notion.site')} */}
      </>
    )
  }

  return window.innerWidth > 900 ? (
    <div style={{ position: 'fixed', zIndex: 999, width: '100%' }}>
      <Header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '80px',
          zIndex: 999,
          background:
            // 'linear-gradient(101deg, #400AFF 0%, #400AFF 11%, #000000 20%)',
            'linear-gradient(101deg, rgba(64, 10, 255, 0.84) 0%, rgba(64, 10, 255, 0.84) 11%, rgba(0, 0, 0, 0.84) 20%)',
        }}
      >
        <Space size={[55, 0]} style={{ flex: 1 }}>
          <a href="/" style={{ display: 'inline-block' }}>
            {logo()}
            <span className="logoTitle">
              <img src="/assets/metis-logo-txt.png" alt="logotxt" />
            </span>
          </a>
          {menu()}
        </Space>
        <Space size="middle">
          {/* <ThemePicker /> */}
          <div className="hide-mobile">
            <Account />
          </div>
        </Space>
      </Header>
    </div>
  ) : (
    <div style={{ position: 'fixed', zIndex: 999, width: '100%' }}>
      <Header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '46px',
          background:
            'linear-gradient(101deg, rgba(64, 10, 255, 0.84) 0%, rgba(64, 10, 255, 0.84) 11%, rgba(0, 0, 0, 0.92) 20%)',
          zIndex: 999,
          padding: '0 0 0 22px',
        }}
        onClick={e => {
          setActiveKey(undefined)
          e.stopPropagation()
        }}
      >
        <Space>
          {logo(30)}
          <span className="logoTitle">
            <img src="/assets/metis-logo-txt.png" alt="logotxt" />
          </span>
        </Space>
        <Collapse
          className="navCollapse"
          style={{ border: 'none', background: 'transparent' }}
          activeKey={activeKey}
        >
          <CollapsePanel
            style={{
              border: 'none',
              paddingRight: 22,
              backgroundColor: 'rgba(0, 0, 0, 0.92)',
            }}
            key={0}
            showArrow={false}
            header={
              <Space
                onClick={e => {
                  setActiveKey(activeKey === 0 ? undefined : 0)
                  e.stopPropagation()
                }}
              >
                <MenuOutlined style={{ color: '#ffffff' }} />
              </Space>
            }
            // extra={<ThemePicker />}
          >
            <div className="mobileLoginSection">
              <Account />
            </div>
            <Space
              className="mobileNav"
              size={[0, 0]}
              direction="vertical"
              style={{ width: '316px' }}
            >
              {menu()}
            </Space>
          </CollapsePanel>
        </Collapse>
      </Header>
    </div>
  )
}
