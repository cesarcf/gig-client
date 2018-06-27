import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './components/App'


const render = (Component) => {
	ReactDOM.render(
		<Provider store={store}>
			<AppContainer>
				<BrowserRouter>
					<Component />
				</BrowserRouter>
			</AppContainer>
		</Provider>
		,
		document.getElementById('root')
	);
}

render(App);

// HMR (Hot Module Replacement)
if (module.hot) {
	//console.log('hot reloading active');
	module.hot.accept('./components/App', () => {
		//console.log('...doing hot reload...');
		const NextApp = require('./components/App').default;
		//Volvemos a hacer render:
		render(NextApp);
	});
}