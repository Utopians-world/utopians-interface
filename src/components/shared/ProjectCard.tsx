import { Progress, Tooltip } from 'antd'
// import { ThemeContext } from 'contexts/themeContext'
import { BigNumber } from 'ethers'

import { useProjectMetadata } from 'hooks/ProjectMetadata'
import { Project } from 'models/subgraph-entities/project'
// import { useContext } from 'react'
import { formatDate } from 'utils/formatDate'
import { formatWad, fracDiv } from 'utils/formatNumber'

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
  // If the total paid is greater than 0, but less than 10 ETH, show two decimal places.
  const decimals =
    project.totalPaid?.gt(0) &&
    project.totalPaid.lt(BigNumber.from('10000000000000000000'))
      ? 2
      : 0
  const tmpBalance = project.currentBalance?.gt(0)
    ? formatWad(project.currentBalance, { decimals })
    : 0
  const tmpPaid = project.totalPaid?.gt(0)
    ? formatWad(project.totalPaid, { decimals })
    : 1

  const progressData =
    fracDiv((tmpBalance ?? 0)?.toString(), (tmpPaid ?? 1)?.toString()) * 100

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
                <span className="">Cycle</span>
                <Progress
                  percent={progressData ? Math.max(progressData, 1) : 0}
                  showInfo={false}
                  strokeColor={'#00DAC5'}
                />
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
