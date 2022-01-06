import { Button, Col, Row } from 'antd'
// import Create from 'components/Create'
import Loading from 'components/shared/Loading'

import { ThemeContext } from 'contexts/themeContext'

import { useProjectsQuery } from 'hooks/Projects'

import { CSSProperties, useContext } from 'react'
import { Trans } from '@lingui/macro'
import { t } from '@lingui/macro'

// import { ThemeOption } from 'constants/theme/theme-option'

import AtomIcon from 'assets/images/atom-icon.png'
import CellIcon from 'assets/images/cell-icon.png'
import ChartIcon from 'assets/images/chart-icon.png'
import DnaIcon from 'assets/images/dna-icon.png'

import Rectangles from 'assets/images/Rectangles.png'
import Rectangles1 from 'assets/images/Rectangles1.png'
import Rectangles2 from 'assets/images/Rectangles2.png'
import Rectangles3 from 'assets/images/Rectangles3.png'

import './index.scss'
import ProjectsGrid from '../shared/ProjectsGrid'

export default function Home() {
  const { theme } = useContext(ThemeContext)

  const colors = theme.colors

  const totalMaxWidth = 1440

  const bigHeader = (text: string) => (
    <h1
      className="firstTitle"
      style={{
        fontSize: '2.4rem',
        fontWeight: 600,
        lineHeight: 1.2,
        margin: 0,
      }}
    >
      {text}
    </h1>
  )

  const { data: previewProjects } = useProjectsQuery({
    pageSize: 4,
    filter: 'active',
  })

  const smallHeader = (text: string | React.ReactNode, c_name: string) => (
    <>
      <h2 className={c_name}>
        {text}
        {c_name === 'secondTitle' && <p className="titleLine"></p>}
      </h2>
    </>
  )

  const smallDes = (text: string) => <p className="secondDes">{text}</p>

  // const listData = [
  //   t`Indie artists, devs, creators`,
  //   t`Ethereum protocols and DAOs`,
  //   t`Public goods and services`,
  //   t`Open source businesses`,
  // ]

  const section: CSSProperties = {
    padding: '80px 40px',
    backgroundColor: '#ffffff',
  }

  const wrapper: CSSProperties = {
    maxWidth: totalMaxWidth,
    margin: '0 auto',
  }

  const fourthCol = (
    header: string,
    text: string,
    imgUrl: string,
    imgAlt: string,
  ) => (
    <div className="communityCon">
      <img src={imgUrl} alt={imgAlt} />
      <h3>{header}</h3>
      <p>{text}</p>
    </div>
  )
  return (
    <div className="homeWrapper">
      <section className="firstSection">
        <div
          style={{
            ...wrapper,
            padding: '0 80px',
          }}
        >
          <Row align="middle" justify="space-around">
            <Col
              xs={24}
              md={12}
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingBottom: 60,
              }}
              className="firstSectionLeft"
            >
              <div
                style={{
                  display: 'grid',
                  rowGap: 30,
                }}
              >
                <a
                  style={{
                    color: colors.text.metisgreen,
                    fontSize: '1.25rem',
                    lineHeight: 1.5,
                    fontWeight: 600,
                  }}
                  href="https://www.metis.io/metis-to-launch-andromeda/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Power by trusted smart contracts on Andromeda
                </a>
                {bigHeader(t`Community funding Beyond Imagination`)}
                <div className="firstNote">
                  <Trans>
                    Don't let your dreams disappear. Build a Utopians that
                    provides a forum to meet like-minded people, get funding,
                    and program its spending.
                    <br />
                    It's simple to use and extremely powerful.
                  </Trans>
                </div>

                <div className="hide-mobile">
                  <div style={{ display: 'inline-block' }}>
                    <a href="/#/create">
                      <Button className="createProjectBtn">
                        + build project
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </Col>

            <Col xs={24} md={12}></Col>
          </Row>
        </div>
      </section>

      <section style={section}>
        <div
          style={{
            ...wrapper,
          }}
          className="sectionWrapper"
        >
          {smallHeader(
            <>
              A better <span>solution</span> for?
            </>,
            'secondTitle',
          )}
          {smallDes(
            'We support people from different application scenarios and  groups to quick create their own project for funding',
          )}
          <Row
            gutter={44}
            justify="space-between"
            style={{ width: '100%', position: 'relative' }}
          >
            <img
              style={{ position: 'absolute', right: '-30px', top: '20px' }}
              src={Rectangles}
              alt=""
            />
            <Col xs={24} md={12} lg={6}>
              {fourthCol(
                'Individuals',
                'Crypto developers and Indie artists',
                AtomIcon,
                'atom',
              )}
            </Col>
            <Col xs={24} md={12} lg={6}>
              {fourthCol(
                'Buyers',
                'Raise funds for collections, art, or other goods and services',
                CellIcon,
                'cell',
              )}
            </Col>
            <Col xs={24} md={12} lg={6}>
              {fourthCol(
                'DACs',
                'Any DAC that needs to get funding',
                DnaIcon,
                'dna',
              )}
            </Col>
            <Col xs={24} md={12} lg={6}>
              {fourthCol(
                'Projects',
                'Crowdfund investments to build your open-source projects or philanthropic services',
                ChartIcon,
                'chart',
              )}
            </Col>
          </Row>
        </div>
      </section>

      <section style={section}>
        <div
          style={{
            ...wrapper,
            position: 'relative',
          }}
          className="sectionWrapper"
        >
          <img
            className="worksSectionIconOne"
            style={{ position: 'absolute', left: '17px', top: '0px' }}
            src={Rectangles1}
            alt=""
          />
          <img
            className="worksSectionIconTwo"
            style={{ position: 'absolute', left: '90px', top: '103px' }}
            src={Rectangles2}
            alt=""
          />
          {smallHeader(
            <>
              How <span>Utopians</span> works?
            </>,
            'secondTitle',
          )}

          {smallDes(
            'In a Utopia, people can create DACs according to their own ideas and visions, owners or contributors can receive their pay transparently, and investors can share in the profits of the project.',
          )}
          <Row justify="space-between" className="HowroksBg">
            <Col span={6}>
              <div className="HoworksCon">
                <div className="HoworksConTop">
                  <h3>Programmable spending</h3>
                  <p>
                    Commit portions of your revenue to go to the people or
                    projects you want to support, or the contributors you want
                    to pay. When you get paid, so do they.
                  </p>
                </div>
                <div className="HoworksConBottom">
                  <h3>ERC20 community tokens</h3>
                  <p>
                    When someone pays your project either as a patron or a user
                    of your app, they earn a proportional amount of your
                    project's token. When you win, your token holders win, so
                    they'll want you to win even more.
                  </p>
                </div>
              </div>
            </Col>
            <Col span={6}>
              <div
                className="HoworksCon"
                style={{ textAlign: 'left', float: 'right' }}
              >
                <div className="HoworksConTop">
                  <h3>Redistributable surplus</h3>
                  <p>
                    Set a funding target to cover predictable expenses. Any
                    extra revenue can be claimed by anyone holding your
                    project's tokens alongside you.
                  </p>
                </div>
                <div className="HoworksConBottom">
                  <h3>Transparency & accountability</h3>
                  <p>
                    Changes to your project's funding require a community
                    approval period to take effect. Your supporters don't have
                    to trust you—even though they already do.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>
      <section
        style={{
          ...section,
          paddingTop: 20,
          paddingBottom: 0,
        }}
      >
        <div
          style={{
            ...wrapper,
            marginTop: 80,
            background: 'linear-gradient(180deg, #FFFFFF 0%, #D5DAFF 100%)',
          }}
        >
          <Row gutter={60}>
            <Col
              xs={24}
              md={24}
              style={{ marginBottom: 100, position: 'relative' }}
            >
              <img
                style={{ position: 'absolute', right: '80px' }}
                src={Rectangles3}
                alt=""
              />
              {smallHeader('Projects in utopains world', 'projectTitle')}
              <div style={{ margin: '20px auto 0', maxWidth: '980px' }}>
                {previewProjects ? (
                  <ProjectsGrid projects={previewProjects} list />
                ) : (
                  <Loading />
                )}
              </div>
              <div style={{ textAlign: 'center', marginTop: 20 }}>
                <a href="/#/projects">
                  <Button className="allProjectsBtn">JOIN MORE</Button>
                </a>
                <p
                  style={{
                    color: '#241515',
                    lineHeight: '48px',
                    fontWeight: 600,
                    fontSize: '16px',
                    margin: 0,
                  }}
                >
                  OR
                </p>
                <a href="/#/create">
                  <Button className="createProjectBtn">+ build project</Button>
                </a>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* <section
        style={{
          ...section,
          paddingTop: 60,
          paddingBottom: 40,
        }}
      >
        <div
          style={{
            ...wrapper,
          }}
        >
          <Row align="middle">
            <Col xs={24} sm={11}>
              <img
                style={{
                  maxHeight: 480,
                  maxWidth: '100%',
                  objectFit: 'contain',
                  marginBottom: 40,
                }}
                src="/assets/pina.png"
                alt="Pinepple geek artist holding a paintbrush"
              />
            </Col>
            <Col xs={24} sm={13}>
              <div style={{ display: 'grid', rowGap: 20, marginBottom: 40 }}>
                {fourthCol('Programmable spending', [
                  `Commit portions of your revenue to go to the people or projects you want to support, or the contributors you want to pay. When you get paid, so do they.`,
                ])}
                {fourthCol('ERC20 community tokens', [
                  `When someone pays your project either as a patron or a user of your app, they earn a proportional amount of your project's token. When you win, your token holders win, so they'll want you to win even more.`,
                ])}
                {fourthCol('Redistributable surplus', [
                  `Set a funding target to cover predictable expenses. Any extra revenue can be claimed by anyone holding your project's tokens alongside you.`,
                ])}
                {fourthCol('Transparency & accountability', [
                  `Changes to your project's funding require a community approval period to take effect. Your supporters don't have to trust you—even though they already do.`,
                ])}
                <p>
                  Note: Juicebox is new, unaudited, and not guaranteed to work
                  perfectly. Before spending money, do your own research:{' '}
                  <a
                    href="https://discord.gg/6jXrJSyDFf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ask questions
                  </a>
                  ,{' '}
                  <a
                    href="https://github.com/jbx-protocol/juicehouse"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    check out the code
                  </a>
                  , and understand the risks!
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {window.innerWidth > 600 && (
        <section
          id="create"
          style={{
            ...section,
            marginTop: 0,
            paddingTop: 20,
            paddingBottom: 40,
          }}
        >
          <Create />
        </section>
      )}

      <section
        style={{
          padding: 30,
          paddingTop: 80,
          paddingBottom: 80,
          background: colors.background.brand.secondary,
          color: colors.text.over.brand.secondary,
        }}
      >
        <div style={wrapper}>
          <Row align="middle" gutter={40}>
            <Col xs={24} md={14}>
              <div style={{ display: 'grid', rowGap: 20 }}>
                {bigHeader('Should you Juicebox?')}
                <div style={{ color: colors.text.over.brand.secondary }}>
                  <p className="ol">Almost definitely.</p>
                  <p className="ol">
                    With Juicebox, projects are built and maintained by
                    motivated punks getting paid transparently, and funded by a
                    community of users and patrons who are rewarded as the
                    projects they support succeed.
                  </p>
                  <p className="ol">
                    The future will be led by creators, and owned by
                    communities.
                  </p>
                </div>
              </div>
            </Col>

            <Col xs={24} md={10}>
              <img
                style={{ maxWidth: '100%' }}
                src="/assets/blueberry-ol.png"
                alt="Sexy blueberry with bright pink lipstick spraying a can of spraypaint"
              />
            </Col>
          </Row>
        </div>
      </section>
     */}
    </div>
  )
}
