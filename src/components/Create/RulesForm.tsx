import { CheckCircleFilled } from '@ant-design/icons'
import { Button, Space, Divider } from 'antd'

// import { NetworkContext } from 'contexts/networkContext'
import { ThemeContext } from 'contexts/themeContext'
import { constants, utils } from 'ethers'
import { useContext, useLayoutEffect, useState } from 'react'

import { ballotStrategies } from 'constants/ballot-strategies'

import './index.scss'

export default function RulesForm({
  initialBallot,
  onSave,
  onDeployBtn,
  isDisable,
}: {
  initialBallot: string
  onSave: (ballot: string) => void
  onDeployBtn?: VoidFunction
  isDisable?: boolean
}) {
  // const { signerNetwork } = useContext(NetworkContext)
  const [selectedIndex, setSelectedIndex] = useState<number>()
  const [customStrategyAddress, setCustomStrategyAddress] = useState<string>()

  useLayoutEffect(() => {
    const index = ballotStrategies.findIndex(
      s => s.address.toLowerCase() === initialBallot.toLowerCase(),
    )
    if (index > -1) setSelectedIndex(index)
    else {
      setSelectedIndex(ballotStrategies.length)
      setCustomStrategyAddress(initialBallot)
    }
  }, [initialBallot])

  const {
    theme: { colors },
  } = useContext(ThemeContext)

  const buildOption = (title: string, content: JSX.Element, index: number) => (
    <div
      key={index}
      className="stepRulesCon"
      style={{
        cursor: 'pointer',
        ...(index === selectedIndex ? { border: '2px solid #3A1FF5' } : {}),
      }}
      onClick={() => setSelectedIndex(index)}
    >
      <div className="stepRulesConTxt">
        <h3
          style={{
            color: index === selectedIndex ? '#241515' : '#5F5E61',
          }}
        >
          {title}
        </h3>
        {content}
      </div>
      <div
        style={{
          minWidth: 20,
          marginLeft: 4,
        }}
      >
        {index === selectedIndex ? (
          <CheckCircleFilled style={{ fontSize: '22px', color: '#3A1FF5' }} />
        ) : (
          <p
            style={{
              margin: 0,
              width: '22px',
              height: '22px',
              border: '2px solid #D3DCEE',
              borderRadius: '50%',
            }}
          ></p>
        )}
      </div>
    </div>
  )

  const SpaceSizeMobile = window.innerWidth > 500 ? 'large' : 0
  return (
    <Space
      direction="vertical"
      size={SpaceSizeMobile}
      style={{ width: '100%' }}
    >
      <div className="stepTopCon">
        <h1>Reconfiguration</h1>
        <h2>
          Rules for how this project's funding cycles can be reconfigured.
        </h2>
        <Divider className="stepTopConDivider" />
      </div>

      <div className="stepRulesSection">
        {ballotStrategies.map((s, i) =>
          buildOption(
            s.name,
            <div>
              <p>{s.description}</p>
              <p
                className="stepRulesTxtAddress"
                style={{ color: colors.text.tertiary }}
              >
                Contract address: {s.address}
              </p>
            </div>,
            i,
          ),
        )}
        {/* {buildOption(
          'Custom strategy',
          <div>
            <Input
              style={{ width: 380 }}
              value={customStrategyAddress}
              placeholder={constants.AddressZero}
              onChange={e =>
                setCustomStrategyAddress(e.target.value.toLowerCase())
              }
            />
            <p>
              The address of any smart contract deployed on {signerNetwork} that
              implements{' '}
              <a
                style={{ color: '#3A1FF5' }}
                // href="https://github.com/upt-protocol/juice-contracts-v1/blob/05828d57e3a27580437fc258fe9041b2401fc044/contracts/FundingCycles.sol"
                href="https://github.com/jbx-protocol/juice-contracts-v1/blob/05828d57e3a27580437fc258fe9041b2401fc044/contracts/FundingCycles.sol"
                target="_blank"
                rel="noopener noreferrer"
              >
                this interface
              </a>
              .
            </p>
          </div>,
          ballotStrategies.length,
        )} */}
      </div>
      <div className="stepSaveDeployBtnsCon">
        {onDeployBtn && (
          <Button
            htmlType="submit"
            type="primary"
            className="stepDeployBtn"
            onClick={() => {
              onDeployBtn()
            }}
            disabled={isDisable}
          >
            deploy Project
          </Button>
        )}
        <Button
          className="stepSaveBtn"
          htmlType="submit"
          type="primary"
          disabled={
            selectedIndex === undefined ||
            (selectedIndex === ballotStrategies.length &&
              (!customStrategyAddress ||
                !utils.isAddress(customStrategyAddress)))
          }
          onClick={() => {
            onSave(
              selectedIndex !== undefined &&
                selectedIndex < ballotStrategies.length
                ? ballotStrategies[selectedIndex].address
                : customStrategyAddress ?? constants.AddressZero,
            )
          }}
        >
          Save
        </Button>
      </div>
    </Space>
  )
}
