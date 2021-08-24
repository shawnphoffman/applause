import { styled } from '@linaria/react'

export const Title = styled.h1`
	font-size: 96px;
	letter-spacing: 4px;
	text-align: center;
	margin: 64px 8px;

	@media (max-width: 420px) {
		font-size: 72px;
	}
`

export const Subtitle = styled.h2`
	font-size: 36px;
	border-bottom: 1px solid #bcbcbc;

	@media (max-width: 420px) {
		font-size: 28px;
	}
`

export const H3 = styled.h3`
	font-size: 24px;
	color: #333;

	@media (max-width: 420px) {
		font-size: 18px;
	}
`
