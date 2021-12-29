import { SemanticTheme } from 'models/semantic-theme/theme'
import { CSSProperties } from 'react'

export const shadowCard = (theme: SemanticTheme): CSSProperties => ({
  // background: theme.colors.background.l2,
  // boxShadow: '10px 10px ' + theme.colors.background.l1,
  background: '#FFFFFF',
  boxShadow: '0px 0px 4px 0px rgba(150, 144, 171, 0.29)',
  border: '1px solid #D3DCEE',
  borderRadius: theme.radii.lg,
  stroke: 'none',
})
