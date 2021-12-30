import { CSSProperties, useCallback, useLayoutEffect, useState } from 'react'
import { Modal, Space } from 'antd'

import ModalTab from '../ProjectsDetail/ModalTab'
// import NumberSlider from "../shared/inputs/NumberSlider";
import NumberSlider from '../shared/inputs/NumberSlider'

export default function DetailIncentivesModal({
  visible,
  disableDiscountRate,
  disableBondingCurve,
  onSuccess,
  onCancel,
}: {
  visible?: boolean
  disableDiscountRate?: string
  disableBondingCurve?: string
  onSuccess?: VoidFunction
  onCancel?: VoidFunction
}) {
  const [loading] = useState<boolean>()
  const DivInputStyle: CSSProperties = {
    marginBottom: '15px',
    width: '48%',
  }
  const [discountRate, setDiscountRate] = useState<string>()
  const [bondingCurveRate, setBondingCurveRate] = useState<string>()
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

  const graphSize = 520
  const graphHeight = 190
  const graphPad = 50

  const labelStyle: CSSProperties = {
    fontSize: '.7rem',
    fontWeight: 500,
    textAlign: 'center',
    position: 'absolute',
  }

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

  return (
    <Modal
      title={'Edit incentives'}
      visible={visible}
      onCancel={onCancel}
      confirmLoading={loading}
      width={1080}
      centered={true}
      cancelText={'CANCEL'}
      okText={'SAVE CHANGES'}
      className="projectModal"
    >
      <Space
        direction="vertical"
        size="large"
        style={{ width: '100%', paddingTop: 0 }}
      >
        <ModalTab
          textFirst={'Changes will be applied to the'}
          textSecond={' upcoming '}
          textLast={'funding cycle.'}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'left',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              marginBottom: '15px',
              width: '48%',
              marginRight: '4%',
            }}
            className="IncentivesModalLeft"
          >
            <p style={{ fontWeight: 400, fontSize: '13px' }}>
              The ratio of tokens rewarded per payment amount will decrease by
              this percentage with each new funding cycle. A higher discount
              rate will incentivize supporters to pay your project earlier than
              later.
            </p>
            <p
              style={{
                fontWeight: 'bold',
                fontSize: '15px',
                marginTop: '10px',
              }}
            >
              Discount rate
            </p>
            <NumberSlider
              max={20}
              sliderValue={parseFloat(discountRate?.toString() ?? '0' ?? '0')}
              suffix="%"
              onChange={(val?: number) => setDiscountRate(val?.toString())}
              step={0.1}
              disabled={!!disableDiscountRate}
            />
            <ModalTab
              textFirst={
                'Bonding curve disabled while no funding target is set.'
              }
            />
          </div>
          <div style={DivInputStyle} className="IncentivesModalRight">
            <p style={{ fontWeight: 400, fontSize: '13px' }}>
              This rate determines the amount of overflow that each token can be
              redeemed for at any given time. On a lower bonding curve,
              redeeming a token increases the value of each remaining token,
              creating an incentive to hodl tokens longer than others. A bonding
              curve of 100% means all tokens will have equal value regardless of
              when they are redeemed.
            </p>
            <p
              style={{
                fontWeight: 'bold',
                fontSize: '15px',
                marginTop: '10px',
              }}
            >
              Bonding curve rate
            </p>
            <NumberSlider
              min={0}
              max={100}
              step={0.5}
              sliderValue={parseFloat(
                bondingCurveRate?.toString() ?? '0' ?? '0',
              )}
              disabled={!!disableBondingCurve}
              onChange={val => {
                graphCurve(val)
                setBondingCurveRate(val?.toString())
              }}
              suffix="%"
            />
            <ModalTab
              textFirst={
                'Bonding curve disabled while no funding target is set.'
              }
            />
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
        </div>
      </Space>
    </Modal>
  )
}
