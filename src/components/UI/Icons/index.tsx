type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
    star: (props: IconProps) => (
        <svg
            {...props}
            width="26"
            height="24"
            viewBox="0 0 26 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M12.0489 0.927052C12.3483 0.00574112 13.6517 0.00573993 13.9511 0.927051L16.1432 7.67376C16.2771 8.08578 16.661 8.36475 17.0943 8.36475H24.1882C25.1569 8.36475 25.5597 9.60436 24.7759 10.1738L19.0369 14.3435C18.6864 14.5981 18.5397 15.0495 18.6736 15.4615L20.8657 22.2082C21.1651 23.1295 20.1106 23.8956 19.3269 23.3262L13.5878 19.1565C13.2373 18.9019 12.7627 18.9019 12.4122 19.1565L6.67312 23.3262C5.88941 23.8956 4.83493 23.1295 5.13428 22.2082L7.32642 15.4615C7.46029 15.0495 7.31363 14.5981 6.96315 14.3435L1.22405 10.1738C0.440337 9.60436 0.843112 8.36475 1.81184 8.36475H8.90575C9.33897 8.36475 9.72293 8.08578 9.8568 7.67376L12.0489 0.927052Z"
                fill="#A43FFD"
            />
        </svg>
    ),
    arrowRight: (props: IconProps) => (
        <svg
            {...props}
            width="20"
            height="24"
            viewBox="0 0 20 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M20 12L0 0.452994V23.547L20 12Z" fill="white" />
        </svg>
    ),
    cross: (props: IconProps) => (
        <svg
            {...props}
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M26.6663 5.33332L5.33301 26.6666M26.6663 26.6666L5.33301 5.33331"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
            />
        </svg>
    ),
    chevroneRight: (props: IconProps) => (
        <svg
            {...props}
            width="9"
            height="16"
            viewBox="0 0 9 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M8.70721 8.70711C9.09773 8.31658 9.09773 7.68342 8.70721 7.29289L2.34325 0.928932C1.95272 0.538408 1.31956 0.538408 0.929032 0.928932C0.538508 1.31946 0.538508 1.95262 0.929032 2.34315L6.58589 8L0.929032 13.6569C0.538508 14.0474 0.538508 14.6805 0.929032 15.0711C1.31956 15.4616 1.95272 15.4616 2.34325 15.0711L8.70721 8.70711ZM8 9H8.0001V7H8V9Z"
                fill="white"
            />
        </svg>
    ),
    search: (props: IconProps) => (
        <svg
            {...props}
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M22.569 22.72L27.1998 27.2M25.7065 15.2533C25.7065 21.0265 21.0264 25.7067 15.2531 25.7067C9.47992 25.7067 4.7998 21.0265 4.7998 15.2533C4.7998 9.48012 9.47992 4.8 15.2531 4.8C21.0264 4.8 25.7065 9.48012 25.7065 15.2533Z"
                stroke="#E1F7FF"
                stroke-opacity="0.5"
                stroke-width="2"
                stroke-linecap="round"
            />
        </svg>
    ),
    cartDesktop: (props: IconProps) => (
        <svg
            {...props}
            width="90"
            height="90"
            viewBox="0 0 90 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M58.5 31.5V20.25C58.5 12.7942 52.4558 6.75 45 6.75C37.5442 6.75 31.5 12.7942 31.5 20.25V31.5M17.7273 83.25H72.2727C77.0927 83.25 81 79.4153 81 74.6849L75.4091 29.2499C75.4091 24.5195 71.5017 20.6848 66.6818 20.6848H22.2273C17.4073 20.6848 13.5 24.5195 13.5 29.2499L9 74.6849C9 79.4153 12.9073 83.25 17.7273 83.25Z"
                stroke="#E1F7FF"
                stroke-opacity="0.5"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    ),
};
