import Icon from "components/icon";

const _MENUITEMS: CategoryItemType[] = [
    {
        label: "Dashboard",
        icon: <Icon icon="Home" />,
        link: "",
        key: "dash",
        badge: ""
    },
    {
        label: "Swap",
        icon: <Icon icon="Gallery" />,
        link: "swap",
        key: "swap",
        badge: ""
    },
    {
        label: "Transaction",
        icon: <Icon icon="Receipt" />,
        link: "tx",
        key: "tx",
        badge: ""
    },
    {
        label: "DAO",
        icon: <Icon icon="StrongBox" />,
        link: "dao",
        key: "dao",
        badge: ""
    },
    {
        label: "Staking",
        icon: <Icon icon="Lock" />,
        link: "staking",
        key: "staking",
        badge: ""
    }
]

export default _MENUITEMS;
