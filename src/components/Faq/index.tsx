import { Collapse } from 'antd'
import CollapsePanel from 'antd/lib/collapse/CollapsePanel'
import { CaretDownOutlined } from '@ant-design/icons'

import './index.scss'

const QAs: {
  q: string
  a?: string[]
  img?: {
    src: string
    alt: string
  }
}[] = [
  {
    q: 'Who funds Utopians projects?',
    a: [
      `Users fund your project by paying to use your app or service, or as a patron or investor by making a payment directly to your project's smart contract (like on this app).`,
      `For users paying through your app, you should route those funds through the Utopians smart contracts so they receive Tokens in return.`,
    ],
  },
  {
    q: `What is the cost of Utopians ?`,
    a: [
      `Utopians currently takes a 5% cut of every project withdrawal for development  of Utopia projects.  You will get Utopia tokens ($UTP) in return. As the ecosystem continues to grow, the value of Utopia tokens may continue to appreciate and benefit all holders.`,
      `Utopia is an open protocol on Metis Andromeda, you can check out the fund details at https://utopians.world/#/p/utopians. `,
    ],
  },
  {
    q: `What is the project overflow?`,
    a: [
      `In a funding cycle, you can set a funding target, and any surplus funds over that amount will be locked in the overflow pool.`,
      `Anyone who has your project tokens can redeem them from the overflow pool and burn their tokens in exchange for their claim portion.`,
    ],
  },
  {
    q: 'What are project tokens？',
    a: [
      `All projects mint tokens in return for funding, which can be redeemed from projects' overflow. They can either be staked or withdrawn as ERC-20s.`,
    ],
  },
  {
    q: `What are project tokens for?`,
    a: [
      `You can get tokens by funding projects, or making some contribution to the project. In the future, if the project is successful, you can benefit from its success.`,
    ],
  },
  {
    q: `What's a discount rate?`,
    a: [
      `The discount rate is to encourage others to fund your project as early as possible, and the amount of tokens received decreases the further you get into the funding cycle.`,
    ],
  },
  {
    q: `What's a bonding curve?`,
    a: [
      `A bonding curve rewards people who wait longer to redeem your tokens for overflow.`,
      `For example, with a bonding curve of 70%, redeeming 10% of the token supply at any given time will claim around 7% of the total overflow.`,
      `The rest is left to share between token hodlers.`,
    ],
  },
  {
    q: 'How does the project benefit from its own overflow？',
    a: [
      `Projects can choose to keep a percentage of tokens for themselves rather than minting them for payers. So, projects can benefit from their own overflow.`,
    ],
  },
  {
    q: "Can I change my project's contract after it's been created?",
    a: [
      `A project owner can propose changes to any part of the contract at any time, with changes taking effect after the current budgeting time frame has ended.`,
      `For now, a minimum of 14 days must pass from the time of a proposed reconfiguration for it to take effect. This gives token holders time to react to the decision.`,
      `Anyone can deploy and use another governance smart contract to override this scheme.`,
    ],
  },
  {
    q: 'Can I remove my project?',
    a: [
      `We can't remove your project from blockchain, but you can contact us on Telegram so your project won't be visible on Utopians. But people can still use your project directly with contract.`,
    ],
  },
  {
    q: 'Why Metis Andromeda？',
    a: [
      `Due to the frequent congestion of the Ethereum network and the extremely high handling fees, many large-scale applications cannot be implemented on the Ethereum network.`,
      `So Layer1 is absolutely reliable and credible to ensure security and decentralization; it can achieve global consensus and act as an "encrypted court" to arbitrate through rules designed by smart contracts, and transfer trust to Layer2 in the form of economic incentives. Since Metis Andromeda Layer 2 pursues the ultimate performance and lower cost, it is much better suited to meet the needs of various business scenarios.`,
    ],
  },
  {
    q: "What's going on under the hood?",
    a: [
      `This website (utopians.world) connects to the Utopians protocol's smart contracts, deployed on the Andromeda  network. (note: anyone else can make a website that also connects to these same smart contracts. For now, don't trust any site other than this one to access the Utopians protocol.)`,
      `Creating a Utopians project mints you an NFT (ERC-721) representing ownership over it. Whoever owns this NFT can configure the rules of the game and how payouts are distributed.`,
      `The project's tokens that are minted and distributed as a result of a received payment are ERC-20's. The distribution schedule is proportional to payments recieved, weighted by the project's discount rate over time.`,
    ],
  },
  {
    q: 'How decentralized is Utopians?',
    a: [
      `Utopians is a governance-minimal protocol. There are only a few levers that can be tuned, none of which impose changes for users without their consent. The Utopians governance smart contract can adjust these levers.`,
      `At the start, power over the governance smart contract is held by Utopians's founding contributors. The intent is to soon transfer the power to a community of token holders.`,
    ],
  },
  {
    q: 'What are the risks？',
    a: [
      `Utopians has just started, although we have done our best to shape these public smart contracts and have undergone a lot of testing. However, because it is a public project, the use of these contracts may cause losses, including loss of funds. Please use it with caution.`,
    ],
  },
  {
    q: 'How have the contracts been tested？',
    a: [
      `Like traditional software, smart contract testing can also be divided into functional testing, non-functional testing, security testing, and regression testing, which can effectively avoid losses caused by contracts.`,
      `There are unit tests written for every condition of every function in the contracts, and integration tests for every workflow that the protocol supports.`,
      `There was also a script written for iteratively running the integration tests using a random input generator, prioritizing edge cases. The code has successfully passed over 1 millions test cases through this stress-testing script.`,
    ],
  },
]

export default function Faq() {
  return (
    <div className="faqContainer">
      <div className="faqWrapper">
        <h2 className="faqTitle">
          Frequently <span>asked</span> questions
          <p className="titleLine"></p>
        </h2>
        <div style={{ width: '100%', margin: '72px 0 0 0' }}>
          <Collapse
            defaultActiveKey={QAs.length ? 0 : undefined}
            accordion
            expandIconPosition="right"
            expandIcon={({ isActive }) => (
              <CaretDownOutlined
                style={{ color: '#2713E1' }}
                rotate={isActive ? 180 : 0}
              />
            )}
          >
            {QAs.map((qa, i) => (
              <CollapsePanel header={qa.q} key={i}>
                {qa.a && qa.a.map((p, j) => <p key={j}>{p}</p>)}
                {qa.img && <img src={qa.img.src} alt={qa.img.alt} />}
              </CollapsePanel>
            ))}
          </Collapse>
        </div>
      </div>
      <div className="faqStillCon">
        <h2>Still have a question?</h2>
        <p>
          If you couldn't find what you were looking for in our FAQ. you can
          always contact us on Telegram. We will answer to you shortly!
        </p>
      </div>
    </div>
  )
}
