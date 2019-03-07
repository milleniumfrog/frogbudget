import React from 'react';
import { Entry } from '../../types/entry';
import { Redirect, withRouter } from 'react-router';
import { Page, Card, Input, Button, BackButton, Toolbar, Row, Col, Select, BottomToolbar, ToolbarButton, Switch } from 'react-onsenui';
import { platform } from 'onsenui';
import { getID } from '../providers/id';
import * as RepeatDB from '../providers/database/repeats';
import * as RepeatActions from '../providers/redux/actions/repeats';
import { store } from '../providers/redux/store';
import { logger } from '../providers/logger';
import { Repeat } from '../../types/repeats';
import { addEntry } from '../providers/universal/entries_and_repeats';
import { normalizeDate } from '../providers/strutil';

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
		this.renderBottomToolbar = this.renderBottomToolbar.bind(this);
		//#endregion
	}

	render() {

		if (this.state.pagestate === 'backToHome')
			return (<Redirect to="/" />);

		return (
			<Page renderToolbar={this.renderToolbar} renderBottomToolbar={this.renderBottomToolbar}>
				<Card>
					<Row>
						<Col style={{lineHeight: '24px'}}>Wiederholung</Col>
						<Switch onChange={() => this.setState({pagestate: this.state.pagestate !== 'entry' ? 'entry' : 'repeat'})}/>
					</Row>
		
				</Card>
				{this.state.pagestate === 'entry' && this.renderEntryInput()}
				{this.state.pagestate === 'repeat' && this.renderRepeatInput()}
			</Page>
		)
	}

	//#region Renderfunctions
	renderToolbar() {
		return (
			<Toolbar>
				<ToolbarButton onClick={() => this.setState({pagestate: 'backToHome'})}>
					<BackButton />
				</ToolbarButton>
				<h4 style={{margin: 0, lineHeight: '60px'}}>
					Erstelle {this.state.pagestate === 'entry' ? 'Eintrag' : 'Wiederholung'}
				</h4>
			</Toolbar>
		);
	}

	renderBottomToolbar() {
		return(
			<BottomToolbar style={{height: platform.isAndroid() ? '45px' : '60px'}}>
				<Row>
					<Col />
					<ToolbarButton className='center' id='input_submit'
						style={{margin: 0, padding: 0, lineHeight: '44px'}}
						onClick={this.handleSubmit}
					>
						Hinzufügen
					</ToolbarButton>
					<Col />	
				</Row>				
			</BottomToolbar>
		)
	}

	renderEntryInput() {
		return (
			<React.Fragment>
				<Card>
					<Input style={{ width: "100%" }} placeholder='Kategorie:' inputId='input_category_entry'
						onChange={(ev: any) => this.input_entry.category = ev.target.value}
					/>
				</Card>
				<Card>
					<label htmlFor='input_date'>Datum:</label>
					<Input style={{ width: "100%" }} type="date" inputId='input_date' defaultValue={normalizeDate(new Date())}
						onChange={ev => this.input_entry.date = new Date(ev.target.value).toISOString()}
					/>
				</Card>
				<Card>
					<Input style={{ width: "100%" }} type="number" placeholder='Wert:' inputId='input_value_entry'
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
					<Input style={{width: '100%'}} placeholder='Kategorie:' inputId='input_category_repeat'
						onChange={(ev: any) => this.input_entry.category = ev.target.value} 
						/>
				</Card>
				<Card>
					<Input style={{width: '100%'}} type='number' placeholder='Wert:' inputId='input_value_repeat'
						onChange={(ev: any) => this.input_entry.value = Number(ev.target.value)}
						/>
				</Card>
				<Card>
					<label htmlFor='input_begin'>Von:</label>
					<Input style={{width: '100%'}} type='date' inputId='input_begin' defaultValue={normalizeDate(new Date())}
						onChange={(ev: any) => this.input_repeat.begin = new Date(ev.target.value).toISOString()} 
						/>
				</Card>
				<Card>
					<label htmlFor='input_end'>Bis:</label>
					<Input style={{width: '100%'}} type='date' inputId='input_end' defaultValue={normalizeDate(new Date())}
						onChange={(ev: any) => this.input_repeat.end = new Date(ev.target.value).toISOString()} 
						/>
				</Card>
				<Card>
					<Row>
						<Col>
							<Button modifier={this.state.repeattype === 'weekly' ? 'cta' : 'light'} style={{width: '100%'}}  onClick={() => this.setState({repeattype: 'weekly'})}>
								Wöchentlich
							</Button>
						</Col>
						<Col>
							<Button modifier={this.state.repeattype !== 'weekly' ? 'cta' : 'light'} style={{width: '100%'}} onClick={() => this.setState({repeattype: 'monthly'})}>
								Monatlich
							</Button>
						</Col>
					</Row>
				</Card>
				{this.state.repeattype === 'weekly' &&
					<Card>
						<Select id="weeklyrepeats"
						style={{width: '100%'}}
						select-id='weekly-input'
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
						<option value='11'>11</option>
						<option value='12'>12</option>
						<option value='13'>13</option>
						<option value='14'>14</option>
						<option value='15'>15</option>
						<option value='16'>16</option>
						<option value='17'>17</option>
						<option value='18'>18</option>
						<option value='19'>19</option>
						<option value='20'>20</option>
						<option value='21'>21</option>
						<option value='22'>22</option>
						<option value='23'>23</option>
						<option value='24'>24</option>
						<option value='25'>25</option>
						<option value='26'>26</option>
						<option value='27'>27</option>
						<option value='28'>28</option>

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