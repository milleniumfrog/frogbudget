import React from 'react';
import { Entry, defaultEntry } from '../../types/entry';
import { Page, Toolbar, ToolbarButton, BackButton, Card, Input, BottomToolbar, Row, Col } from 'react-onsenui';
import { Redirect, match } from 'react-router';
import { getEntry } from '../providers/database/entries';
import { entryReducer } from '../providers/redux/reducers/entry';
import { getID } from '../providers/id';
import { addEntry } from '../providers/universal/entries_and_repeats';
import { normalizeDate } from '../providers/strutil';
import { platform } from 'onsenui';

interface State {

	pagestate: "backToHome" | "none";
	tmpEntry: Entry;

}

interface Props{
	match: match<{entry_id: string}>
}

export class Editpage extends React.Component<Props, State> {
	
	tmpEntry: Entry;

	constructor(props: Props) {
		super(props);
		this.state = {
			pagestate: "none",
			tmpEntry: Object.assign({}, defaultEntry),
		}
		this.tmpEntry = Object.assign({}, defaultEntry, {id: getID()});

		// load entry from db
		getEntry(this.props.match.params.entry_id)
			.then((entry: Entry) => {
				if(entry)
					this.setState({tmpEntry: entry});
			})

		this.renderToolbar = this.renderToolbar.bind(this);
		this.renderBottomToolbar = this.renderBottomToolbar.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	render() {

		if(this.state.pagestate === "backToHome")
			return(<Redirect to="/" />);

		return(
			<Page renderToolbar={this.renderToolbar} renderBottomToolbar={this.renderBottomToolbar}>
				<Card>
					<Input style={{ width: "100%" }} placeholder='Kategorie:' value={this.state.tmpEntry.category}
						onChange={(ev: any) => this.setState({tmpEntry: Object.assign(this.state.tmpEntry, {category: ev.target.value})})}
					/>
				</Card>
				<Card>
					<label htmlFor='input_date_change'>Datum:</label>
					<Input style={{ width: "100%" }} inputId='input_date_change' type="date" placeholder='Datum:' value={normalizeDate(this.state.tmpEntry.date)}
					onChange={(ev) => {this.setState({tmpEntry: Object.assign(this.state.tmpEntry, {date: new Date(ev.target.value).toISOString()})})}}
					/>
				</Card>
				<Card>
					<Input style={{ width: "100%" }} type="number" placeholder='Wert:' value={this.state.tmpEntry.value !== 0 ? String(this.state.tmpEntry.value) : undefined}
						onChange={ev =>this.setState({tmpEntry: Object.assign(this.state.tmpEntry, {value: Number(ev.target.value)})})}
					/>
				</Card>
			</Page>
		);
	}

	renderToolbar() {
		return(
			<Toolbar>
				<ToolbarButton>
					<BackButton onClick={() => {this.setState({pagestate: "backToHome"})}} />
					Ändere Eintrag
				</ToolbarButton>
			</Toolbar>
		);
	}

	renderBottomToolbar() {
		return(
			<BottomToolbar style={{height: platform.isAndroid() ? '45px' : '60px'}}>
				<Row>
					<Col />
					<ToolbarButton className='center'
						style={{margin: 0, padding: 0, lineHeight: '44px'}}
						onClick={this.handleSubmit}
					>
						Update
					</ToolbarButton>
					<Col />	
				</Row>				
			</BottomToolbar>
		)
	}


	async handleSubmit() {
		addEntry(this.state.tmpEntry);
		this.setState({pagestate: 'backToHome'});
	}

}