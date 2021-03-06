import { ThemeContext } from 'contexts/themeContext'
import { ChildElems } from 'models/child-elems'
import { CSSProperties, useContext } from 'react'

import { shadowCard } from 'constants/styles/shadowCard'

export function CardSection({
  header,
  padded = true,
  noShadow,
  children,
  style,
}: {
  header?: string
  padded?: boolean
  noShadow?: boolean
  children?: ChildElems
  style?: CSSProperties
}) {
  const { theme } = useContext(ThemeContext)
  return (
    <div
      style={{
        marginBottom: noShadow ? 0 : 10,
      }}
      className="cardWrapper"
    >
      {header && (
        <h2
          style={{
            margin: 0,
            fontWeight: 600,
          }}
        >
          {header}
        </h2>
      )}
      <div
        style={{
          ...shadowCard(theme),
          overflow: 'hidden',
          ...style,
          ...(padded ? { padding: 16 } : {}),
        }}
      >
        {children}
      </div>
    </div>
  )
}
