import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col gap-0">
      <section className="relative mb-12 overflow-hidden rounded-[44px] border border-[#f4d3b2] bg-[#fff6ec] px-6 py-12 sm:px-10">
        <div className="absolute -left-24 top-[-120px] h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(250,172,66,0.45),transparent_65%)]" />
        <div className="absolute -right-20 bottom-[-120px] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(26,161,213,0.35),transparent_70%)]" />

        <div className="relative mx-auto w-full max-w-5xl space-y-10">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#1b3f7a]/70">
              Primer mes en Utah
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-[#12376c] sm:text-5xl">
              Elige el apoyo que necesitas hoy.
            </h1>
            <p className="text-base text-[#1b3f7a]/70">
              Ocho tarjetas esenciales en un tablero bento para empezar con paso
              seguro. No pedimos estatus migratorio ni documentos; tu privacidad
              y seguridad son prioridad.
            </p>
          </div>

          <div className="grid auto-rows-[150px] gap-6 md:grid-cols-4 md:auto-rows-[170px]">
          <Link
            href="/alimentos"
            className="group flex h-full flex-col justify-between rounded-[28px] border border-[#f4d3b2] bg-gradient-to-br from-[#fff7ef] via-[#fff2e6] to-[#fff9f2] p-6 shadow-[0_25px_60px_-45px_rgba(26,161,213,0.45)] transition hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#ffe2c5]">
                <svg
                  fill="#ff943d"
                  height="200px"
                  width="200px"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 470 470"
                  xmlSpace="preserve"
                  stroke="#ff943d"
                  className="h-12 w-12"
                >
                  <g>
                    <path d="M462.5,270.58c-4.142,0-7.5,3.358-7.5,7.5v22.5H15v-22.5c0-4.142-3.358-7.5-7.5-7.5s-7.5,3.358-7.5,7.5v183.137 c0,4.142,3.358,7.5,7.5,7.5h455c4.142,0,7.5-3.358,7.5-7.5V278.08C470,273.938,466.642,270.58,462.5,270.58z M455,330.58H67.5 c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5H455v108.137H15V345.58h22.5c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5H15v-15 h440V330.58z" />
                    <path d="M189.28,283.891c1.393,1.137,3.07,1.69,4.738,1.69c2.175,0,4.332-0.941,5.814-2.757l83.154-101.865 c2.619-3.208,2.142-7.933-1.067-10.553c-3.208-2.619-7.933-2.142-10.553,1.067l-83.154,101.865 C185.594,276.546,186.071,281.271,189.28,283.891z" />
                    <path d="M226.213,273.338c-2.619,3.208-2.142,7.933,1.067,10.553c1.393,1.137,3.07,1.69,4.738,1.69 c2.175,0,4.332-0.941,5.814-2.757c0,0,81.987-100.437,83.139-101.847c0.004-0.006,0.009-0.011,0.014-0.017 c0.462-0.566,0.958-1.114,1.472-1.629c8.355-8.354,21.95-8.354,30.305,0l20.679,20.679c8.355,8.355,8.355,21.95,0,30.306 c-0.515,0.515-1.063,1.01-1.627,1.471l-49.594,40.484c-3.209,2.62-3.687,7.344-1.067,10.553c1.483,1.816,3.64,2.757,5.814,2.757 c1.667,0,3.346-0.553,4.738-1.69l49.595-40.485c0.954-0.779,1.878-1.615,2.747-2.484c12.334-12.335,13.951-31.384,4.863-45.486 c20.311-18.05,46.189-27.922,73.589-27.922c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5c-30.352,0-59.063,10.668-81.858,30.223 l63.241-63.24c2.929-2.929,2.929-7.677,0-10.606c-2.929-2.929-7.678-2.929-10.606,0l-63.236,63.236 c19.553-22.795,30.219-51.503,30.219-81.853c0-4.142-3.358-7.5-7.5-7.5s-7.5,3.358-7.5,7.5c0,27.399-9.872,53.278-27.922,73.589 c-14.102-9.089-33.152-7.472-45.486,4.862c-0.869,0.869-1.705,1.793-2.484,2.747l0.019,0.015c-0.335,0.374-0.648,0.757-0.953,1.13 L226.213,273.338z" />
                    <path d="M37.477,285.58c4.142,0,7.5-3.358,7.5-7.5V96.334h106.47V278.08c0,4.142,3.358,7.5,7.5,7.5s7.5-3.358,7.5-7.5V91.235 l28.212-39.54l21.148,29.638H195.8c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h27.071v89.779c0,4.142,3.358,7.5,7.5,7.5 s7.5-3.358,7.5-7.5V88.834c0-1.562-0.488-3.085-1.395-4.356l-34.317-48.096V8.783c0-4.142-3.358-7.5-7.5-7.5H73.189 c-4.142,0-7.5,3.358-7.5,7.5v27.598L31.371,84.478c-0.907,1.271-1.395,2.794-1.395,4.356V278.08 C29.977,282.222,33.334,285.58,37.477,285.58z M80.689,16.283h106.47v15H80.689V16.283z M77.051,46.283h103.043l-25.01,35.051 H52.041L77.051,46.283z" />
                    <path d="M432.5,285.581c4.142,0,7.5-3.358,7.5-7.5v-12.462c0-15.596-9.857-29.732-24.528-35.176c-3.885-1.44-8.2,0.539-9.641,4.422 c-1.441,3.884,0.539,8.2,4.422,9.641c8.82,3.273,14.747,11.757,14.747,21.113v12.462C425,282.223,428.358,285.581,432.5,285.581z" />
                  </g>
                </svg>
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-[#12376c]">
              Alimentos
            </h2>
          </Link>

          <Link
            href="/vivienda"
            className="group flex h-full flex-col justify-between rounded-[28px] border border-[#f4d3b2] bg-gradient-to-br from-[#fff6e8] via-[#fff1d8] to-[#fff9ef] p-6 shadow-[0_22px_45px_-40px_rgba(242,140,40,0.4)] transition hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#fdeac9]">
                <svg
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#f7bb3b"
                  stroke="#f7bb3b"
                  className="h-12 w-12"
                >
                  <path
                    fill="var(--ci-primary-color, #ffba24)"
                    d="M408,406.545V248H288V406.545ZM320,280h56v94.545H320Z"
                    className="ci-primary"
                  />
                  <path
                    fill="var(--ci-primary-color, #ffba24)"
                    d="M271.078,33.749a34,34,0,0,0-47.066.984L32,226.745V496H144V336h64V496H480V225.958ZM448,464H240V304H112V464H64V240L249.412,57.356V57.3L448,240Z"
                    className="ci-primary"
                  />
                </svg>
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-[#12376c]">Vivienda</h2>
          </Link>

          <Link
            href="/asesoria_legal"
            className="group flex h-full flex-col justify-between rounded-[28px] border border-[#e9d6f0] bg-gradient-to-br from-[#fff7fb] via-[#fff2f9] to-[#f7eefe] p-6 shadow-[0_20px_45px_-40px_rgba(153,82,170,0.35)] transition hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#f6dff4]">
                <svg
                  fill="#6e03b5"
                  height="200px"
                  width="200px"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 392.598 392.598"
                  xmlSpace="preserve"
                  stroke="#6e03b5"
                  className="h-12 w-12"
                >
                  <g>
                    <g>
                      <path d="M390.943,214.238l-54.885-113.196c7.24,2.133,23.467,7.758,24.824,7.758c4.396,0,8.469-2.651,10.214-7.046 c2.133-5.624-0.646-11.895-6.271-14.093c-36.331-13.899-83.2-23.014-133.042-25.859c-3.297-11.96-12.606-21.527-24.436-25.212 V10.925C207.347,4.913,202.498,0,196.422,0c-6.077,0-10.99,4.848-10.99,10.925v25.729c-11.766,3.685-20.945,13.188-24.242,25.083 c-49.972,2.844-97.034,11.895-133.236,25.859c-5.624,2.133-8.404,8.469-6.271,14.093c1.681,4.331,5.818,6.982,10.214,6.982 c1.293,0,17.519-5.56,24.824-7.758L1.189,215.596c-0.065,0.129-1.099,5.301-1.099,5.43c1.939,40.016,34.78,71.37,74.861,71.37 c39.499,0,71.887-30.384,74.731-69.56c0.129-0.776-0.711-7.24-1.552-8.469L89.302,93.026c22.562-4.655,47.063-7.822,72.533-9.244 c3.814,10.925,12.541,19.459,23.596,22.949v216.954h-46.739c-3.297,0-6.465,1.552-8.598,4.073l-37.43,47.127 c-2.651,3.232-3.103,7.758-1.228,11.507c1.875,3.814,5.624,6.206,9.826,6.206h190.255c0.065,0,0.065,0,0.065,0 c6.012,0,10.925-4.849,10.925-10.925c0-3.038-1.228-5.818-3.232-7.822l-36.719-46.287c-2.069-2.65-5.236-4.073-8.598-4.073 h-46.675V106.602c11.119-3.491,19.911-12.024,23.725-23.014c25.341,1.487,49.842,4.655,72.404,9.244l-59.41,122.634 c-0.065,0.129-1.099,5.301-1.099,5.43c1.939,40.016,34.78,71.37,74.861,71.37c39.499,0,71.887-30.384,74.731-69.56 C392.624,221.996,391.783,215.467,390.943,214.238z M74.951,270.545c-24.501,0-45.188-16.549-51.329-39.305h102.594 C120.203,253.996,99.452,270.545,74.951,270.545z M121.561,209.39H28.406l46.61-96.065L121.561,209.39z M248.785,345.341 l20.17,25.471H123.824l20.17-25.471H248.785z M196.422,86.626c-8.275,0-14.998-6.723-14.998-14.998 c0-8.275,6.723-14.998,14.998-14.998c8.275,0,14.998,6.723,14.998,14.998C211.42,79.903,204.696,86.626,196.422,86.626z M317.763,113.325l46.61,96.065h-93.22L317.763,113.325z M317.763,270.545c-24.501,0-45.188-16.549-51.329-39.305h102.594 C362.951,253.996,342.264,270.545,317.763,270.545z" />
                    </g>
                  </g>
                </svg>
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-[#12376c]">
              Asesoria legal
            </h2>
          </Link>

          <Link
            href="/transporte"
            className="group flex h-full flex-col justify-between rounded-[28px] border border-[#cfe5ec] bg-gradient-to-br from-[#f3fbfd] via-[#e8f6fa] to-[#f7fbff] p-6 shadow-[0_20px_45px_-40px_rgba(26,161,213,0.35)] transition hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#dff1f7]">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 32 32"
                  xmlSpace="preserve"
                  fill="#51c7d6"
                  stroke="#51c7d6"
                  className="h-12 w-12"
                >
                  <path
                    d="M12,26H6v2c0,1.1,0.9,2,2,2h2c1.1,0,2-0.9,2-2V26z"
                    fill="none"
                    stroke="#51b0bd"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M26,26h-6v2c0,1.1,0.9,2,2,2h2c1.1,0,2-0.9,2-2V26z"
                    fill="none"
                    stroke="#51b0bd"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M25,26H7c-1.1,0-2-0.9-2-2V7c0-2.2,1.8-4,4-4h14c2.2,0,4,1.8,4,4v17C27,25.1,26.1,26,25,26z"
                    fill="none"
                    stroke="#51b0bd"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M5,16L5,16c7.1,2.6,14.9,2.6,22,0l0,0"
                    fill="none"
                    stroke="#51b0bd"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                  />
                  <line
                    x1="8"
                    y1="21"
                    x2="12"
                    y2="22"
                    fill="none"
                    stroke="#51b0bd"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                  />
                  <line
                    x1="24"
                    y1="21"
                    x2="20"
                    y2="22"
                    fill="none"
                    stroke="#51b0bd"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                  />
                  <polyline
                    points="27,9 31,11 31,16"
                    fill="none"
                    stroke="#51b0bd"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                  />
                  <polyline
                    points="5,9 1,11 1,16"
                    fill="none"
                    stroke="#51b0bd"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                  />
                </svg>
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-[#12376c]">
              Transporte
            </h2>
          </Link>

          <Link
            href="/escuela"
            className="group flex h-full flex-col justify-between rounded-[28px] border border-[#f4d3b2] bg-gradient-to-br from-[#fff7ef] via-[#ffeede] to-[#fff9f2] p-6 shadow-[0_20px_45px_-40px_rgba(242,140,40,0.35)] transition hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#ffe2c5]">
                <svg
                  fill="#ff841f"
                  height="200px"
                  width="200px"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 512 512"
                  xmlSpace="preserve"
                  stroke="#ff841f"
                  strokeWidth="0.00512"
                  className="h-12 w-12"
                >
                  <g>
                    <g>
                      <g>
                        <path d="M53.333,405.261h64c5.888,0,10.667-4.779,10.667-10.667v-64c0-5.888-4.779-10.667-10.667-10.667h-64 c-5.888,0-10.667,4.779-10.667,10.667v64C42.667,400.483,47.445,405.261,53.333,405.261z M64,341.261h42.667v42.667H64V341.261z" />
                        <path d="M510.933,262.093c-0.043-0.085-0.021-0.192-0.064-0.277l-42.667-85.333c-1.813-3.605-5.504-5.888-9.536-5.888h-96 v-21.333h10.667c4.224,0,8.064-2.496,9.749-6.379c1.707-3.861,0.96-8.384-1.899-11.499l-117.333-128 c-4.032-4.416-11.691-4.416-15.723,0l-117.333,128c-2.859,3.115-3.605,7.637-1.899,11.499c1.707,3.883,5.547,6.379,9.771,6.379 h10.667v21.355h-96c-4.032,0-7.723,2.283-9.536,5.888L1.131,261.837c-0.043,0.085-0.021,0.171-0.064,0.256 C0.427,263.459,0,264.952,0,266.595v192c0,5.888,4.779,10.667,10.667,10.667h138.667v21.333h-10.667 c-5.888,0-10.667,4.779-10.667,10.667s4.779,10.667,10.667,10.667h234.667c5.888,0,10.667-4.779,10.667-10.667 s-4.779-10.667-10.667-10.667h-10.667v-21.333h138.667c5.888,0,10.667-4.779,10.667-10.667v-192 C512,264.973,511.573,263.48,510.933,262.093z M149.333,447.928h-128V277.261h128V447.928z M149.333,255.928H27.925l32-64h89.408 V255.928z M277.333,490.595h-42.667v-85.333h42.667V490.595z M341.333,490.595h-42.667v-96c0-5.888-4.779-10.667-10.667-10.667 h-64c-5.888,0-10.667,4.779-10.667,10.667v96h-42.667V149.261h170.667V490.595z M162.923,127.928l93.099-101.547l93.077,101.547 H162.923z M362.667,191.928h89.408l32,64H362.667V191.928z M490.667,447.928h-128V277.261h128V447.928z" />
                        <path d="M394.667,405.261h64c5.888,0,10.667-4.779,10.667-10.667v-64c0-5.888-4.779-10.667-10.667-10.667h-64 c-5.888,0-10.667,4.779-10.667,10.667v64C384,400.483,388.779,405.261,394.667,405.261z M405.333,341.261H448v42.667h-42.667 V341.261z" />
                        <path d="M259.115,252.813c2.091,2.069,4.821,3.115,7.552,3.115c2.731,0,5.461-1.045,7.552-3.115c4.16-4.16,4.16-10.923,0-15.083 l-7.552-7.552v-16.917c0-5.888-4.779-10.667-10.667-10.667s-10.667,4.779-10.667,10.667v21.333c0,2.837,1.109,5.547,3.115,7.552 L259.115,252.813z" />
                        <path d="M256,298.595c35.285,0,64-28.715,64-64s-28.715-64-64-64s-64,28.715-64,64S220.715,298.595,256,298.595z M256,191.928 c23.531,0,42.667,19.136,42.667,42.667S279.531,277.261,256,277.261s-42.667-19.136-42.667-42.667S232.469,191.928,256,191.928z" />
                      </g>
                    </g>
                  </g>
                </svg>
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-[#12376c]">Escuela</h2>
          </Link>

          <Link
            href="/un_amigo"
            className="group flex h-full flex-col justify-between rounded-[28px] border border-[#f4d3b2] bg-gradient-to-br from-[#fff] via-[#fff5ea] to-[#f3fbff] p-6 shadow-[0_20px_50px_-42px_rgba(26,161,213,0.35)] transition hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#e5f3ff]">
                <svg
                  viewBox="0 0 1024 1024"
                  fill="#36c4e7"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#36c4e7"
                  className="h-12 w-12"
                >
                  <path d="M324.8 440c34.4 0 62.4-28 62.4-62.4s-28-62.4-62.4-62.4-62.4 28-62.4 62.4 28 62.4 62.4 62.4z m374.4 0c34.4 0 62.4-28 62.4-62.4s-28-62.4-62.4-62.4-62.4 28-62.4 62.4 28 62.4 62.4 62.4zM340 709.6C384 744 440.8 764.8 512 764.8s128-20.8 172-55.2c26.4-21.6 42.4-42.4 50.4-58.4 6.4-12 0.8-27.2-11.2-33.6s-27.2-0.8-33.6 11.2c-0.8 1.6-3.2 6.4-8 12-7.2 10.4-17.6 20-28.8 29.6-34.4 28-80.8 44.8-140.8 44.8s-105.6-16.8-140.8-44.8c-12-9.6-21.6-20-28.8-29.6-4-5.6-7.2-9.6-8-12-6.4-12-20.8-17.6-33.6-11.2s-17.6 20.8-11.2 33.6c8 16 24 36.8 50.4 58.4z" />
                  <path d="M512 1010.4c-276.8 0-502.4-225.6-502.4-502.4S235.2 5.6 512 5.6s502.4 225.6 502.4 502.4-225.6 502.4-502.4 502.4zM512 53.6C261.6 53.6 57.6 257.6 57.6 508s204 454.4 454.4 454.4 454.4-204 454.4-454.4S762.4 53.6 512 53.6z" />
                </svg>
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-[#12376c]">
              Un amigo
            </h2>
          </Link>

          <Link
            href="/doctor"
            className="group flex h-full flex-col justify-between rounded-[28px] border border-[#e5efd9] bg-gradient-to-br from-[#f4fbf1] via-[#eaf6e6] to-[#f8fcf6] p-6 shadow-[0_20px_45px_-40px_rgba(78,145,74,0.35)] transition hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#e4f3dc]">
                <svg
                  fill="#3f7a29"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 430.185 430.184"
                  xmlSpace="preserve"
                  stroke="#3f7a29"
                  className="h-12 w-12"
                >
                  <g>
                    <g>
                      <path d="M151.675,307.655h27.982c0,0,3.894-0.701,3.894,3.465c0,7.103,0,28.41,0,28.41c0,4.297,3.516,7.812,7.813,7.812h47.459 c4.297,0,7.813-3.516,7.813-7.812c0,0,0-21.057,0-28.076c0-3.166,4.188-3.799,4.188-3.799h27.687c4.296,0,7.812-3.516,7.812-7.812 v-47.461c0-4.295-3.515-7.811-7.812-7.811c0,0-21.297,0-28.396,0c-3,0-3.479-3.867-3.479-3.867v-28.008 c0-4.297-3.517-7.813-7.813-7.813h-47.459c-4.297,0-7.813,3.516-7.813,7.813v28.258c0,0,0.19,3.617-3.435,3.617 c-7.11,0-28.44,0-28.44,0c-4.297,0-7.812,3.516-7.812,7.811v47.461C143.863,304.14,147.378,307.655,151.675,307.655z" />
                      <path d="M407.903,105.043c0,0-54.336,0-72.448,0c-3.625,0-3.75-3.319-3.75-3.319V43.761c0-9.023-7.341-16.364-16.364-16.364 h-200.5c-9.023,0-16.364,7.341-16.364,16.364c0,0,0,43.284,0,57.712c0,3.667-4.106,3.569-4.106,3.569h-72.09 C9.995,105.042,0,115.037,0,127.323v253.183c0,12.285,9.995,22.281,22.281,22.281h385.622c12.286,0,22.281-9.996,22.281-22.281 V127.324C430.185,115.038,420.189,105.043,407.903,105.043z M118.478,51.849c0-4,3.102-4.451,3.102-4.451h185.959 c0,0,4.167,0.743,4.167,4.576c0,10.789,0,39.122,0,49.333c0,2.347-0.5,3.736-4.333,3.736c-46.292,0-185.167,0-185.167,0 s-3.728,0.097-3.728-3.236C118.478,89.317,118.478,65.147,118.478,51.849z M410.185,380.507c0,1.235-1.045,2.28-2.281,2.28H22.281 c-1.236,0-2.281-1.043-2.281-2.28c0,0,0-155.464,0-207.284c0-2.333,2.789-2.641,2.789-2.641h384.542c0,0,2.854,0.141,2.854,3.016 C410.185,225.327,410.185,380.507,410.185,380.507z M404.956,150.582c-95.031,0-380.125,0-380.125,0S20,150.848,20,146.973 c0-4.913,0-19.65,0-19.65c0-1.236,1.044-2.281,2.281-2.281h385.622c1.236,0,2.281,1.044,2.281,2.281v19.4 C410.185,146.724,410.206,150.582,404.956,150.582z" />
                    </g>
                  </g>
                </svg>
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-[#12376c]">Doctor</h2>
          </Link>

          <Link
            href="/telefono_movil"
            className="group flex h-full flex-col justify-between rounded-[28px] border border-[#f4d3b2] bg-gradient-to-br from-[#f1f9fb] via-[#e6f2f5] to-[#f7fbfd] p-6 shadow-[0_20px_45px_-40px_rgba(26,161,213,0.35)] transition hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#dff1f7]">
                <svg
                  fill="#47899a"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 445.849 445.849"
                  xmlSpace="preserve"
                  stroke="#47899a"
                  className="h-12 w-12"
                >
                  <g>
                    <g>
                      <path d="M303.236,445.849c21.662,0,39.278-17.621,39.278-39.288V39.289C342.515,17.625,324.898,0,303.236,0H142.612 c-21.66,0-39.278,17.618-39.278,39.289v367.272c0,21.662,17.618,39.288,39.278,39.288H303.236z M246.018,11.86l-0.224,0.576 c-0.294,0.774-1.432,1.546-2.249,1.546h-40.774c-0.861,0-2.077-0.812-2.41-1.602l-0.221-0.521H246.018z M115.184,406.566V39.289 c0-15.13,12.309-27.437,27.429-27.437h51.097l1.186,2.818c1.257,2.979,4.639,5.23,7.876,5.23h40.774 c3.275,0,6.626-2.313,7.789-5.38l1.011-2.678h50.892c15.127,0,27.426,12.309,27.426,27.438v367.27 c0,15.127-12.304,27.437-27.426,27.437H142.612C127.492,433.997,115.184,421.698,115.184,406.566z" />
                      <path d="M265.212,23.897h6.028c1.919,0,3.468-1.557,3.468-3.474c0-1.911-1.554-3.471-3.468-3.471h-6.028 c-1.919,0-3.473,1.56-3.473,3.471C261.739,22.34,263.303,23.897,265.212,23.897z" />
                      <path d="M290.46,14.553c3.245,0,5.87,2.628,5.87,5.87c0,3.24-2.625,5.868-5.87,5.868c-3.239,0-5.87-2.628-5.87-5.868 C284.59,17.181,287.221,14.553,290.46,14.553z" />
                      <path d="M321.578,400.249V48.695c0-1.635-1.326-2.96-2.961-2.96H127.231c-1.635,0-2.96,1.325-2.96,2.96v351.553 c0,1.636,1.325,2.961,2.96,2.961h191.396C320.258,403.209,321.578,401.884,321.578,400.249z M315.657,397.283H130.194V51.659 h185.468v345.624H315.657z" />
                    </g>
                  </g>
                </svg>
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-[#12376c]">
              Telefono movil
            </h2>
          </Link>

          <Link
            href="/trabajo"
            className="group flex h-full flex-col justify-between rounded-[28px] border border-[#f4d3b2] bg-gradient-to-br from-[#fff] via-[#fff5ea] to-[#fff1f7] p-6 shadow-[0_20px_45px_-40px_rgba(242,140,40,0.25)] transition hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#ffe2c5]">
                <svg
                  fill="#f97c15"
                  height="200px"
                  width="200px"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 490 490"
                  xmlSpace="preserve"
                  stroke="#f97c15"
                  className="h-12 w-12"
                >
                  <g>
                    <path d="M342.194,99.415v-61.24C342.194,17.125,326.088,0,306.296,0H183.704c-19.792,0-35.899,17.125-35.899,38.175v61.24H0V490h490 V99.415H342.194z M168.656,38.175c0-9.551,6.75-17.324,15.048-17.324h122.592c8.298,0,15.047,7.773,15.047,17.324v61.24H168.656 V38.175z M469.149,120.266v148.218h-70.886V218.02h-98.061v50.463H189.798V218.02h-98.06v50.463H20.851V120.266H469.149z M377.412,238.871v80.075h-56.358v-80.075H377.412z M168.947,238.871v80.075h-56.358v-80.075H168.947z M20.851,469.149V289.334 h70.886v50.463h98.06v-50.463h110.404v50.463h98.061v-50.463h70.886v179.814H20.851z" />
                  </g>
                </svg>
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-[#12376c]">Trabajo</h2>
          </Link>

          <Link
            href="/cuenta_bancaria"
            className="group flex h-full flex-col justify-between rounded-[28px] border border-[#e5efd9] bg-gradient-to-br from-[#f4fbf1] via-[#eaf6e6] to-[#f8fcf6] p-6 shadow-[0_20px_45px_-40px_rgba(78,145,74,0.35)] transition hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#e4f3dc]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#31b800"
                  className="h-12 w-12"
                >
                  <g>
                    <path
                      d="M12.37 2.15009L21.37 5.75006C21.72 5.89006 22 6.31006 22 6.68006V10.0001C22 10.5501 21.55 11.0001 21 11.0001H3C2.45 11.0001 2 10.5501 2 10.0001V6.68006C2 6.31006 2.28 5.89006 2.63 5.75006L11.63 2.15009C11.83 2.07009 12.17 2.07009 12.37 2.15009Z"
                      stroke="#066100"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 22H2V19C2 18.45 2.45 18 3 18H21C21.55 18 22 18.45 22 19V22Z"
                      stroke="#066100"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 18V11"
                      stroke="#066100"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 18V11"
                      stroke="#066100"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 18V11"
                      stroke="#066100"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 18V11"
                      stroke="#066100"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20 18V11"
                      stroke="#066100"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1 22H23"
                      stroke="#066100"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z"
                      stroke="#066100"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-[#12376c]">
              Cuenta bancaria
            </h2>
          </Link>

          <Link
            href="/ropa_muebles"
            className="group flex h-full flex-col justify-between rounded-[28px] border border-[#cfe5ec] bg-gradient-to-br from-[#f3fbfd] via-[#e8f6fa] to-[#f7fbff] p-6 shadow-[0_20px_45px_-40px_rgba(26,161,213,0.35)] transition hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#dff1f7]">
                <svg
                  viewBox="0 -4.49 74.772 74.772"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#4cadd6"
                  stroke="#4cadd6"
                  className="h-12 w-12"
                >
                  <g>
                    <g transform="translate(-317.996 -163.725)">
                      <g>
                        <g>
                          <g>
                            <path d="M392.465,174.776c-3.41-2.693-13.283-6.1-13.732-6.282l-14.539-4.577a3.476,3.476,0,0,0-2.513.09c-1.974.808-6.282.808-6.282.808a23.653,23.653,0,0,1-6.282-.808,3.7,3.7,0,0,0-2.6-.09l-14.45,4.577c-.449.179-10.231,3.5-13.732,6.282a.85.85,0,0,0-.179,1.167l7.988,13.911a.973.973,0,0,0,1.077.449c.628-.18,2.6-.538,3.59,0a1.478,1.478,0,0,1,.718.9l-.718,37.425a.919.919,0,0,0,.9.9h47.477a.815.815,0,0,0,.628-.269.966.966,0,0,0,.269-.628l-.718-37.425a1.7,1.7,0,0,1,.718-.9,4.918,4.918,0,0,1,3.59,0,1.092,1.092,0,0,0,1.077-.449l7.988-13.911A1.294,1.294,0,0,0,392.465,174.776Zm-37.246-7.988a52.921,52.921,0,0,0,5.834-.718c0,.179-.09.359-.09.538a7.655,7.655,0,0,1-.808,2.782c-.9,1.705-2.423,2.6-4.846,2.6a5.044,5.044,0,0,1-4.846-2.513,7.656,7.656,0,0,1-.808-2.782.673.673,0,0,0-.09-.449A29.731,29.731,0,0,0,355.219,166.788Zm-7.9-.807a.762.762,0,0,1,.718.628,8.884,8.884,0,0,0,1.077,3.59c1.257,2.333,3.41,3.5,6.372,3.5s5.116-1.167,6.372-3.5a8.269,8.269,0,0,0,.987-3.59.613.613,0,0,1,.628-.628.64.64,0,0,1,.628.718,10.251,10.251,0,0,1-1.167,4.128c-.987,1.885-3.141,4.218-7.539,4.218s-6.552-2.333-7.539-4.218a10.608,10.608,0,0,1-1.167-4.128C346.6,166.34,346.962,166.07,347.321,165.981Zm-15.706,22.8a6.708,6.708,0,0,0-4.308-.359l-7.27-12.654c3.051-2.064,9.6-4.487,11.847-5.205a44.522,44.522,0,0,1,3.321,9.6c.539,3.141.628,7.18-.808,9.154a3.137,3.137,0,0,1-1.346,1.077A3.2,3.2,0,0,0,331.615,188.777Zm.9,38.861.718-35.63a5.1,5.1,0,0,0,2.6-1.795c2.244-3.051,1.526-8.436,1.167-10.59a48.664,48.664,0,0,0-3.321-9.783l11.308-3.5v.359a11.694,11.694,0,0,0,1.346,4.936,9.9,9.9,0,0,0,9.154,5.205c4.129,0,7.359-1.795,9.154-5.205a11.977,11.977,0,0,0,1.346-4.936v-.359l11.308,3.5a43.623,43.623,0,0,0-3.321,9.783c-.359,2.154-1.077,7.539,1.167,10.59a4.462,4.462,0,0,0,2.6,1.795l.628,35.63Zm50.977-39.22a6.708,6.708,0,0,0-4.308.359,3.165,3.165,0,0,0-1.346,1.526,2.6,2.6,0,0,1-1.346-1.077c-1.526-2.064-1.436-6.1-.808-9.154a46.383,46.383,0,0,1,3.321-9.6c2.244.808,8.706,3.231,11.847,5.205Z" />
                          </g>
                          <g>
                            <path d="M368.861,181.328h-8.706a.815.815,0,0,0-.628.269,1.018,1.018,0,0,0-.269.718l.628,8.795a.862.862,0,0,0,.628.808l3.769,1.167h.538l3.769-1.167a.862.862,0,0,0,.628-.808l.628-8.795a1.2,1.2,0,0,0-.269-.718A1.18,1.18,0,0,0,368.861,181.328Zm-1.436,9.064-2.872.9-2.872-.9-.628-7.27h6.821Z" />
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-[#12376c]">
              Ropa y muebles
            </h2>
          </Link>

          <Link
            href="/iglesia"
            className="group flex h-full flex-col justify-between rounded-[28px] border border-[#e9d6f0] bg-gradient-to-br from-[#fff7fb] via-[#fff2f9] to-[#f7eefe] p-6 shadow-[0_20px_45px_-40px_rgba(153,82,170,0.35)] transition hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#f6dff4]">
                <svg
                  fill="#4f1e8a"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 512 512"
                  xmlSpace="preserve"
                  stroke="#4f1e8a"
                  className="h-12 w-12"
                >
                  <g>
                    <g>
                      <path d="M255.999,159.813c-17.926,0-32.509,14.583-32.509,32.508v47.167h65.017v-47.167C288.508,174.396,273.925,159.813,255.999,159.813z M273.071,224.05h-34.143v-31.73c0-9.413,7.658-17.07,17.071-17.07 c9.414,0,17.071,7.658,17.071,17.07V224.05z" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M104.103,321.618c-17.926,0-32.509,14.583-32.509,32.509v47.167h65.017v-47.167 C136.611,336.202,122.028,321.618,104.103,321.618z M121.174,385.857H87.031v-31.73c0-9.413,7.658-17.071,17.071-17.071 c9.414,0,17.071,7.658,17.071,17.071V385.857z" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M407.896,321.618c-17.926,0-32.509,14.583-32.509,32.509v47.167h65.017v-47.167 C440.405,336.202,425.822,321.618,407.896,321.618z M424.968,385.857h-34.143v-31.73c0-9.413,7.658-17.071,17.071-17.071 s17.071,7.658,17.071,17.071V385.857z" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M475.69,474.641V281.799l-120.15-44.145v-77.605l-91.822-90.213v-31.24h20.579V23.159h-20.579V0h-15.437v23.159h-20.579 v15.437h20.579v31.239l-91.822,90.213v77.605l-120.15,44.146v192.842H16.225V512h479.55v-37.359H475.69z M355.54,254.1 l104.713,38.473v11.065L355.54,265.166V254.1z M355.54,281.612l104.713,38.473v154.556H355.54V281.612z M171.896,166.524 l84.104-82.63l84.104,82.63v13.663l-84.104-82.63l-84.104,82.63V166.524z M255.999,321.618c-36.818,0-66.771,29.953-66.771,66.77 v86.253h-17.333V231.982v-30.155l84.104-82.629l84.104,82.629v30.155v242.659H322.77v-86.253 C322.77,351.572,292.817,321.618,255.999,321.618z M307.333,388.389v86.253h-43.615V337.637 C288.374,341.372,307.333,362.707,307.333,388.389z M248.281,337.636v137.005h-43.615v-86.253 C204.666,362.706,223.625,341.371,248.281,337.636z M51.746,292.573l104.713-38.474v11.065L51.746,303.638V292.573z M51.746,320.085l104.713-38.473v193.03H51.746V320.085z M480.339,496.563h-0.002H31.662v-6.485h4.648h120.15h15.437h17.333 h133.542h17.333h15.437h120.15h4.648V496.563z" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <rect x="183.692" y="291.104" width="14.939" height="15.437" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <rect x="216.11" y="291.104" width="14.938" height="15.437" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <rect x="248.528" y="291.104" width="14.939" height="15.437" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <rect x="280.946" y="291.104" width="14.938" height="15.437" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <rect x="313.374" y="291.104" width="14.939" height="15.437" />
                    </g>
                  </g>
                </svg>
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-[#12376c]">Igreja</h2>
          </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
