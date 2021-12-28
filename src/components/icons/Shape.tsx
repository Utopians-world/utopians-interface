export default function Shape({ size }: { size?: number }) {
  const height = 20
  const width = 20

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 26"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>形状</title>
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
          transform="translate(-272.000000, -514.000000)"
          fill="#A095C3"
          fill-rule="nonzero"
        >
          <g id="LEFT" transform="translate(80.000000, 131.000000)">
            <g
              id="cycle1"
              filter="url(#filter-1)"
              transform="translate(27.000000, 368.000000)"
            >
              <g id="clock" transform="translate(170.000000, 20.000000)">
                <path
                  d="M7.59039196,0 C3.39630151,0 0,3.584 0,8 C0,12.416 3.39630151,16 7.59039196,16 C11.7920804,16 15.1959799,12.416 15.1959799,8 C15.1959799,3.584 11.7920804,0 7.59039196,0 Z M7.91330653,8.694 L7.91330653,3.43 L6.51337688,3.43 L6.51337688,9.56 L6.53522111,9.56 L10.1537638,11.76 L10.8556281,10.483 L7.91520603,8.695 L7.91330653,8.694 Z M7.59798995,14.4000003 C5.9857457,14.4005307 4.43939003,13.7264174 3.29936113,12.5260695 C2.15933223,11.3257216 1.51909393,9.69754818 1.51959769,8 C1.51959769,4.464 4.23967839,1.6 7.59798995,1.6 C10.9563015,1.6 13.6763819,4.464 13.6763819,8 C13.6763819,11.536 10.9563015,14.4000003 7.59798995,14.4000003 L7.59798995,14.4000003 Z"
                  id="形状"
                ></path>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}
