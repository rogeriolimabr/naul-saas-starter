import * as React from "react"

function DashboardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={64}
      height={64}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M51.56 10.94H36.89a1.5 1.5 0 00-1.5 1.5v14.67a1.5 1.5 0 001.5 1.5h14.67a1.5 1.5 0 001.5-1.5V12.44a1.5 1.5 0 00-1.5-1.5zm-1.5 14.67H38.39V13.94h11.67v11.67zM27.11 35.39H12.44a1.5 1.5 0 00-1.5 1.5v14.67a1.5 1.5 0 001.5 1.5h14.67a1.5 1.5 0 001.5-1.5V36.89a1.5 1.5 0 00-1.5-1.5zm-1.5 14.67H13.94V38.39h11.67v11.67z"
        fill="#ed9b0f"
      />
      <path
        d="M29.56 8.5H10A1.5 1.5 0 008.5 10v19.56a1.5 1.5 0 001.5 1.5h19.56a1.5 1.5 0 001.5-1.5V10a1.5 1.5 0 00-1.5-1.5zm-1.5 19.56H11.5V11.5h16.56v16.56zM54 32.94H34.44a1.5 1.5 0 00-1.5 1.5V54a1.5 1.5 0 001.5 1.5H54a1.5 1.5 0 001.5-1.5V34.44a1.5 1.5 0 00-1.5-1.5zM52.5 52.5H35.94V35.94H52.5V52.5z"
        fill="currentColor"
      />
    </svg>
  )
}

export default DashboardIcon
