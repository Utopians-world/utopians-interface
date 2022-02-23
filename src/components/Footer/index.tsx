import { ThemeContext } from 'contexts/themeContext'
import { useContext } from 'react'
import { Space } from 'antd'
import './index.scss'

export default function Footer() {
  const { colors } = useContext(ThemeContext).theme

  const link = (text: string, link: string) => (
    <a
      style={{
        color: colors.text.metisgreen,
      }}
      href={link}
      target="_blank"
      rel="noreferrer"
    >
      {text}
    </a>
  )

  return (
    <div className="footerWrapper">
      <img src="/assets/metis-logo-txt.png" alt="footerLogo" />
      <p>
        We have a strong and principled community. Many of our members have
        stuck around since the beginning. We look beyond the hype and keep to
        the principles that keep blockchains functioning.
      </p>
      <Space style={{ margin: '0 auto' }}>
        {link('Discord', 'https://discord.gg/2yXDRHvhAe')}
        {link('Github', 'https://github.com/Utopians-world/utopians-interface')}
        {link('Telegram', 'https://t.me/utopians_en')}
      </Space>
    </div>
  )
}
