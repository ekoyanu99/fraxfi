import styled from 'styled-components'
import { device } from 'styles/variables'

export const setStyle = (styles: ElementDefaultProps) => {
	return `
		${styles.bs				? `box-sizing: ${styles.bs};`					: ``}
		${styles.position		? `position: ${styles.position};`				: ``}
		${styles.zIndex			? `z-index: ${styles.zIndex};`					: ``}
		${styles.top			? `top: ${styles.top};`							: ``}
		${styles.left			? `left: ${styles.left};`						: ``}
		${styles.bottom			? `bottom: ${styles.bottom};`					: ``}
		${styles.right			? `right: ${styles.right};`						: ``}
		${styles.flex			? `flex: ${styles.flex};`						: ``}
		${styles.justifySelf	? `justify-self: ${styles.justifySelf};`		: ``}
		${styles.justifyItems	? `justify-items: ${styles.justifyItems};`		: ``}
		${styles.justifyContent	? `justify-content: ${styles.justifyContent};`	: ``}
		${styles.justifyTracks	? `justify-tracks: ${styles.justifyTracks};`	: ``}
		${styles.alignSelf		? `align-self: ${styles.alignSelf};`			: ``}
		${styles.alignItems		? `align-items: ${styles.alignItems};`			: ``}
		${styles.alignContent	? `align-content: ${styles.alignContent};`		: ``}
		${styles.alignTracks	? `align-tracks: ${styles.alignTracks};`		: ``}
		${styles.dplay			? `display: ${styles.dplay};`					: ``}
		${styles.fDir			? `flex-direction: ${styles.fDir};`				: ``}
		${styles.fWrap			? `flex-wrap: ${styles.fWrap};`					: ``}
		${styles.alignItems		? `align-items: ${styles.alignItems};`			: ``}
		${styles.valign			? `align-items: ${styles.valign};`				: ``}
		${styles.hAlign			? `justify-content: ${styles.hAlign};`			: ``}
		${styles.g				? `gap: ${styles.g};`							: ``}
		${styles.gx				? `column-gap: ${styles.gx};`					: ``}
		${styles.gy				? `row-gap: ${styles.gy};`						: ``}
		${styles.h				? `height: ${styles.h};`						: ``}
		${styles.w				? `width: ${styles.w};`							: ``}
		${styles.minW			? `min-width: ${styles.minW};`					: ``}
		${styles.maxW			? `max-width: ${styles.maxW};`					: ``}
		${styles.minH			? `min-height: ${styles.minH};`					: ``}
		${styles.maxH			? `max-height: ${styles.maxH};`					: ``}
		${styles.p				? `padding: ${styles.p};`						: ``}
		${styles.pl				? `padding-left: ${styles.pl};`					: ``}
		${styles.pr				? `padding-right: ${styles.pr};`				: ``}
		${styles.pt				? `padding-top: ${styles.pt};`					: ``}
		${styles.pb				? `padding-bottom: ${styles.pb};`				: ``}
		${styles.m				? `margin: ${styles.m};`						: ``}
		${styles.ml				? `margin-left: ${styles.ml};`					: ``}
		${styles.mr				? `margin-right: ${styles.mr};`					: ``}
		${styles.mt				? `margin-top: ${styles.mt};`					: ``}
		${styles.mb				? `margin-bottom: ${styles.mb};`				: ``}
		${styles.tAlign			? `text-align: ${styles.tAlign};`				: ``}
		${styles.fFamily		? `font-family: ${styles.fFamily};`				: ``}
		${styles.fSize			? `font-size: ${styles.fSize};`					: ``}
		${styles.fWeight		? `font-weight: ${styles.fWeight};`				: ``}
		${styles.txtTrans		? `text-transform: ${styles.txtTrans};`			: ``}
		${styles.lSpace			? `letter-spacing: ${styles.lSpace};`			: ``}
		${styles.color			? `color: ${styles.color};`						: ``}
		${styles.bg				? `background: ${styles.bg};`					: ``}
		${styles.overflow		? `overflow: ${styles.overflow};`				: ``}
		${styles.overflowX		? `overflow-x: ${styles.overflowX};`			: ``}
		${styles.overflowY		? `overflow-y: ${styles.overflowY};`			: ``}
		${styles.bd				? `border: ${styles.bd};`						: ``}
		${styles.bdt			? `border-top: ${styles.bdt};`					: ``}
		${styles.bdb			? `border-bottom: ${styles.bdb};`				: ``}
		${styles.bdl			? `border-left: ${styles.bdl};`					: ``}
		${styles.bdr			? `border-right: ${styles.bdr};`				: ``}
		${styles.bdradius		? `border-radius: ${styles.bdradius};`			: ``}
		${styles.clipPath		? `clip-path: ${styles.clipPath};`				: ``}
		${styles.transition		? `transition: ${styles.transition};`			: ``}
		${styles.cursor			? `cursor: ${styles.cursor};`					: ``}
		${styles.content		? `content: ${styles.content};`					: ``}
	`
}

export const setPseudoStyle = ({ after, before, hover, active, other, ...rest }: CSSElementStyleType) => {
	return `
		${setStyle(rest)}

		${after ? `&:after { ${setStyle(after)} }` : ``}
		${before ? `&:before { ${setStyle(before)} }` : ``}
		${other ? other : ``}
	`
}

export const BoxWrapper = styled.div<ElementDefaultProps>`
	${props => {
		const { mobileS, mobileM ,mobileL, tablet, laptop, laptopL, desktop, desktopL, ...rest } = props;

		return `
			${setPseudoStyle(rest)}

			${mobileM ? `
				@media ${device.mobileM} {
					${setPseudoStyle(mobileM)}
				}` : ``
			}

			${mobileM ? `
				@media ${device.mobileM} {
					${setPseudoStyle(mobileM)}
				}` : ``
			}

			${mobileL ? `
				@media ${device.mobileL} {
					${setPseudoStyle(mobileL)}
				}` : ``
			}

			${tablet ? `
				@media ${device.tablet} {
					${setPseudoStyle(tablet)}
				}` : ``
			}

			${laptop ? `
				@media ${device.laptop} {
					${setPseudoStyle(laptop)}
				}` : ``
			}

			${laptopL ? `
				@media ${device.laptopL} {
					${setPseudoStyle(laptopL)}
				}` : ``
			}

			${desktop ? `
				@media ${device.desktop} {
					${setPseudoStyle(desktop)}
				}` : ``
			}

			${desktopL ? `
				@media ${device.desktopL} {
					${setPseudoStyle(desktopL)}
				}` : ``
			}
		`
	}}
`
