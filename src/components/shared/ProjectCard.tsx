import { Tooltip } from 'antd'
// import { ThemeContext } from 'contexts/themeContext'
import { BigNumber } from 'ethers'

import { useProjectMetadata } from 'hooks/ProjectMetadata'
import { Project } from 'models/subgraph-entities/project'
// import { useContext } from 'react'
import { formatDate } from 'utils/formatDate'
import { formatWad } from 'utils/formatNumber'

import CurrencySymbol from './CurrencySymbol'
import Loading from './Loading'
import ProjectLogo from './ProjectLogo'

import './styles/projectCard.scss'

export default function ProjectCard({
  project,
  selectedtab,
}: {
  project: Pick<Project, 'handle' | 'uri' | 'totalPaid' | 'createdAt'>
  selectedtab?: string
}) {
  // const {
  //   theme: { colors, radii },
  // } = useContext(ThemeContext)

  const { data: metadata } = useProjectMetadata(project.uri)
  // If the total paid is greater than 0, but less than 10 ETH, show two decimal places.
  const decimals =
    project.totalPaid?.gt(0) &&
    project.totalPaid.lt(BigNumber.from('10000000000000000000'))
      ? 2
      : 0
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
                  <CurrencySymbol currency={0} />
                  {formatWad(project.totalPaid, { decimals })}{' '}
                </span>
              </div>
              <div className="proCardConRightConBottom">
                <span className="">Cycle #2</span>
                {!!project.createdAt &&
                  formatDate(project.createdAt * 1000, 'MM-DD-YY')}
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
