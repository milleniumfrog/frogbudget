import React from 'react';
import { Entry, defaultEntry } from '../../types/entry';
import { Page, Toolbar, ToolbarButton, BackButton, Card, Input, BottomToolbar } from 'react-onsenui';
import { Redirect, match } from 'react-router';
import { getEntry } from '../providers/database/entries';
import { entryReducer } from '../providers/redux/reducers/entry';
import { getID } from '../providers/id';
import { addEntry } from '../providers/universal/entries_and_repeats';

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
					<Input style={{ width: "100%" }} type="date" placeholder='Datum:' value={this.normalizeDate(this.state.tmpEntry.date)}
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
				</ToolbarButton>
			</Toolbar>
		);
	}

	renderBottomToolbar() {
		return(
			<BottomToolbar>
				<ToolbarButton 
					style={{margin: 0, padding: 0, lineHeight: '44px', width: '100%', textAlign: 'center'}}
					onClick={this.handleSubmit}
				>
					Update
				</ToolbarButton>
			</BottomToolbar>
		)
	}

	async handleSubmit() {
		addEntry(this.state.tmpEntry);
		this.setState({pagestate: 'backToHome'});
	}

	/**
	 * normalize Date, move this function to other file in future versions TODO
	 */
	normalizeDate(dateInput: string | number | Date) {
		let tmpDate = new Date(dateInput);
		return `${tmpDate.getFullYear()}-${this.lengthStr(tmpDate.getMonth().toString(), 2)}-${this.lengthStr(tmpDate.getDate().toString(), 2)}`;
	}

	lengthStr(str: string, wishedLength: number) {
		while(str.length < wishedLength)
			str = "0" + str;
		return str;
	}

}