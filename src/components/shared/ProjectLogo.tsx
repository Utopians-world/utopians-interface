// import { ThemeContext } from 'contexts/themeContext'
// import { useContext } from 'react'
import DefaultUri from 'assets/images/default-pro-icon.png'

export default function ProjectLogo({
  uri,
  name,
  size,
}: {
  uri: string | undefined
  name: string | undefined
  size?: number
}) {
  // const {
  //   theme: { colors },
  // } = useContext(ThemeContext)
  const _size = size ?? 80

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        height: _size,
        width: _size,
        background: uri ? undefined : '#ffffff',
      }}
    >
      {uri ? (
        <img
          style={{
            maxHeight: '100%',
            minWidth: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          src={uri}
          alt={name + ' logo'}
        />
      ) : (
        <img
          style={{
            maxHeight: '100%',
            minWidth: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          src={DefaultUri}
          alt="default logo"
        />
      )}
    </div>
  )
}
