import React, { CSSProperties, useContext, useState } from 'react'
import { Col, Row, Space } from 'antd'

import { useForm } from 'antd/lib/form/Form'

import Tools from '../icons/Tools'
import WalletIcon from '../icons/WalletIcon'
import Dworld from '../icons/Dworld'
import TheDworld from '../icons/TheDworld'
import { ProjectContext } from '../../contexts/projectContext'

import { ProjectFormFields } from '../Create/ProjectForm'
import DetailSettingpopupModal from '../modals/DetailSettingpopupModal'
import DetailToolsModal from '../modals/DetailToolsModal'
import DetailEditShow from './DetailEditShow'
import ProjectLogo from '../shared/ProjectLogo'

export default function ProjectTitle() {
  const [DetailSettingModalVisible, setDetailSettingModalVisible] =
    useState<boolean>(false)
  const { projectId, handle, metadata, isPreviewMode } =
    useContext(ProjectContext)
  const [DetailToolsModalVisible, setDetailToolsModalVisible] =
    useState<boolean>(false)

  const prettyUrl = (url: string) => {
    if (url.startsWith('https://')) {
      return url.split('https://')[1]
    } else if (url.startsWith('http://')) {
      return url.split('http://')[1]
    } else return url
  }

  const linkUrl = (url: string) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url
    }
    return 'http://' + url
  }
  const [projectForm] = useForm<ProjectFormFields>()

  const ImageUri = metadata?.logoUri
  const ProjectName = metadata?.name || 'Untitled project'
  const UniqueHandle = handle || 'Undefind'
  const ProjectDescription = metadata?.description
  const ProjectWebsite = metadata?.infoUri
  const Twitter = metadata?.twitter
  const Discord = metadata?.discord

  const TitleStyle: CSSProperties = {
    fontSize: '24px',
    color: '#555252',
    fontWeight: 'bold',
    fontFamily: 'GoodTimesW00-Bold, GoodTimesW00',
    lineHeight: '35px',
    marginBottom: '10px',
  }
  const ToolsIcon: CSSProperties = {
    textAlign: 'right',
    color: '#6D6B6B',
    fontSize: '14px',
    position: 'relative',
    float: 'right',
    cursor: 'pointer',
  }
  // const ImageReplace: CSSProperties = {
  //   width: '100%',
  //   minHeight: '150px',
  //   fontSize: '2.5rem',
  //   background: '#e4dfd7',
  //   borderRadius: '10px',
  //   padding: '40px',
  //   textAlign: 'center',
  // }

  const SpaceIcon = (
    text: string,
    Icon: any,
    Title: boolean,
    twitter: boolean,
  ) => (
    <Col
      style={{
        fontSize: '12px',
        width: '24%',
        position: 'relative',
      }}
      span={7}
    >
      <div
        style={{
          position: 'absolute',
          top: '2px',
        }}
      >
        {Icon}
      </div>
      <a
        style={{
          textDecoration: 'none',
          color: '#00DAC5',
          marginLeft: '20px',
        }}
        href={twitter ? 'https://twitter.com/' + text : linkUrl(text)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {Title && '@'}
        {text}
      </a>
    </Col>
  )

  if (!projectId) return null
  return (
    <div>
      {!isPreviewMode && (
        <div style={{ height: '25px' }}>
          <Space
            style={ToolsIcon}
            onClick={() => setDetailToolsModalVisible(true)}
          >
            <div style={{ position: 'absolute', top: '2px', left: '-5px' }}>
              <Tools size={13} />
            </div>
            <p style={{ marginLeft: '5px' }}>ID: {projectId.toNumber()}</p>
          </Space>
        </div>
      )}
      <Row gutter={20}>
        <Col span={6}>
          <ProjectLogo
            uri={ImageUri}
            name={ProjectName}
            // size={isHome ? 175 : 158}
          />
        </Col>
        <Col span={17}>
          <p style={TitleStyle}>
            {ProjectName}
            <span
              className="editIcon"
              onClick={() => setDetailSettingModalVisible(true)}
            >
              <DetailEditShow />
            </span>
          </p>
          <p
            style={{
              color: '#777576',
              fontSize: '13px',
              fontWeight: 'bold',
            }}
          >
            @ {UniqueHandle}
          </p>
          <Row>
            {ProjectWebsite &&
              SpaceIcon(
                prettyUrl(ProjectWebsite),
                <WalletIcon size={13} />,
                false,
                false,
              )}
            {Twitter &&
              SpaceIcon(prettyUrl(Twitter), <Dworld size={13} />, true, true)}
            {Discord &&
              SpaceIcon(
                prettyUrl(Discord),
                <TheDworld size={13} />,
                true,
                false,
              )}
          </Row>
          <p style={{ marginTop: '15px' }}>{ProjectDescription}</p>
        </Col>
      </Row>
      <DetailSettingpopupModal
        form={projectForm}
        metadata={metadata}
        projectId={projectId}
        handle={handle}
        visible={DetailSettingModalVisible}
        onSuccess={() => setDetailSettingModalVisible(false)}
        onCancel={() => setDetailSettingModalVisible(false)}
      />
      <DetailToolsModal
        visible={DetailToolsModalVisible}
        onCancel={() => setDetailToolsModalVisible(false)}
      />
    </div>
  )
}
