import { Progress, Tooltip } from 'antd'
// import { ThemeContext } from 'contexts/themeContext'
import { BigNumber } from 'ethers'

import { useProjectMetadata } from 'hooks/ProjectMetadata'
import { Project } from 'models/subgraph-entities/project'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { formatDate } from 'utils/formatDate'
import { formatWad } from 'utils/formatNumber'

import { ContractName } from 'models/contract-name'
import { FundingCycle } from 'models/funding-cycle'
import useContractReader from 'hooks/ContractReader'
import { deepEqFundingCycles } from 'utils/deepEqFundingCycles'

import CurrencySymbol from './CurrencySymbol'
import Loading from './Loading'
import ProjectLogo from './ProjectLogo'

import './styles/projectCard.scss'

export default function ProjectCard({
  project,
  selectedtab,
}: {
  project: Pick<
    Project,
    | 'handle'
    | 'uri'
    | 'id'
    | 'totalPaid'
    | 'createdAt'
    | 'currentBalance'
    | 'totalRedeemed'
  >
  selectedtab?: string
}) {
  // const {
  //   theme: { colors, radii },
  // } = useContext(ThemeContext)
  console.log(project.handle)
  console.log(project)
  const { data: metadata } = useProjectMetadata(project.uri)

  const [isDuration, isSetDuration] = useState('')
  const [cyclesNum, setCyclesNum] = useState('')

  const currentFC = useContractReader<FundingCycle>({
    contract: ContractName.FundingCycles,
    functionName: 'currentOf',
    args: project.id ? [project.id.toHexString()] : null,
    valueDidChange: useCallback((a, b) => !deepEqFundingCycles(a, b), []),
    updateOn: useMemo(
      () =>
        project.id
          ? [
              {
                contract: ContractName.FundingCycles,
                eventName: 'Configure',
                topics: [[], project.id.toHexString()],
              },
              {
                contract: ContractName.TerminalV1,
                eventName: 'Pay',
                topics: [[], project.id.toHexString()],
              },
              {
                contract: ContractName.TerminalV1,
                eventName: 'Tap',
                topics: [[], project.id.toHexString()],
              },
            ]
          : undefined,
      [project],
    ),
  })

  const secsPerDay = 60 * 60 * 24
  const endTime = currentFC?.start
    .add(currentFC.duration.mul(secsPerDay))
    .mul(1000)

  const secondsLeft = endTime
    ? BigNumber.from(endTime).sub(Math.floor(Date.now().valueOf())).toNumber() /
      1000
    : 0

  const duration = currentFC
    ? BigNumber.from(currentFC.duration.mul(secsPerDay)).toNumber()
    : 0
  const progress = 100 - Math.floor((secondsLeft / duration) * 100)
  // If the total paid is greater than 0, but less than 10 ETH, show two decimal places.
  const decimals =
    project.totalPaid?.gt(0) &&
    project.totalPaid.lt(BigNumber.from('10000000000000000000'))
      ? 2
      : 0
  // const tmpBalance = project.currentBalance?.gt(0)
  //   ? formatWad(project.currentBalance, { decimals })
  //   : 0
  // const tmpPaid = project.totalPaid?.gt(0)
  //   ? formatWad(project.totalPaid, { decimals })
  //   : 1

  // const progressData =
  //   fracDiv((tmpBalance ?? 0)?.toString(), (tmpPaid ?? 1)?.toString()) * 100

  useEffect(() => {
    // console.log(currentFC?.number.toString(), 'number')
    // console.log(progress, 'progress')
    // console.log(currentFC?.duration.toString(), 'duration')
    isSetDuration(currentFC ? currentFC.duration.toString() : '0')
    setCyclesNum(currentFC ? currentFC.number.toString() : '0')
  }, [currentFC])

  return (
    <div
      // style={{
      //   padding: 20,
      //   borderRadius: radii.md,
      //   cursor: 'pointer',
      //   overflow: 'hidden',
      // }}
      className="proCardCon"
      key={project?.handle}
      onClick={() => (window.location.hash = '/p/' + project.handle)}
    >
      {metadata ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            whiteSpace: 'pre',
            overflow: 'hidden',
            width: '100%',
          }}
        >
          <div className="proCardConLeft">
            <ProjectLogo
              uri={metadata.logoUri}
              name={metadata.name}
              size={158}
            />
          </div>

          <div className="proCardConRight">
            <h3 className="title">{metadata.name}</h3>

            {metadata.description && (
              <Tooltip title={metadata.description} placement="bottom">
                <h4 className="subTitle">{metadata.description}</h4>
              </Tooltip>
            )}
            {selectedtab === 'selectedtab' && (
              <span className="archivedTip">ARCHIVED</span>
            )}
            <div className="proCardConRightCon">
              <div className="proCardConRightConTop">
                <p className="volume">Volume</p>
                <span className="price">
                  <CurrencySymbol
                    style={{ height: '27px', marginRight: '10px' }}
                    currency={0}
                  />
                  {formatWad(project.totalPaid, { decimals })}{' '}
                </span>
              </div>
              <div className="proCardConRightConTop">
                since&nbsp;
                {!!project.createdAt &&
                  formatDate(project.createdAt * 1000, 'MM-DD-YY')}
              </div>
              <div className="proCardConRightConBottom">
                {isDuration !== '0' && (
                  <>
                    <span className="">Cycle #{cyclesNum}</span>
                    <Progress
                      percent={progress}
                      showInfo={false}
                      strokeColor={'#00DAC5'}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {project.handle} <Loading />
        </div>
      )}
    </div>
  )
}
