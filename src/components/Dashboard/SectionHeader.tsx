import TooltipLabel from 'components/shared/TooltipLabel'

import { ThemeContext } from 'contexts/themeContext'
import { CSSProperties, useContext } from 'react'

import { ThemeOption } from 'constants/theme/theme-option'

export default function SectionHeader({
  text,
  tip,
  style,
}: {
  text: string | undefined
  tip?: string
  style?: CSSProperties
}) {
  const { forThemeOption } = useContext(ThemeContext)

  if (text === undefined) return null

  const _style: CSSProperties = {
    fontSize: '15px',
    fontFamily: 'TeXGyreAdventor-Bold, TeXGyreAdventor',
    color: '#1D1D1D',
    lineHeight: '15px',
    fontWeight:
      forThemeOption &&
      forThemeOption({
        [ThemeOption.light]: 600,
        [ThemeOption.dark]: 400,
      }),
    ...style,
  }

  if (tip !== undefined) {
    return <TooltipLabel label={text} tip={tip} style={_style} />
  } else {
    return <h4 style={_style}>{text}</h4>
  }
}
