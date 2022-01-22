import { Button, Select, Space, Tooltip } from 'antd'
import { InfoCircleFilled, CaretDownOutlined } from '@ant-design/icons'
import Loading from 'components/shared/Loading'
import ProjectsGrid from 'components/shared/ProjectsGrid'

import { ThemeContext } from 'contexts/themeContext'
import { useInfiniteProjectsQuery } from 'hooks/Projects'
import { ProjectState } from 'models/project-visibility'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { createGlobalStyle } from 'styled-components'

// import { layouts } from 'constants/styles/layouts'
import BodyBg from 'assets/images/home-pic.png'
import './index.scss'

type OrderByOption = 'createdAt' | 'totalPaid'

const pageSize = 20

export default function Projects() {
  const [selectedTab, setSelectedTab] = useState<ProjectState>('active')
  const [orderBy, setOrderBy] = useState<OrderByOption>('totalPaid')

  const loadMoreContainerRef = useRef<HTMLDivElement>(null)

  const {
    theme: { colors },
  } = useContext(ThemeContext)

  const GlobalStyle = createGlobalStyle`
    body {
      background-image: url(${BodyBg});
      background-repeat: no-repeat;
      background-position: top center;
      background-size: cover;
    }
  `

  const {
    data: pages,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteProjectsQuery({
    orderBy,
    pageSize,
    orderDirection: 'desc',
    filter: selectedTab,
  })

  // When we scroll within 200px of our loadMoreContainerRef, fetch the next page.
  useEffect(() => {
    if (loadMoreContainerRef.current) {
      const observer = new IntersectionObserver(
        entries => {
          if (entries.find(e => e.isIntersecting) && hasNextPage) {
            fetchNextPage()
          }
        },
        {
          rootMargin: '200px',
        },
      )
      observer.observe(loadMoreContainerRef.current)

      return () => observer.disconnect()
    }
  }, [fetchNextPage, hasNextPage])

  const concatenatedPages = pages?.pages?.reduce(
    (prev, group) => [...prev, ...group],
    [],
  )

  const tab = (tab: ProjectState) => (
    <div
      style={{
        textTransform: 'uppercase',
        cursor: 'pointer',
        borderBottom: '5px solid transparent',
        fontFamily: 'TeXGyreAdventor-Bold, TeXGyreAdventor',
        ...(tab === selectedTab
          ? {
              color: '#303030',
              borderImageSource:
                'linear-gradient(90deg, #06E6DA 0%, #3297DA 30%, #B5A8EE 62%, #FFFFFF 100%)',
              borderImageSlice: '0 0 1 0',
            }
          : {
              color: '#5F5E61',
              borderColor: 'transparent',
            }),
      }}
      className="proTab"
      onClick={() => setSelectedTab(tab)}
    >
      {tab}
    </div>
  )

  return (
    <div className="proWrapper">
      <GlobalStyle />
      <div className="firstWrapper">
        <div
          style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}
        >
          <h1 className="firstTitle">PROJECT ON UTOPIANS</h1>
          <p className="firstDes">
            The Utopians protocol is open to anyone, and project configurations
            can vary widely. There are risks associated with interacting with
            all projects on the protocol. Projects built on the protocol are not
            endorsed or vetted by Utopians DAO, so you should do your own
            research and understand the risks before committing your funds.
          </p>
        </div>
        <div className="firstWrapperBottom">
          <a href="/#/create">
            <Button className="createProBtn">+ BUILD PROJECT</Button>
          </a>
        </div>
      </div>
      <div style={{ width: '100%', backgroundColor: '#F6F8FF' }}>
        <div className="secondWrapper" style={{ paddingBottom: '33px' }}>
          <div className="secondSelectCon">
            <div style={{ borderBottom: '3px solid #DFE7FF' }}>
              <Space direction="horizontal" size={37}>
                {tab('active')}
                {tab('archived')}
              </Space>
            </div>

            <div>
              <Space direction="horizontal">
                <Select
                  value={orderBy}
                  onChange={setOrderBy}
                  bordered
                  style={{
                    width: 211,
                  }}
                  suffixIcon={
                    <CaretDownOutlined style={{ color: '#2713E1' }} />
                  }
                >
                  <Select.Option value="totalPaid">Volume</Select.Option>
                  <Select.Option value="createdAt">Created</Select.Option>
                </Select>
              </Space>
            </div>
          </div>

          {selectedTab === 'archived' && (
            <p className="archivedNote">
              <InfoCircleFilled
                style={{
                  color: 'rgba(1, 1, 1, 0.64)',
                  fontSize: '27px',
                  marginRight: '32px',
                }}
              />
              <span>
                Archived projects have not been modified or deleted on the
                blockchain, and can still be interacted with directly through
                the Utopians contracts.{' '}
                <Tooltip title="If you have a project you'd like to archive, let the Utopians team know in Telegram.">
                  <span
                    style={{
                      color: colors.text.action.primary,
                      fontWeight: 500,
                      cursor: 'default',
                    }}
                  >
                    How do I archive a project?
                  </span>
                </Tooltip>
              </span>
            </p>
          )}

          {concatenatedPages && (
            <ProjectsGrid
              projects={concatenatedPages}
              selectedtab={selectedTab}
            />
          )}
          {(isLoading || isFetchingNextPage) && <Loading />}

          {/* Place a div below the grid that we can connect to an intersection observer */}
          <div ref={loadMoreContainerRef} />

          {hasNextPage && !isFetchingNextPage && (
            <div
              role="button"
              style={{
                textAlign: 'center',
                color: colors.text.secondary,
                cursor: 'pointer',
              }}
              onClick={() => fetchNextPage()}
            >
              Load more
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
