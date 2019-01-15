import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { AddPage } from './pages/addpage';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import { ConnectedHomepage } from './pages/homepage';
import { Provider } from 'react-redux';
import { store } from './providers/redux/store';

export function App() {
	return (
		<Provider store={store}>
			<HashRouter>
				<React.Fragment>
					<Route exact path="/" component={ConnectedHomepage} />
					<Route exact path="/add" component={AddPage} />
				</React.Fragment>
			</HashRouter>
		</Provider>
	)
}