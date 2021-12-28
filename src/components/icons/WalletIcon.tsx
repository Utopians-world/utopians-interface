export default function WalletIcon({ size }: { size?: number }) {
  const height = 10
  const width = 10

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 12"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <path
          d="M9.1,2 L1.9,2 C1.405,2 1.0045,2.50625 1.0045,3.125 L1,9.875 C1,10.49375 1.405,11 1.9,11 L9.1,11 C9.595,11 10,10.49375 10,9.875 L10,3.125 C10,2.50625 9.595,2 9.1,2 L9.1,2 Z M6.72727273,10 L1.81818182,10 L1.81818182,8 L6.72727273,8 L6.72727273,10 L6.72727273,10 Z M6.72727273,7 L1.81818182,7 L1.81818182,5 L6.72727273,5 L6.72727273,7 L6.72727273,7 Z M9.18181818,10 L7.54545455,10 L7.54545455,5 L9.18181818,5 L9.18181818,10 L9.18181818,10 Z"
          id="path-1"
        ></path>
      </defs>
      <g
        id="PROJECT-DETAIL"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <g
          id="detail-light-user-view"
          transform="translate(-330.000000, -269.000000)"
        >
          <g id="LEFT" transform="translate(80.000000, 131.000000)">
            <g id="section1" transform="translate(27.000000, 15.000000)">
              <g id="编组-20" transform="translate(223.145923, 123.500000)">
                <polygon
                  id="Base"
                  fill-rule="nonzero"
                  points="0 0 11.4958548 0 11.4958548 11 0 11"
                ></polygon>
                <mask id="mask-2" fill="white">
                  <use href="#path-1"></use>
                </mask>
                <use
                  id="Icon"
                  fill="#00DAC5"
                  fill-rule="nonzero"
                  href="#path-1"
                ></use>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}
