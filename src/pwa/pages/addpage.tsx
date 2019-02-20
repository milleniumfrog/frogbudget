import React from 'react';
import { Entry } from '../../types/entry';
import { Redirect, withRouter } from 'react-router';
import { Page, Card, Input, Button, BackButton, Toolbar, Row, Col, Select } from 'react-onsenui';
import { getID } from '../providers/id';
import * as EntryDB from '../providers/database/entries';
import * as EntryActions from '../providers/redux/actions/entries';
import * as RepeatDB from '../providers/database/repeats';
import * as RepeatActions from '../providers/redux/actions/repeats';
import { store } from '../providers/redux/store';
import { logger } from '../providers/logger';
import { Repeat } from '../../types/repeats';
import { BackgroundAttachmentProperty } from 'csstype';
import { addEntry } from '../providers/universal/entries_and_repeats';

interface State {
	pagestate: string;
	repeattype: 'weekly' | 'monthly';
}
export class AddPage extends React.Component<{}, State> {

	input_entry: Entry;
	input_repeat: Repeat;

	constructor(props: any) {
		logger.construct("addpage");
		super(props);
		this.input_entry = {
			date: new Date().toISOString(),
			id: "",
			note: "",
			value: 0,
			category: "default",
		},

		this.input_repeat = {
			begin: new Date().toISOString(),
			end: new Date().toISOString(),
			id: "",
			template: this.input_entry,
			repeats: [],
			repeattype: 'weekly',
		}

		this.state = {
			pagestate: 'entry',
			repeattype: 'weekly',
		}
		//#region bind all functions
		this.handleSubmit = this.handleSubmit.bind(this);
		this.renderToolbar = this.renderToolbar.bind(this);
		this.renderRepeatInput = this.renderRepeatInput.bind(this);
		//#endregion
	}

	render() {

		if (this.state.pagestate === 'backToHome')
			return (<Redirect to="/" />);

		return (
			<Page renderToolbar={this.renderToolbar}>
				{this.state.pagestate === 'entry' && this.renderEntryInput()}
				{this.state.pagestate === 'repeat' && this.renderRepeatInput()}
				<Card>
					<Button onClick={this.handleSubmit}>
						Hinzufügen
					</Button>
				</Card>
			</Page>
		)
	}

	//#region Renderfunctions
	renderToolbar() {
		let BackBtn = withRouter(({ history }) => { return <BackButton onClick={() => history.push("/")} /> })
		return (
			<Toolbar>
				<div className='left'>
					<BackBtn />
				</div>
				<Row className='center'>
					<Col verticalAlign='center'>
						<Button modifier="large--flat" className='center' onClick={() => this.setState({pagestate: 'entry'})}>
							Eintrag
						</Button>
					</Col>
					<Col verticalAlign='center'>
						<Button modifier="large--flat" className='center' onClick={() => this.setState({pagestate: 'repeat'})}>
							Wiederholungen
						</Button>
					</Col>
				</Row>
			</Toolbar>
		);
	}

	renderEntryInput() {
		return (
			<React.Fragment>
				<Card>
					<Input style={{ width: "100%" }} placeholder='Kategorie:'
						onChange={(ev: any) => this.input_entry.category = ev.target.value}
					/>
				</Card>
				<Card>
					<Input style={{ width: "100%" }} type="date" placeholder='Datum:'
						onChange={ev => this.input_entry.date = new Date(ev.target.value).toISOString()}
					/>
				</Card>
				<Card>
					<Input style={{ width: "100%" }} type="number" placeholder='Wert:'
						onChange={ev => this.input_entry.value = Number(ev.target.value)}
					/>
				</Card>
			</React.Fragment>
		);
	}

	renderRepeatInput() {
		return(
			<React.Fragment>
				<Card>
					<Input style={{width: '100%'}} placeholder='Kategorie:'
						onChange={(ev: any) => this.input_entry.category = ev.target.value} 
						/>
				</Card>
				<Card>
					<Input style={{width: '100%'}} type='number' placeholder='Wert:'
						onChange={(ev: any) => this.input_entry.value = Number(ev.target.value)}
						/>
				</Card>
				<Card>
					<Input style={{width: '100%'}} type='date' placeholder='Begin:'
						onChange={(ev: any) => this.input_repeat.begin = new Date(ev.target.value).toISOString()} 
						/>
				</Card>
				<Card>
					<Input style={{width: '100%'}} type='date' placeholder='Ende:'
						onChange={(ev: any) => this.input_repeat.end = new Date(ev.target.value).toISOString()} 
						/>
				</Card>
				<Card>
					<Button modifier='large--flat' onClick={() => this.setState({repeattype: 'weekly'})}>
						Wöchentlich
					</Button>
					<Button onClick={() => this.setState({repeattype: 'monthly'})}>
						Monatlich
					</Button>
				</Card>
				{this.state.repeattype === 'weekly' &&
					<Card>
						<Select id="weeklyrepeats" 
						style={{width: '100%'}}
						multiple
						onChange={(ev: any) => {
							let monthRepEl= document.querySelectorAll<any>('#weeklyrepeats option:checked');
							this.input_repeat.repeats = Array.from(monthRepEl).map(r => {return Number(r.value)})
						}
						}>
							<option value='1'>Montag</option>
							<option value='2'>Dienstag</option>
							<option value='3'>Mittwoch</option>
							<option value='4'>Donnerstag</option>
							<option value='5'>Freitag</option>
							<option value='6'>Samstag</option>
							<option value='0'>Sonntag</option>
						</Select>
					</Card>
				}
				{this.state.repeattype === 'monthly' && 
				<Card>
					<Select id="monthlyrepeats" 
						style={{width: '100%'}}
						multiple
						onChange={(ev: any) => {
							let monthRepEl= document.querySelectorAll<any>('#monthlyrepeats option:checked');
							this.input_repeat.repeats = Array.from(monthRepEl).map(r => {return Number(r.value)})
						}}
						>
						<option value='1'>1</option>
						<option value='2'>2</option>
						<option value='3'>3</option>
						<option value='4'>4</option>
						<option value='5'>5</option>
						<option value='6'>6</option>
						<option value='7'>7</option>
						<option value='8'>8</option>
						<option value='9'>9</option>
						<option value='10'>10</option>

					</Select>
				</Card>
			}
			</React.Fragment>
		);
	}
	//#endregion

	async handleSubmit() {
		if(this.state.pagestate === 'entry') {
			const entry = Object.assign({}, this.input_entry, { id: getID() });
			await addEntry(entry);
		}
		else {
			const repeat = Object.assign({}, this.input_repeat, { id: getID(), repeattype: this.state.repeattype });
			await RepeatDB.addRepeat(repeat);
			store.dispatch(RepeatActions.addActionCreator(repeat));
		}
		this.setState({ pagestate: 'backToHome' });
	}
}