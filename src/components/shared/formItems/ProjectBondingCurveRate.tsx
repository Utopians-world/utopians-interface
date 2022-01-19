import { Form } from 'antd'
import { InfoCircleFilled } from '@ant-design/icons'
// import { ThemeContext } from 'contexts/themeContext'
import {
  CSSProperties,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react'

import NumberSlider from '../inputs/NumberSlider'
import { FormItemExt } from './formItemExt'

export default function ProjectBondingCurveRate({
  name,
  hideLabel,
  value,
  formItemProps,
  onChange,
  disabled,
  disableBondingCurve,
}: {
  value: string | undefined
  onChange: (val?: number) => void
  disableBondingCurve?: string
} & FormItemExt) {
  // const { colors } = useContext(ThemeContext).theme
  const [calculator, setCalculator] = useState<any>()

  const graphContainerId = 'graph-container'
  const bondingCurveId = 'bonding-curve'
  const baseCurveId = 'base-curve'

  useLayoutEffect(() => {
    try {
      // https://www.desmos.com/api/v1.6/docs/index.html
      setCalculator(
        Desmos.GraphingCalculator(document.getElementById(graphContainerId), {
          keypad: false,
          expressions: false,
          settingsMenu: false,
          zoomButtons: false,
          expressionsTopbar: false,
          pointsOfInterest: false,
          trace: false,
          border: false,
          lockViewport: true,
          images: false,
          folders: false,
          notes: false,
          sliders: false,
          links: false,
          distributions: false,
          pasteTableData: false,
          showGrid: false,
          showXAxis: false,
          showYAxis: false,
          xAxisNumbers: false,
          yAxisNumbers: false,
          polarNumbers: false,
        }),
      )
    } catch (e) {
      console.log('Error setting calculator', e)
    }
  }, [])

  const graphCurve = useCallback(
    (_value?: number) => {
      if (_value === undefined || !calculator) return

      const overflow = 10
      const supply = 10

      calculator.setMathBounds({
        left: 0,
        bottom: 0,
        right: 10,
        top: 10,
      })
      calculator.removeExpressions([
        { id: bondingCurveId },
        { id: baseCurveId },
      ])
      calculator.setExpression({
        id: bondingCurveId,
        latex: `y=${overflow} * (x/${supply}) * (${_value / 100} + (x - x${
          _value / 100
        })/${supply})`,
        color: '#7C85CB',
      })
      calculator.setExpression({
        id: baseCurveId,
        latex: `y=x`,
        color: '#7C85CB',
      })
    },
    [calculator],
  )

  useEffect(
    () => graphCurve(parseFloat(value ?? '0')),
    [calculator, graphCurve, value],
  )

  const labelStyle: CSSProperties = {
    fontSize: '.7rem',
    fontWeight: 500,
    textAlign: 'center',
    position: 'absolute',
  }

  const graphSize = 520
  const graphHeight = 190
  const graphPad = 50

  return (
    <Form.Item
      className="stepIncSlider"
      name={name}
      label={hideLabel ? undefined : 'Bonding curve rate'}
      extra={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexFlow: 'column wrap',
          }}
        >
          {disableBondingCurve && (
            <div
              className="stepExtraCon"
              style={{ width: '100%', marginBottom: '20px', marginTop: '24px' }}
            >
              <InfoCircleFilled
                style={{ color: '#000', fontSize: '20px', marginRight: '10px' }}
              />
              {disableBondingCurve}
            </div>
          )}
          <div style={{ width: '100%', position: 'relative' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: graphHeight,
                width: graphSize,
              }}
            >
              <div
                id={graphContainerId}
                style={{
                  width: graphSize - graphPad,
                  height: graphHeight - graphPad,
                }}
              ></div>
            </div>

            <div
              style={{
                position: 'absolute',
                top: graphPad / 2,
                left: graphPad / 2,
                width: graphSize - graphPad,
                height: graphHeight - graphPad,
                borderLeft: '2px solid #898E92',
                borderBottom: '2px solid #898E92',
              }}
            ></div>

            <div
              style={{
                ...labelStyle,
                bottom: 0,
                left: 0,
                right: 0,
              }}
            >
              % tokens redeemed
            </div>

            <div
              style={{
                ...labelStyle,
                transform: 'rotate(-90deg)',
                bottom: 0,
                top: 0,
                left: 0,
                width: graphHeight,
              }}
            >
              Token redeem value
            </div>
          </div>
        </div>
      }
      {...formItemProps}
    >
      <NumberSlider
        min={0}
        max={80}
        step={0.5}
        sliderValue={parseFloat(value ?? '0')}
        disabled={disabled}
        onChange={val => {
          graphCurve(val)
          onChange(val)
        }}
        suffix="%"
      />
    </Form.Item>
  )
}
