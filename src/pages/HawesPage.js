import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { Gif } from '@giphy/react-components'
import { FirebaseDatabaseNode } from '@react-firebase/database'

import hawesLinks from 'data/hawesLinks.json'
import smartassLinks from 'data/smartassLinks.json'

import Button from 'components/core/Button'
import { Content } from 'components/core/Layout'
import { Subtitle, Title } from 'components/core/Type'
import { Links } from 'components/Links'

const gf = new GiphyFetch(process.env.REACT_APP_GIPHY_API_KEY)

const HawesPage = () => {
	const [gif, setGif] = useState()
	const [limit, setLimit] = useState(20)

	useEffect(() => {
		async function fetchData() {
			// const { data: gifs } = await gf.search('great job', { sort: 'relevant', lang: 'en', limit: 10, type: 'gifs' })
			// setGif(gifs[0])
			const { data } = await gf.random({ tag: 'good job', lang: 'en', type: 'gifs' })
			setGif(data)
		}
		fetchData()
	}, [])

	const renderGif = useMemo(() => {
		if (!gif) return null

		const finalGif = gif.images.fixed_height
		return (
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<Gif gif={gif} width={finalGif.width} noLink />
				{/* <video width={finalGif.width} height={finalGif.height} autoPlay loop muted playsInline>
					<source src={finalGif.mp4} type="video/mp4" />
					Your browser does not support the video tag.
				</video> */}
			</div>
		)
	}, [gif])

	const handleLoadMore = useCallback(() => {
		setLimit(prev => prev + 2)
	}, [])

	return (
		<>
			<Title>Welcome, Hawes!</Title>
			<Content>
				{/*  */}
				<Subtitle>Recent Feedback</Subtitle>
				<FirebaseDatabaseNode path="feedback/" limitToFirst={limit} orderByValue={'created_on'}>
					{data => {
						const {
							value,
							// isLoading
						} = data

						// if (isLoading) return <div>LOADING</div>

						if (value === null || typeof value === 'undefined') return null

						return (
							<React.Fragment>
								<ul>
									{Object.keys(value).map(key => {
										return <li key={key}>{value[key].comment}</li>
									})}
								</ul>
								<Button onClick={handleLoadMore} small>
									Load more
								</Button>
							</React.Fragment>
						)
					}}
				</FirebaseDatabaseNode>

				{/*  */}
				<Subtitle>Moral Support</Subtitle>
				{renderGif}

				{/*  */}
				<Subtitle>Feel Good Links</Subtitle>
				<Links links={hawesLinks} />

				{/*  */}
				<Subtitle>Smartass Links</Subtitle>
				<Links links={smartassLinks} />
			</Content>
		</>
	)
}

export default memo(HawesPage)
