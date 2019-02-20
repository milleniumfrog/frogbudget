import React from 'react';
import { connect } from "react-redux";
import { mapStateToProps } from "../providers/redux/connector";
import { Page, Card, List, ListItem, Row, Col, Fab, Icon, Button, Splitter, SplitterSide, SplitterContent } from 'react-onsenui';
import { Entry } from '../../types/entry';
import { withRouter } from 'react-router';
import { removeEntry } from '../providers/database/entries';
import { removeActionCreator } from '../providers/redux/actions/entries';
import { store } from '../providers/redux/store';
import { logger } from '../providers/logger';
import { generateEntriesFromRepeats } from '../providers/universal/entries_and_repeats';

interface Props {
	entries: Entry[]
}
interface State {
	total: number,
	slice: number;
}

let counter = 0;

class HomePage extends React.Component<Props, State>{

	static Fab = withRouter(({ history }) => {
		return (
			<Fab style={{ position: "fixed", bottom: "10px", right: "10px" }} onClick={() => history.push("/add")}>
				<Icon icon={{ default: 'fa-plus' }} size={{ default: 32 }} />
			</Fab>)
	})

	constructor(props: Props) {
		logger.construct("homepage");
		super(props);
		this.state = {
			total: 0,
			slice: 0,
		}
		generateEntriesFromRepeats();
	}

	render() {
		logger.info("RENDER homepage");
		let arr: string[] = [];
		return (
			<Page>
				<Card>
					{calcTotal(this.props.entries).toFixed(2)} €
				</Card>

				<List 
					dataSource={this.props.entries.slice(this.state.slice*20, 20*(1+this.state.slice))}
					renderRow={(row: Entry) => {
						if (arr.indexOf(new Date(row.date).toDateString()) < 0) {

						}
						return (
							<React.Fragment key={row.id || `tmp_${++counter}`}>
								{
									arr.indexOf(new Date(row.date).toDateString()) < 0 &&
									(() => {
										arr.push(new Date(row.date).toDateString())
										return true;
									})() &&
									<ListItem className="homepage_date" modifier="nodivider">
										<Row><Col>{new Date(row.date).toDateString()}</Col></Row>
									</ListItem>
								}
								<ListItem modifier="longdivider">
									<Row>
										<Col>
											{row.category}
										</Col>
										<Col width="100px">
											{row.value}€
									</Col>
										<Col width="40px">
											<Button onClick={() => { removeEntry(row); store.dispatch(removeActionCreator(row)) }}>
												<Icon icon="md-delete" />
											</Button>
										</Col>
									</Row>
								</ListItem>
							</React.Fragment>
						)
					}}
				/>
				<Card>
					<Button onClick={() => {this.setState({slice: this.state.slice-1})}}>
						Vorherigen 20
					</Button>
					<Button onClick={() => {this.setState({slice: this.state.slice+1})}}>
						Nächsten 20
					</Button>
				</Card>
				<HomePage.Fab />
			</Page>
		)
	}
}

function calcTotal(entry_arr: Entry[]) {
	let total: number = 0;
	for (const entry of entry_arr) {
		total += entry.value;
	}
	return total;
}

export const ConnectedHomepage = connect(mapStateToProps, null)(HomePage);