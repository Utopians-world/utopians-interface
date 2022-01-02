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

  const {
    theme: { colors },
    forThemeOption,
  } = useContext(ThemeContext)

  const menuItem = (text: string, route?: string, onClick?: VoidFunction) => {
    const external = route?.startsWith('http')

    return (
      <a
        className="hover-nav"
        style={{
          fontWeight: 600,
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

  const logo = (height = 40) => (
    <img
      style={{ height }}
      src={
        forThemeOption &&
        forThemeOption({
          [ThemeOption.light]: '/assets/juice_logo-ol.png',
          [ThemeOption.dark]: '/assets/juice_logo-od.png',
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
    <Header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '80px',
        lineHeight: '80px',
        zIndex: 999,
        // opacity: '0.84',
        background: 'linear-gradient(163deg, #400AFF 0%, #000000 30%)',
      }}
    >
      <Space size="large" style={{ flex: 1 }}>
        <a href="/" style={{ display: 'inline-block' }}>
          {logo()}
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
  ) : (
    <Header
      style={{
        background: colors.background.l0,
        zIndex: 100,
        padding: 8,
      }}
      onClick={e => {
        setActiveKey(undefined)
        e.stopPropagation()
      }}
    >
      <Collapse style={{ border: 'none' }} activeKey={activeKey}>
        <CollapsePanel
          style={{ border: 'none' }}
          key={0}
          showArrow={false}
          header={
            <Space
              onClick={e => {
                setActiveKey(activeKey === 0 ? undefined : 0)
                e.stopPropagation()
              }}
            >
              {logo(30)}
              <MenuOutlined style={{ color: colors.icon.primary }} />
            </Space>
          }
          // extra={<ThemePicker />}
        >
          <Space direction="vertical" size="middle">
            {menu()}
            <Account />
          </Space>
        </CollapsePanel>
      </Collapse>
    </Header>
  )
}
