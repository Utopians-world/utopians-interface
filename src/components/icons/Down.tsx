export default function Down({ size }: { size?: number }) {
  const height = 18
  const width = 18

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 23 19"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Triangle</title>
      <defs>
        <filter
          x="-1.5%"
          y="-14.8%"
          width="103.0%"
          height="129.6%"
          filterUnits="objectBoundingBox"
          id="filter-1"
        >
          <feOffset
            dx="0"
            dy="0"
            in="SourceAlpha"
            result="shadowOffsetOuter1"
          ></feOffset>
          <feGaussianBlur
            stdDeviation="2.5"
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
          ></feGaussianBlur>
          <feColorMatrix
            values="0 0 0 0 0.587883108   0 0 0 0 0.564201462   0 0 0 0 0.670940897  0 0 0 0.290892701 0"
            type="matrix"
            in="shadowBlurOuter1"
            result="shadowMatrixOuter1"
          ></feColorMatrix>
          <feMerge>
            <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
            <feMergeNode in="SourceGraphic"></feMergeNode>
          </feMerge>
        </filter>
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
          transform="translate(-124.000000, -525.000000)"
          fill="#2713E1"
        >
          <g id="LEFT" transform="translate(80.000000, 131.000000)">
            <g
              id="cycle1"
              filter="url(#filter-1)"
              transform="translate(27.000000, 368.000000)"
            >
              <path
                d="M29.0853115,39.2976263 L34.9586131,32.2496643 C35.2279952,31.9264057 35.1843198,31.4459755 34.8610612,31.1765933 C34.7241355,31.0624885 34.551539,31 34.3733016,31 L22.6266984,31 C22.20591,31 21.8647936,31.3411164 21.8647936,31.7619048 C21.8647936,31.9401421 21.9272822,32.1127386 22.0413869,32.2496643 L27.9146885,39.2976263 C28.1840707,39.6208848 28.664501,39.6645603 28.9877595,39.3951782 C29.02316,39.3656778 29.0558111,39.3330267 29.0853115,39.2976263 Z"
                id="Triangle"
              ></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}
