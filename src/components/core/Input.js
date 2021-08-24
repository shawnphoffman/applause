import { styled } from '@linaria/react'

export const InputGroup = styled.div`
	margin: 16px 0px;
`

export const Label = styled.label`
	box-sizing: border-box;
	margin: 0px;
	min-width: 0px;
	width: 100%;
	font-size: 16px;
	font-weight: 700;
	display: flex;
`

export const Input = styled.input`
	margin: 0px;
	min-width: 0px;
	display: block;
	width: 100%;
	padding: 8px;
	appearance: none;
	font-size: inherit;
	line-height: inherit;
	border-width: 1px;
	border-style: solid;
	border-image: initial;
	border-radius: 4px;
	color: inherit;
	background-color: #0000;

	&:focus {
		border-color: #349c09;
		outline: none;
		box-shadow: 0 0 0 2px #349c09;
	}
`
