import React from "react";
import FBox from "elements/fbox";
import { BasicVar, DefaultColor, FontSize } from "styles/variables";
import Text from "elements/text";

interface PropsType {
    children: any
    items: CategoryItemType[]
    activeKey: number
    setActiveKey?: any
}

const Tab:React.FC<PropsType> = ({ children, items, activeKey, setActiveKey }) => {
    return (
        <FBox
            fDir={'column'}
        >
            <FBox
                alignSelf={'flex-start'}
                valign={'center'}
                fWrap={'wrap'}
                g={'0.5rem'}
                p={'0.5rem'}
                mb={'1.5rem'}
                bg={BasicVar.bg2.label}
                bdradius={BasicVar.bRound.label}
            >
                {items.map((item, key) => (
                    <FBox
                        as={'button'}
                        key={key}
                        onClick={() => setActiveKey ? setActiveKey(item) : null}
                        valign={'center'}
                        p={'0.5rem 1rem'}
                        bg={activeKey === key ? DefaultColor.warning.label : 'transparent'}
                        bdradius={BasicVar.bRound.label}
                        g={'0.5rem'}
						transition={'all ease-in-out .2s'}
                    >
                        <Text
                            color={activeKey === key ? DefaultColor.black.label : BasicVar.border2.label}
                        >
                            {item.label}
                        </Text>
                        <Text
                            p={'0.2rem 0.5rem'}
                            bg={DefaultColor.black.label}
                            fSize={FontSize.fSize6.label}
                            color={DefaultColor.white.label}
                            bdradius={BasicVar.bRadius.label}
                        >
                            {item.badge}
                        </Text>
                    </FBox>
                ))}
            </FBox>
            {
                children
            }
        </FBox>
    )
}

export default Tab;