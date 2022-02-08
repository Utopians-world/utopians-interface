import { Space, Drawer } from 'antd' //Collapse
import { MenuOutlined, CloseOutlined } from '@ant-design/icons'
import { Header } from 'antd/lib/layout/layout'

import { ThemeContext } from 'contexts/themeContext'
import { useContext, useEffect, useState } from 'react'

import { ThemeOption } from 'constants/theme/theme-option'

import Account from './Account'
// import ThemePicker from './ThemePicker' hide 2021-12-21 明暗风格切换

export default function Navbar() {
  const [isActive, setIsActive] = useState('Home')
  const [visible, setVisible] = useState(false)
  const showDrawer = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }

  const { forThemeOption } = useContext(ThemeContext)

  useEffect(() => {
    console.log(window.location, 'location')
  }, [isActive])

  const menuItem = (text: string, route?: string, onClick?: VoidFunction) => {
    const external = route?.startsWith('http')

    return (
      <a
        className={`hover-nav ${isActive === text ? 'active' : ''}`}
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
          [ThemeOption.light]: '/assets/metis-logo.svg',
          [ThemeOption.dark]: '/assets/metis-logo.svg',
        })
      }
      alt="Utopians logo"
    />
  )

  const menu = () => {
    return (
      <>
        {/* {menuItem('Home', '/')}
        {menuItem('Projects', '/#/projects')} */}
        {/* {menuItem('FAQ', '/#/faq')} */}
        {menuItem('Home', undefined, () => {
          window.location.hash = '/'
          setIsActive('Home')
          setVisible(false)
        })}
        {menuItem('Projects', undefined, () => {
          window.location.hash = '/projects'
          setIsActive('Projects')
          setVisible(false)
        })}
        {menuItem('FAQ', undefined, () => {
          window.location.hash = '/faq'
          setIsActive('FAQ')
          setVisible(false)
        })}
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
          <a
            href="/"
            onClick={() => {
              setIsActive('Home')
            }}
            style={{ display: 'inline-block' }}
          >
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
      >
        <Space>
          {logo(30)}
          <span className="logoTitle">
            <img src="/assets/metis-logo-txt.png" alt="logotxt" />
          </span>
        </Space>
        <MenuOutlined
          onClick={showDrawer}
          style={{
            color: '#ffffff',
            fontSize: '18px',
            lineHeight: '46px',
            paddingRight: '18px',
          }}
        />

        <Drawer
          className="navCollapse"
          title=""
          placement="right"
          closeIcon={
            <CloseOutlined style={{ color: '#ffffff', fontSize: '18px' }} />
          }
          onClose={onClose}
          visible={visible}
        >
          <div className="mobileLoginSection">
            <Account />
          </div>
          <Space
            className="mobileNav"
            size={[0, 0]}
            direction="vertical"
            style={{ width: '286px' }}
          >
            {menu()}
          </Space>
        </Drawer>
      </Header>
    </div>
  )
}
