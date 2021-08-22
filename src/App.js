import React, { memo } from 'react'
// import { styled } from '@linaria/react'
import * as Sentry from '@sentry/react'

import Error from 'components/Errors/AppError'

function App() {
	return (
		<Sentry.ErrorBoundary fallback={<Error />} showDialog={process.env.NODE_ENV === 'production'}>
			<React.Profiler id="App"></React.Profiler>
		</Sentry.ErrorBoundary>
	)
}

export default memo(App)
