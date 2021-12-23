import { ThemeContext } from 'contexts/themeContext'
import { useContext } from 'react'
import './index.scss'

export default function Footer() {
  const { colors } = useContext(ThemeContext).theme

  const link = (text: string, link: string) => (
    <a
      style={{
        color: colors.text.metisgreen,
        marginLeft: 60,
        marginRight: 60,
      }}
      href={link}
    >
      {text}
    </a>
  )

  return (
    <div className="footerWrapper">
      <img src="/assets/banana-cover.png" alt="footerLogo" />
      <p>
        We have a strong and principled community. Many of our members have
        stuck around since the beginning. We look beyond the hype and keep to
        the principles that keep blockchains functioning.
      </p>
      <div
        style={{
          display: 'grid',
          rowGap: 20,
          background: 'black',
          textAlign: 'center',
        }}
      >
        <div style={{ display: 'inline-flex', justifyContent: 'center' }}>
          {link('Discord', 'https://discord.gg/6jXrJSyDFf')}
          {link('Github', 'https://github.com/jbx-protocol/juicehouse')}
          {link('Twitter', 'https://twitter.com/juiceboxETH')}
        </div>
      </div>
    </div>
  )
}
