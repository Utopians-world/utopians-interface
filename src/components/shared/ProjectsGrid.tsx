import { Col, ColProps, Row, Space } from 'antd'
import { Project } from 'models/subgraph-entities/project'

import ProjectCard from './ProjectCard'
import './styles/projectCard.scss'

// import tmpProIcon from 'assets/images/pro-bg.png'

export default function ProjectsGrid({
  projects,
  list,
  selectedtab,
  isHome,
}: {
  projects: Pick<Project, 'handle' | 'uri' | 'totalPaid' | 'createdAt'>[]
  list?: boolean
  selectedtab?: string
  isHome?: boolean
}) {
  const gutter = 20

  const colProps: ColProps = {
    xs: 24,
    md: 12,
    style: { marginBottom: gutter },
  }

  return list ? (
    <Space style={{ width: '100%' }} direction="vertical">
      {/* {projects?.map(project => (
        <ProjectCard project={project} key={project.handle} />
      ))} */}
      {projects?.map(
        (project, i) =>
          i % 2 === 0 && (
            <Row gutter={gutter} key={project.handle}>
              <Col {...colProps}>
                <ProjectCard
                  project={project}
                  selectedtab={selectedtab}
                  isHome={isHome}
                />
              </Col>
              {i + 1 < projects.length && (
                <Col {...colProps}>
                  <ProjectCard
                    project={projects[i + 1]}
                    selectedtab={selectedtab}
                    isHome={isHome}
                  />
                </Col>
              )}
            </Row>
          ),
      )}
    </Space>
  ) : (
    <div className="projectGridCon">
      {projects?.map(
        (project, i) =>
          i % 2 === 0 && (
            <Row gutter={gutter} key={project.handle}>
              <Col {...colProps}>
                <ProjectCard project={project} />
              </Col>
              {i + 1 < projects.length && (
                <Col {...colProps}>
                  <ProjectCard project={projects[i + 1]} />
                </Col>
              )}
            </Row>
          ),
      )}
    </div>
  )
}
