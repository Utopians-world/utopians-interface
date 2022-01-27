import { Space, Statistic, Col, Row } from 'antd'
import CurrencySymbol from 'components/shared/CurrencySymbol'
import PayoutModsList from 'components/shared/PayoutModsList'
import ProjectLogo from 'components/shared/ProjectLogo'
import TicketModsList from 'components/shared/TicketModsList'

import { UserContext } from 'contexts/userContext'
import {
  useAppSelector,
  useEditingFundingCycleSelector,
} from 'hooks/AppSelector'
import { CurrencyOption } from 'models/currency-option'
import { useContext } from 'react'
import {
  formattedNum,
  formatWad,
  fromPerbicent,
  fromPermille,
} from 'utils/formatNumber'
import { hasFundingTarget, isRecurring } from 'utils/fundingCycle'
import { amountSubFee } from 'utils/math'
import { orEmpty } from 'utils/orEmpty'

import { getBallotStrategyByAddress } from 'constants/ballot-strategies'

export default function ConfirmDeployProject() {
  const editingFC = useEditingFundingCycleSelector()
  const editingProject = useAppSelector(state => state.editingProject.info)
  const { adminFeePercent } = useContext(UserContext)
  const { payoutMods, ticketMods } = useAppSelector(
    state => state.editingProject,
  )
  return (
    <Row>
      <Col xs={24} md={12}>
        <Space size="middle" direction="vertical" style={{ width: '90%' }}>
          <h1>Review project</h1>
          <div className="previewLogo">
            <ProjectLogo
              uri={editingProject?.metadata.logoUri}
              name={editingProject?.metadata.name}
            />
          </div>
          <Statistic
            className="previewName"
            title="Name"
            value={orEmpty(editingProject?.metadata.name)}
          />
          <Row>
            <Col span={8}>
              <Statistic
                title="Handle"
                value={'@' + orEmpty(editingProject?.handle)}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="Duration"
                value={
                  editingFC.duration.gt(0)
                    ? formattedNum(editingFC.duration)
                    : 'Not set'
                }
                suffix={editingFC.duration.gt(0) ? 'days' : ''}
              />
            </Col>
            <Col span={8}></Col>
          </Row>

          <Row>
            <Col span={8}>
              <Statistic
                title="Pay button"
                value={orEmpty(editingProject?.metadata.payButton)}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="Pay disclosure"
                value={orEmpty(editingProject?.metadata.payDisclosure)}
              />
            </Col>
            <Col span={8}></Col>
          </Row>

          <Row>
            <Col span={8}>
              <Statistic
                title="Website"
                value={orEmpty(editingProject?.metadata.infoUri)}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="Twitter"
                value={
                  editingProject?.metadata.twitter
                    ? '@' + editingProject.metadata.twitter
                    : orEmpty(undefined)
                }
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="Telegram"
                value={orEmpty(editingProject?.metadata.discord)}
              />
            </Col>
          </Row>

          <Row>
            <Col span={8}>
              <Statistic
                title="Reserved tokens"
                value={fromPerbicent(editingFC?.reserved)}
                suffix="%"
              />
            </Col>
            <Col span={8}>
              {editingFC && isRecurring(editingFC) && (
                <Statistic
                  title="Discount rate"
                  value={fromPermille(editingFC?.discountRate)}
                  suffix="%"
                />
              )}
            </Col>
            <Col span={8}>
              {editingFC &&
                isRecurring(editingFC) &&
                hasFundingTarget(editingFC) && (
                  <Statistic
                    title="Bonding curve rate"
                    value={fromPerbicent(editingFC?.bondingCurveRate)}
                    suffix="%"
                  />
                )}
            </Col>
          </Row>

          <Statistic
            title="Target"
            valueRender={() =>
              hasFundingTarget(editingFC) ? (
                editingFC.target.eq(0) ? (
                  <span>
                    Target is 0: All funds will be considered overflow and can
                    be redeemed by burning project tokens.
                  </span>
                ) : (
                  <span>
                    <CurrencySymbol
                      currency={
                        editingFC?.currency.toNumber() as CurrencyOption
                      }
                    />
                    {formatWad(editingFC?.target)}{' '}
                    {editingFC.fee?.gt(0) && (
                      <span style={{ fontSize: '0.8rem' }}>
                        (
                        <CurrencySymbol
                          currency={
                            editingFC?.currency.toNumber() as CurrencyOption
                          }
                        />
                        {formatWad(
                          amountSubFee(editingFC.target, adminFeePercent),
                        )}{' '}
                        after UTO fee)
                      </span>
                    )}
                  </span>
                )
              ) : (
                <span>
                  No funding target: The project will control how all funds are
                  distributed, and none can be redeemed by token holders.
                </span>
              )
            }
          />
        </Space>
      </Col>
      <Col xs={24} md={12}>
        <Space size="large" direction="vertical" style={{ width: '90%' }}>
          <Statistic
            title="Reconfiguration strategy"
            valueRender={() => {
              const ballot = getBallotStrategyByAddress(editingFC.ballot)
              return (
                <div>
                  <span>{ballot.name} </span>
                  <br />
                  <span>{ballot.address}</span>
                </div>
              )
            }}
          />
          <Statistic
            title="Spending"
            valueRender={() => (
              <PayoutModsList
                mods={payoutMods}
                projectId={undefined}
                fundingCycle={editingFC}
                fee={adminFeePercent}
              />
            )}
          />
          <Statistic
            title="Reserved token allocations"
            valueRender={() => (
              <TicketModsList
                mods={ticketMods}
                projectId={undefined}
                fundingCycle={undefined}
              />
            )}
          />
        </Space>
      </Col>
    </Row>
  )
}
