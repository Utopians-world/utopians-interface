import {
  DeleteOutlined,
  LockOutlined,
  PlusOutlined,
  CaretDownFilled,
} from '@ant-design/icons'
import { Button, Col, DatePicker, Form, Modal, Row, Select, Space } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { ProjectContext } from 'contexts/projectContext'
import { ThemeContext } from 'contexts/themeContext'
import { BigNumber, constants, utils } from 'ethers'
import useContractReader from 'hooks/ContractReader'
import { ContractName } from 'models/contract-name'
import { CurrencyOption } from 'models/currency-option'
import { PayoutMod } from 'models/mods'
import * as moment from 'moment'
import { useCallback, useContext, useState } from 'react'
import { formatDate } from 'utils/formatDate'
import {
  formatWad,
  fromPermyriad,
  parsePermyriad,
  parseWad,
} from 'utils/formatNumber'
import { amountSubFee } from 'utils/math'

import { FormItems } from '.'
import CurrencySymbol from '../CurrencySymbol'
import FormattedAddress from '../FormattedAddress'
import NumberSlider from '../inputs/NumberSlider'
import ProjectHandle from '../ProjectHandle'
import { FormItemExt } from './formItemExt'

import DateIcon from '../../../assets/images/date-icon.png'

type ModType = 'project' | 'address'

type EditingPayoutMod = PayoutMod & { handle?: string }

