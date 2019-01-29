import React from 'react';
import { Entry } from '../../types/entry';
import { Redirect, withRouter } from 'react-router';
import { Page, Card, Input, Button, BackButton, Toolbar } from 'react-onsenui';
import { getID } from '../providers/id';
import * as EntryDB from '../providers/database/entries';
import * as EntryActions from '../providers/redux/actions/entries';
import { store } from '../providers/redux/store';
import { logger } from '../providers/logger';

export class AddPage extends React.Component<{}, {returnToHome: boolean}> {

	input_entry: Entry;

	constructor(props: any) {
		logger.construct("addpage");
		super(props);
		this.input_entry = {
			date: new Date().toISOString(),
			id: "",
			note: "",
			value: 0,
			category: "default",
		}

		this.state = {
			returnToHome: false
		}

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	render() {

		if(this.state.returnToHome)
			return( <Redirect to="/" />);

		return(
			<Page renderToolbar={this.renderToolbar}>
				<Card>
					<Input style={{width: "100%"}} placeholder='Kategorie:'
						onChange={(ev: any) => this.input_entry.category = ev.target.value}
					/>
				</Card>
				<Card>
					<Input style={{width: "100%"}} type="date" placeholder='Datum:'
						onChange={ev => this.input_entry.date = new Date(ev.target.value).toISOString()}
					/>
				</Card>
				<Card>
					<Input style={{width: "100%"}} type="number" placeholder='Wert:'
						onChange={ev => this.input_entry.value = Number(ev.target.value)}
					/>
				</Card>
				<Card>
					<Button onClick={this.handleSubmit}>
						Hinzufügen
					</Button>
				</Card>
			</Page>
		)
	}

	// renderfn
	renderToolbar() {
		let BackBtn = withRouter(({history}) => {return <BackButton onClick={() => history.push("/")}/>})
		return (
			<Toolbar>
				<div className='left'>
					<BackBtn />
				</div>
				<div className='center'>
					Eintrag hinzufügen
				</div>
			</Toolbar>
		);
	}

	async handleSubmit() {
		const entry = Object.assign({}, this.input_entry, {id: getID()});
		await EntryDB.addEntry(entry);
		store.dispatch(EntryActions.addActionCreator(entry));
		this.setState({returnToHome: true});
	}
}