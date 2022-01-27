import { CSSProperties, useLayoutEffect, useState } from 'react'
import { Divider, Form, FormInstance, Modal, Space } from 'antd'

import ModalTab from '../ProjectsDetail/ModalTab'
import { TicketingFormFields } from '../Create/TicketingForm'
import NumberSlider from '../shared/inputs/NumberSlider'
import { FormItems } from '../shared/formItems'
import { TicketMod } from '../../models/mods'

export default function DetailEditReservedTokensMobileModal({
  form,
  visible,
  onSuccess,
  onCancel,
  initialMods,
  onSave,
  confirm,
}: {
  form: FormInstance<TicketingFormFields>
  visible?: boolean
  onSuccess?: VoidFunction
  onCancel?: VoidFunction
  initialMods: TicketMod[]
  onSave: (mods: TicketMod[], receive: string) => void
  confirm?: boolean
}) {
  const DivInputStyle: CSSProperties = {
    marginBottom: '15px',
    width: '100%',
  }

  useLayoutEffect(() => {
    setMods(initialMods)
  }, [initialMods])
  function getReceive() {
    const fields = form.getFieldsValue(true)
    return fields.reserved
  }
  const DividerStyle: CSSProperties = {
    color: '#D3DCEE',
    margin: 0,
    fontSize: '12px',
    borderTopColor: '#D3DCEE',
    paddingRight: '15px',
  }
  const [mods, setMods] = useState<TicketMod[]>([])
  return (
    <Modal
      title={'Edit reserved tokens'}
      visible={visible}
      onCancel={onCancel}
      confirmLoading={confirm}
      width={1080}
      centered={true}
      cancelText={'CANCEL'}
      okText={'SAVE CHANGES'}
      className="projectModal"
      onOk={() => {
        let receive = getReceive()
        onSave(mods, receive)
      }}
    >
      <Space
        direction="vertical"
        size="large"
        style={{ width: '100%', paddingTop: 0 }}
        className="ReservedModal"
      >
        <ModalTab
          textFirst={'Changes will be applied to the'}
          textSecond={' upcoming '}
          textLast={'funding cycle.'}
        />
        <Form form={form} layout="vertical" className="stepFormCon">
          <div
            style={{
              display: 'flex',
              justifyContent: 'left',
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                marginBottom: '15px',
                width: '100%',
                marginRight: '4%',
              }}
            >
              <Divider orientation="right" style={DividerStyle}>
                Reserve percentage
              </Divider>
              <p
                style={{
                  fontWeight: 'bold',
                  fontSize: '13px',
                  marginTop: '15px',
                }}
              >
                Tokens are earned by anyone who pays your project, and can be
                redeemed for overflow if your project has set a funding target.
              </p>
              <p
                style={{
                  color: '#3A1FF5',
                  fontWeight: 'bold',
                  fontSize: '13px',
                }}
              >
                What is rule of reserved token ?
              </p>
              <p
                style={{
                  fontWeight: 'bold',
                  fontSize: '15px',
                  marginTop: '10px',
                }}
              >
                Reserved tokens
              </p>
              <NumberSlider
                sliderValue={form.getFieldValue('reserved')}
                suffix="%"
                onChange={(val?: number) =>
                  form.setFieldsValue({ reserved: val })
                }
                step={0.5}
              />
              <ModalTab
                textFirst={
                  'Whenever someone pays your project, this percentage of tokens will be reserved and the rest will go to the payer. Reserve tokens are reserved for the project owner by default, but can also be allocated to other wallet addresses by the owner. Once tokens are reserved, anyone can "mint" them, which distributes them to their intended receivers.'
                }
              />
            </div>
            <div style={DivInputStyle}>
              <Divider orientation="right" style={DividerStyle}>
                Allocation
              </Divider>
              <p
                style={{
                  fontWeight: 'bold',
                  fontSize: '13px',
                  marginTop: '15px',
                }}
              >
                Allocate reserved tokens is optional. By default, automatically
                distribute a portion of your project's reserved tokens to other
                utopians projects or ETH wallets.
              </p>
              <FormItems.ProjectTicketMods
                name="ticketMods"
                mods={mods}
                onModsChanged={setMods}
              />
            </div>
          </div>
        </Form>
      </Space>
    </Modal>
  )
}