export default function ProjectPayoutMods({
  target,
  currency,
  fee,
  lockedMods,
  mods,
  onModsChanged,
  formItemProps,
}: {
  target: string
  currency: CurrencyOption
  fee: BigNumber | undefined
  lockedMods?: EditingPayoutMod[]
  mods: EditingPayoutMod[] | undefined
  onModsChanged: (mods: EditingPayoutMod[]) => void
} & FormItemExt) {
  const [form] = useForm<{
    handle: string
    beneficiary: string
    percent: number
    lockedUntil: moment.Moment
  }>()
  const [editingModProjectId, setEditingModProjectId] = useState<BigNumber>()
  const [editingModIndex, setEditingModIndex] = useState<number>()
  const [editingPercent, setEditingPercent] = useState<number>()
  const [settingHandleIndex, setSettingHandleIndex] = useState<number>()
  const [editingModType, setEditingModType] = useState<ModType>('address')
  const [settingHandle, setSettingHandle] = useState<string>()

  const { owner } = useContext(ProjectContext)

  useContractReader<BigNumber>({
    contract: ContractName.Projects,
    functionName: 'projectFor',
    args: settingHandle ? [utils.formatBytes32String(settingHandle)] : null,
    callback: useCallback(
      (projectId?: BigNumber) => {
        if (!mods) return
        onModsChanged(
          mods.map((m, i) =>
            i === settingHandleIndex
              ? {
                  ...m,
                  projectId,
                }
              : m,
          ),
        )
        setSettingHandle(undefined)
        setSettingHandleIndex(undefined)
      },
      [mods, onModsChanged, settingHandleIndex],
    ),
  })

  const {
    theme: { colors },
  } = useContext(ThemeContext)

  // const gutter = 10

  const modInput = useCallback(
    (mod: EditingPayoutMod, index: number, locked?: boolean) => {
      if (!mods) return

      return (
        <div className="stepPayoutListCon" key={mod.beneficiary ?? '' + index}>
          <Space
            style={{
              width: '100%',
              cursor: locked ? 'default' : 'pointer',
            }}
            onClick={() => {
              if (locked) return

              const percent = parseFloat(fromPermyriad(mod.percent))

              setEditingModType(
                BigNumber.from(mod.projectId || '0').gt(0)
                  ? 'project'
                  : 'address',
              )
              form.setFieldsValue({
                ...mod,
                percent,
                lockedUntil: mod.lockedUntil
                  ? moment.default(mod.lockedUntil * 1000)
                  : undefined,
              })
              setEditingModIndex(index)
              setEditingPercent(percent)
              setEditingModProjectId(mod.projectId)
            }}
          >
            <Row justify="space-between">
              <Col span="9">
                <div
                  className="stepPayoutListConItem"
                  style={{ alignItems: 'center' }}
                >
                  <div>
                    <small className="stepPayoutListConItemTitle">
                      Percentage:
                    </small>
                    <div className="stepPayoutListConItemPercentage">
                      <Space size="large">
                        <span>{fromPermyriad(mod.percent)}%</span>
                        {/* {parseWad(target).lt(constants.MaxUint256) && (
                          <span>
                            <CurrencySymbol currency={currency} />
                            {formatWad(
                              amountSubFee(parseWad(target), fee)
                                ?.mul(mod.percent)
                                .div(10000),
                              { decimals: 4, padEnd: true },
                            )}
                          </span>
                        )} */}
                      </Space>
                    </div>
                  </div>
                </div>
              </Col>
              <Col flex="auto">
                <div
                  className="stepPayoutListConItem"
                  style={{ paddingLeft: '20px' }}
                >
                  {mod.projectId?.gt(0) ? (
                    <div>
                      <small className="stepPayoutListConItemTitle">
                        Beneficiary
                      </small>
                      <div className="stepPayoutListConItemDes">
                        <FormattedAddress address={mod.beneficiary} />
                      </div>
                    </div>
                  ) : null}

                  {parseWad(target).lt(constants.MaxUint256) && (
                    <div>
                      <small className="stepPayoutListConItemTitle">
                        Target
                      </small>
                      <div className="stepPayoutListConItemDes">
                        <CurrencySymbol currency={currency} />
                        {formatWad(
                          amountSubFee(parseWad(target), fee)
                            ?.mul(mod.percent)
                            .div(10000),
                          { decimals: 4, padEnd: true },
                        )}
                      </div>
                    </div>
                  )}

                  {mod.projectId?.gt(0) ? (
                    <div>
                      <small className="stepPayoutListConItemTitle">
                        Project
                      </small>
                      <div className="stepPayoutListConItemDes">
                        <ProjectHandle link projectId={mod.projectId} />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <small className="stepPayoutListConItemTitle">
                        Address
                      </small>
                      <div className="stepPayoutListConItemDes">
                        <FormattedAddress address={mod.beneficiary} />
                      </div>
                    </div>
                  )}

                  {mod.lockedUntil ? (
                    <div>
                      <small className="stepPayoutListConItemTitle">
                        Locked date
                      </small>
                      <div className="stepPayoutListConItemDes">
                        {formatDate(mod.lockedUntil * 1000, 'MM-DD-yyyy')}
                      </div>
                    </div>
                  ) : null}
                </div>
              </Col>
              <Col span="2" style={{ display: 'flex', alignItems: 'center' }}>
                {locked ? (
                  <LockOutlined style={{ color: colors.icon.disabled }} />
                ) : (
                  <Button
                    type="text"
                    onClick={e => {
                      onModsChanged([
                        ...mods.slice(0, index),
                        ...mods.slice(index + 1),
                      ])
                      e.stopPropagation()
                    }}
                    icon={<DeleteOutlined style={{ color: '#7C85CB' }} />}
                  />
                )}
              </Col>
            </Row>

            {/* {mod.projectId?.gt(0) ? (
              <Row>
                <Col span={5}>
                  <label>Beneficiary:</label>
                </Col>
                <Col span={19}>
                  <span style={{ cursor: 'pointer' }}>
                    <FormattedAddress address={mod.beneficiary} />
                  </span>
                </Col>
              </Row>
            ) : null} */}

            {/* {mod.projectId?.gt(0) ? (
              <Row gutter={gutter} style={{ width: '100%' }} align="middle">
                <Col span={5}>
                  <label>Project:</label>{' '}
                </Col>
                <Col span={19}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span style={{ cursor: 'pointer' }}>
                      <ProjectHandle link projectId={mod.projectId} />
                    </span>
                  </div>
                </Col>
              </Row>
            ) : (
              <Row gutter={gutter} style={{ width: '100%' }} align="middle">
                <Col span={5}>
                  <label>Address:</label>{' '}
                </Col>
                <Col span={19}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span style={{ cursor: 'pointer' }}>
                      <FormattedAddress address={mod.beneficiary} />
                    </span>
                  </div>
                </Col>
              </Row>
            )} */}

            {/* <Row gutter={gutter} style={{ width: '100%' }} align="middle">
              <Col span={5}>
                <label>Percentage:</label>
              </Col>
              <Col span={19}>
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span
                    style={{
                      marginRight: 10,
                      width: 100,
                      maxWidth: 100,
                    }}
                  >
                    <Space size="large">
                      <span>{fromPermyriad(mod.percent)}%</span>
                      {parseWad(target).lt(constants.MaxUint256) && (
                        <span>
                          <CurrencySymbol currency={currency} />
                          {formatWad(
                            amountSubFee(parseWad(target), fee)
                              ?.mul(mod.percent)
                              .div(10000),
                            { decimals: 4, padEnd: true },
                          )}
                        </span>
                      )}
                    </Space>
                  </span>
                </div>
              </Col>
            </Row> */}
            {/* 
            {mod.lockedUntil ? (
              <Row gutter={gutter} style={{ width: '100%' }} align="middle">
                <Col span={5}>
                  <label>Locked</label>
                </Col>
                <Col span={19}>
                  until {formatDate(mod.lockedUntil * 1000, 'MM-DD-yyyy')}
                </Col>
              </Row>
            ) : null} */}
          </Space>

          {/* {locked ? (
            <LockOutlined style={{ color: colors.icon.disabled }} />
          ) : (
            <Button
              type="text"
              onClick={e => {
                onModsChanged([
                  ...mods.slice(0, index),
                  ...mods.slice(index + 1),
                ])
                e.stopPropagation()
              }}
              icon={<DeleteOutlined />}
            />
          )} */}
        </div>
      )
    },
    [mods, colors.icon.disabled, target, currency, fee, form, onModsChanged],
  )

  if (!mods) return null

  const total = mods.reduce(
    (acc, curr) => acc + parseFloat(fromPermyriad(curr.percent ?? '0')),
    0,
  )

  const setReceiver = async () => {
    await form.validateFields()

    const handle = form.getFieldValue('handle')
    const beneficiary = form.getFieldValue('beneficiary')
    const percent = parsePermyriad(form.getFieldValue('percent')).toNumber()
    const _lockedUntil = form.getFieldValue('lockedUntil') as moment.Moment

    const lockedUntil = _lockedUntil
      ? Math.round(_lockedUntil.valueOf() / 1000)
      : undefined

    // Store handle in mod object only to repopulate handle input while editing
    const newMod = { beneficiary, percent, handle, lockedUntil }

    onModsChanged(
      editingModIndex !== undefined && editingModIndex < mods.length
        ? mods.map((m, i) =>
            i === editingModIndex
              ? {
                  ...m,
                  ...newMod,
                }
              : m,
          )
        : [...mods, newMod],
    )

    if (handle) {
      setSettingHandle(handle)
      setSettingHandleIndex(editingModIndex)
    }

    setEditingModIndex(undefined)

    form.resetFields()
  }

  return (
    <Form.Item
      className="stepFormCon"
      {...formItemProps}
      rules={[
        {
          validator: () => {
            if (total > 100)
              return Promise.reject('Percentages must add up to less than 100%')

            return Promise.resolve()
          },
        },
      ]}
    >
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Button
          type="dashed"
          className="stepAddPayout"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingModIndex(mods.length)
            setEditingPercent(0)
            setEditingModProjectId(undefined)
            form.resetFields()
          }}
          block
        >
          Add a payout
        </Button>

        {lockedMods ? (
          <Space style={{ width: '100%' }} direction="vertical" size="small">
            {lockedMods.map((v, i) => modInput(v, i, true))}
          </Space>
        ) : null}
        <Space style={{ width: '100%' }} direction="vertical" size="small">
          {mods.map((v, i) => modInput(v, i))}
        </Space>

        <div className="payoutTotalCon">
          <div className="payoutTotalConTotal">
            Total payout: {total.toFixed(2)}%
          </div>
          {total !== 0 && (
            <div className="payoutTotalConTo">
              Remaining {(100 - total).toFixed(2)}% percentage without reserved
              payout <FormattedAddress address={owner} />
            </div>
          )}
        </div>
      </Space>

      <Modal
        className="stepModalCon"
        title={editingModProjectId ? 'Edit existing payout' : 'Add a payout'}
        visible={editingModIndex !== undefined}
        onOk={setReceiver}
        okText={editingModProjectId ? 'Save' : 'Add'}
        onCancel={() => {
          form.resetFields()
          setEditingModIndex(undefined)
          setEditingModProjectId(undefined)
        }}
        destroyOnClose
      >
        <Form
          className="stepFormCon"
          form={form}
          layout="vertical"
          onKeyDown={e => {
            if (e.key === 'Enter') setReceiver()
          }}
        >
          <Form.Item>
            <Select
              className="stepSelect"
              value={editingModType}
              onChange={setEditingModType}
              suffixIcon={
                <CaretDownFilled
                  style={{ color: '#2713E1', fontSize: '16px' }}
                />
              }
            >
              <Select.Option value="address">Wallet address</Select.Option>
              <Select.Option value="project">Utopian project</Select.Option>
            </Select>
          </Form.Item>

          {editingModType === 'address' ? (
            <FormItems.EthAddress
              name="beneficiary"
              defaultValue={form.getFieldValue('beneficiary')}
              formItemProps={{
                label: 'Address',
                rules: [
                  {
                    validator: (rule: any, value: any) => {
                      const address = form.getFieldValue('beneficiary')
                      if (!address || !utils.isAddress(address))
                        return Promise.reject('Address is required')
                      else if (address === constants.AddressZero)
                        return Promise.reject('Cannot use zero address.')
                      else return Promise.resolve()
                    },
                  },
                ],
              }}
              onAddressChange={beneficiary =>
                form.setFieldsValue({ beneficiary })
              }
            />
          ) : (
            <FormItems.ProjectHandleFormItem
              name="handle"
              requireState="exists"
              initialValue={editingModProjectId}
              formItemProps={{
                label: 'Project handle',
              }}
              required
            />
          )}
          {editingModType === 'project' ? (
            <FormItems.EthAddress
              name="beneficiary"
              defaultValue={form.getFieldValue('beneficiary')}
              formItemProps={{
                label: 'Address',
                extra:
                  'The address that should receive the tokens minted from paying this project.',
                rules: [
                  {
                    validator: (rule: any, value: any) => {
                      const address = form.getFieldValue('beneficiary')
                      if (!address || !utils.isAddress(address))
                        return Promise.reject('Address is required')
                      else if (address === constants.AddressZero)
                        return Promise.reject('Cannot use zero address.')
                      else return Promise.resolve()
                    },
                  },
                ],
              }}
              onAddressChange={beneficiary =>
                form.setFieldsValue({ beneficiary })
              }
            />
          ) : null}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ flex: 1, marginRight: 10 }}>
              <Form.Item
                label="Percent"
                name="Percent"
                rules={[{ required: true, message: 'Percent is required' }]}
              >
                <NumberSlider
                  onChange={percent => {
                    form.setFieldsValue({ percent })
                    setEditingPercent(percent)
                  }}
                  step={0.01}
                  defaultValue={form.getFieldValue('percent') || 0}
                  suffix="%"
                />
              </Form.Item>
            </span>

            {parseWad(target).lt(constants.MaxUint256) && (
              <span style={{ color: colors.text.primary }}>
                <CurrencySymbol currency={currency} />
                {formatWad(
                  amountSubFee(parseWad(target), fee)
                    ?.mul(Math.floor((editingPercent ?? 0) * 100))
                    .div(10000),
                  { decimals: 4, padEnd: true },
                )}
              </span>
            )}
          </div>
          <Form.Item
            name="lockedUntil"
            label="Lock until"
            extra="If locked, this can't be edited or removed until the lock expires or the funding cycle is reconfigured."
          >
            <DatePicker
              className="stepDatePicker"
              suffixIcon={<img src={DateIcon} alt="dateIcon" />}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Form.Item>
  )
}
