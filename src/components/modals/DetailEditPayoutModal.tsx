import { useState } from 'react'
import { Modal, Space } from 'antd'

import ModalTab from '../ProjectsDetail/ModalTab'
import { fromWad } from '../../utils/formatNumber'
import { FormItems } from '../shared/formItems'
import { PayoutMod } from '../../models/mods'
import { useEditingFundingCycleSelector } from '../../hooks/AppSelector'
import { CurrencyOption } from '../../models/currency-option'

export default function DetailEditPayoutModal({
  visible,
  onSuccess,
  onCancel,
}: {
  visible?: boolean
  onSuccess?: VoidFunction
  onCancel?: VoidFunction
}) {
  const [mods, setMods] = useState<PayoutMod[]>([])
  const [loading] = useState<boolean>()
  const editingFC = useEditingFundingCycleSelector()
  // const DivStrategyStyle: CSSProperties = {
  //   border: '2px solid #bdc1e4',
  //   width: '100%',
  //   height: '120px',
  //   borderRadius: '4px',
  //   margin: '0 auto',
  //   display: 'flex',
  //   justifyContent: 'left',
  //   background: '#fdfeff',
  // }
  return (
    <Modal
      title={'Edit payout'}
      visible={visible}
      onCancel={onCancel}
      confirmLoading={loading}
      width={550}
      centered={true}
      cancelText={'CANCEL'}
      okText={'SAVE CHANGES'}
    >
      <Space
        direction="vertical"
        size="large"
        style={{ width: '100%', paddingTop: 0, gap: '20px' }}
        className="payoutModel"
      >
        <ModalTab
          textFirst={'Changes will be applied to the'}
          textSecond={' upcoming '}
          textLast={'funding cycle.'}
        />
        <div>
          <p style={{ marginBottom: 0, color: '#000000' }}>
            Payouts are optional. By default, all unallocated revenue will be
            withdrawable to the project owner's wallet.
          </p>
          <p style={{ marginBottom: '5px', color: '#3A1FF5' }}>
            What is project target ?
          </p>
        </div>
        <FormItems.ProjectPayoutMods
          mods={mods}
          target={fromWad(editingFC.target)}
          currency={editingFC.currency.toNumber() as CurrencyOption}
          onModsChanged={setMods}
          fee={editingFC.fee}
        />
        {/*<div*/}
        {/*  style={{*/}
        {/*    background: '#D3DCEE',*/}
        {/*    border: '1px dashed #665FAC',*/}
        {/*    height: '60px',*/}
        {/*    lineHeight: '60px',*/}
        {/*    textAlign: 'center',*/}
        {/*    borderRadius: '3px',*/}
        {/*    color: '#665FAC',*/}
        {/*    fontWeight: 'bold',*/}
        {/*  }}*/}
        {/*>*/}
        {/*  Add a payout*/}
        {/*</div>*/}
        {/*<div style={DivStrategyStyle}>*/}
        {/*  <div style={{ width: '30%', fontSize: '12px', padding: '10px 20px' }}>*/}
        {/*    <p*/}
        {/*      style={{*/}
        {/*        color: '#9092A7',*/}
        {/*        paddingLeft: '20px',*/}
        {/*        marginBottom: '10px',*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      Percentage*/}
        {/*    </p>*/}
        {/*    <p*/}
        {/*      style={{*/}
        {/*        fontSize: '40px',*/}
        {/*        fontWeight: 'bold',*/}
        {/*        marginBottom: '15px',*/}
        {/*        lineHeight: '30px',*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      27%*/}
        {/*    </p>*/}
        {/*    <p style={{ color: '#7C85CB', fontWeight: 'bold' }}>$ 399.6033</p>*/}
        {/*  </div>*/}
        {/*  <div style={{ width: '50%', padding: '10px 20px' }}>*/}
        {/*    <p style={{ color: '#9092A7' }}>Address</p>*/}
        {/*    <p*/}
        {/*      style={{*/}
        {/*        color: '#5F5E61',*/}
        {/*        fontSize: '12px',*/}
        {/*        fontWeight: 'bold',*/}
        {/*        lineHeight: '13px',*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      0X0003034304930493049304930493403493049343049304{' '}*/}
        {/*    </p>*/}
        {/*    <p style={{ color: '#9092A7', marginTop: '20px', marginBottom: 0 }}>*/}
        {/*      Locked date*/}
        {/*    </p>*/}
        {/*    <p*/}
        {/*      style={{*/}
        {/*        color: '#5F5E61',*/}
        {/*        fontSize: '12px',*/}
        {/*        fontWeight: 'bold',*/}
        {/*        lineHeight: '13px',*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      12-09-2021{' '}*/}
        {/*    </p>*/}
        {/*  </div>*/}
        {/*  <div*/}
        {/*    style={{ width: '20%', textAlign: 'center', lineHeight: '120px' }}*/}
        {/*  >*/}
        {/*    <Garbage />*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*  <p*/}
        {/*    style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '22px' }}*/}
        {/*  >*/}
        {/*    TOTAL PAYOUT: 27%*/}
        {/*  </p>*/}
        {/*  <p*/}
        {/*    style={{ textAlign: 'right', color: '#FE5164', fontWeight: 'bold' }}*/}
        {/*  >*/}
        {/*    Remaining 73% percentage without reserved payout{' '}*/}
        {/*  </p>*/}
        {/*</div>*/}
      </Space>
    </Modal>
  )
}
