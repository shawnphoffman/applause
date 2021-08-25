import React, { memo, useCallback, useRef } from 'react'
import ReactAudioPlayer from 'react-audio-player'
import { styled } from '@linaria/react'
import { FirebaseDatabaseMutation, FirebaseDatabaseNode } from '@react-firebase/database'

import Button from './core/Button'

const file = 'https://d1ba7e9b4ql0yd.cloudfront.net/misc/airhorn.mp3'

const Label = styled.div`
	text-align: center;
`

const Soundboard = () => {
	const ref = useRef()

	const handleClick = useCallback((prevCount, runMutation) => {
		const audioEl = ref.current.audioEl.current
		if (!audioEl.paused) {
			audioEl.load()
		}
		audioEl.play()

		runMutation({
			airhorn: prevCount + 1,
		})
	}, [])

	return (
		<FirebaseDatabaseMutation type="update" path="sounds">
			{({ runMutation }) => (
				<FirebaseDatabaseNode path="sounds/">
					{data => {
						const clickCount = data?.value?.airhorn ?? 0
						return (
							<>
								<Button onClick={() => handleClick(clickCount, runMutation)}>Click Me!</Button>
								<ReactAudioPlayer src={file} ref={ref} />
								<Label>This button has been clicked {clickCount} times</Label>
							</>
						)
					}}
				</FirebaseDatabaseNode>
			)}
		</FirebaseDatabaseMutation>
	)
}

export default memo(Soundboard)
