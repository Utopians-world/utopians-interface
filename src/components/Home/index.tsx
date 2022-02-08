import { Button, Col, Row } from 'antd'
// import Create from 'components/Create'
import Loading from 'components/shared/Loading'

import { ThemeContext } from 'contexts/themeContext'

import { useProjectsQuery } from 'hooks/Projects'

import { CSSProperties, useContext } from 'react'
import { createGlobalStyle } from 'styled-components'
import { Trans } from '@lingui/macro'
import { t } from '@lingui/macro'

// import { isMobile } from 'react-device-detect'

// import { ThemeOption } from 'constants/theme/theme-option'

import BodyBg from 'assets/images/home-pic.png'
import BodyMobileBg from 'assets/images/home-pic-mobile.png'
import IndividualIcon from 'assets/images/individual-icon.png'
import BuyersIcon from 'assets/images/buyers-icon.png'
import DaoIcon from 'assets/images/dao-icon.png'
import ProjectIcon from 'assets/images/project-icon.png'

import HoworkTipBg from 'assets/images/howork-pic.png'
import HoworkTipMobileBg from 'assets/images/howork-pic-mobile.png'
import HomePageArrow from 'assets/images/home-page-arrow.png'

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

  const GlobalStyle = createGlobalStyle`
    body {
      background-image: url(${BodyBg});
      background-repeat: no-repeat;
      background-position: top center;
      background-size: cover;
      
      @media screen and (max-width: 750px) {
        background-image: url(${BodyMobileBg});
      }
    }
    
    .appContent {
      background: transparent !important;
    }
  `

  const bigHeader = (text: string) => (
    <h1
      className="firstTitle"
      // style={{
      //   fontSize: '2.4rem',
      //   fontWeight: 600,
      //   lineHeight: 1.2,
      //   margin: 0,
      // }}
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
      <GlobalStyle />
      <section className="firstSection">
        <div className="firstSectionContent">
          <Row align="middle" justify="space-around">
            <Col
              xs={24}
              md={14}
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingBottom: 60,
              }}
              className="firstSectionLeft"
            >
              <div className="firstSectionLeftCon">
                <a
                  style={{
                    color: colors.text.metisgreen,
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

                <div style={{ display: 'inline-block' }}>
                  <a href="/#/create">
                    <Button className="createProjectBtn">
                      + build project
                    </Button>
                  </a>
                </div>
              </div>
            </Col>

            <Col xs={24} md={10}></Col>
          </Row>
        </div>
        <div className="firstSectionFooterCon">
          <img src={HomePageArrow} alt="home-page-arrow" />
        </div>
      </section>

      <section className="defaultSection">
        <div
          style={{
            ...wrapper,
          }}
          className="sectionWrapper"
        >
          {window.innerWidth <= 750 && (
            <>
              <img
                className="solutionRectangles"
                style={{ position: 'absolute', right: '-20px', top: '20px' }}
                src={Rectangles}
                alt=""
              />
              <img
                className="worksSectionIconOne"
                style={{ position: 'absolute', left: '20px', top: '160px' }}
                src={Rectangles1}
                alt=""
              />
              <img
                className="worksSectionIconTwo"
                style={{ position: 'absolute', left: '7px', top: '132px' }}
                src={Rectangles2}
                alt=""
              />
              <img
                className="projectListRectangles"
                style={{ position: 'absolute', right: '10px', top: '50%' }}
                src={Rectangles3}
                alt=""
              />
            </>
          )}
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
            {window.innerWidth > 751 && (
              <img
                className="solutionRectangles"
                style={{ position: 'absolute', right: '-30px', top: '20px' }}
                src={Rectangles}
                alt=""
              />
            )}
            <Col xs={24} md={12} lg={6}>
              {fourthCol(
                'Individuals',
                'Crypto developers and Indie artists',
                IndividualIcon,
                'atom',
              )}
            </Col>
            <Col xs={24} md={12} lg={6}>
              {fourthCol(
                'Buyers',
                'Raise funds for collections, art, or other goods and services',
                BuyersIcon,
                'cell',
              )}
            </Col>
            <Col xs={24} md={12} lg={6}>
              {fourthCol(
                'DACs',
                'Any DAC that needs to get funding',
                DaoIcon,
                'dna',
              )}
            </Col>
            <Col xs={24} md={12} lg={6}>
              {fourthCol(
                'Projects',
                'Crowdfund investments to build your open-source projects or philanthropic services',
                ProjectIcon,
                'chart',
              )}
            </Col>
          </Row>
        </div>
      </section>

      <section className="howWorkSectionBg">
        <div
          style={{
            ...wrapper,
            position: 'relative',
          }}
          className="sectionWrapper"
        >
          {window.innerWidth > 751 && (
            <>
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
            </>
          )}
          {smallHeader(
            <>
              How <span>Utopians</span> works?
            </>,
            'secondTitle',
          )}

          {smallDes(
            'In a Utopia, people can create DACs according to their own ideas and visions, owners or contributors can receive their pay transparently, and investors can share in the profits of the project.',
          )}
          {window.innerWidth > 751 ? (
            <Row justify="center" className="HowroksBg">
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
                      When someone pays your project either as a patron or a
                      user of your app, they earn a proportional amount of your
                      project's token. When you win, your token holders win, so
                      they'll want you to win even more.
                    </p>
                  </div>
                </div>
              </Col>
              <Col span={12} flex="auto">
                <img
                  style={{ maxWidth: '100%' }}
                  src={HoworkTipBg}
                  alt="howorkTip"
                />
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
          ) : (
            <Row justify="center" className="HowroksBg">
              <Col span={24}>
                <div className="HoworksCon">
                  <div className="HoworksConTop">
                    <h3>Programmable spending</h3>
                    <p>
                      Commit portions of your revenue to go to the people or
                      projects you want to support, or the contributors you want
                      to pay. When you get paid, so do they.
                    </p>
                  </div>
                  <div className="HoworksConTop" style={{ textAlign: 'left' }}>
                    <h3>Redistributable surplus</h3>
                    <p>
                      Set a funding target to cover predictable expenses. Any
                      extra revenue can be claimed by anyone holding your
                      project's tokens alongside you.
                    </p>
                  </div>
                </div>
              </Col>
              <Col span={24} flex="auto" style={{ margin: '40px 0 50px' }}>
                <img
                  style={{ maxWidth: '100%' }}
                  src={HoworkTipMobileBg}
                  alt="howorkTip"
                />
              </Col>
              <Col span={24}>
                <div className="HoworksCon">
                  <div className="HoworksConBottom">
                    <h3>ERC20 community tokens</h3>
                    <p>
                      When someone pays your project either as a patron or a
                      user of your app, they earn a proportional amount of your
                      project's token. When you win, your token holders win, so
                      they'll want you to win even more.
                    </p>
                  </div>
                  <div
                    className="HoworksConBottom"
                    style={{ textAlign: 'left' }}
                  >
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
          )}
        </div>
      </section>
      <section
        className="defaultSection"
        style={{
          paddingTop: 20,
          paddingBottom: 0,
          background: 'linear-gradient(180deg, #FFFFFF 0%, #D5DAFF 100%)',
        }}
      >
        <div
          style={{
            ...wrapper,
            marginTop: 80,
          }}
        >
          <Row gutter={60}>
            <Col
              xs={24}
              md={24}
              style={{ marginBottom: 100, position: 'relative' }}
            >
              {window.innerWidth > 751 && (
                <img
                  className="projectListRectangles"
                  style={{ position: 'absolute', right: '80px' }}
                  src={Rectangles3}
                  alt=""
                />
              )}
              {smallHeader('Projects in utopains world', 'projectTitle')}
              <div style={{ margin: '20px auto 0', maxWidth: '980px' }}>
                {previewProjects ? (
                  <ProjectsGrid projects={previewProjects} list isHome />
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
    </div>
  )
}
