import React from 'react';
import { connect } from "react-redux";
import { mapStateToProps } from "../providers/redux/connectors/entries";
import { Page, Card, List, ListItem, Row, Col, Fab, Icon, Button } from 'react-onsenui';
import { Entry } from '../../types/entry';
import { withRouter } from 'react-router';
import { removeEntry } from '../providers/database/entries';
import { removeActionCreator } from '../providers/redux/actions/entries';
import { store } from '../providers/redux/store';

interface Props {
	entries: Entry[]
}
interface State {
	total: number
}

class HomePage extends React.Component<Props, State>{

	static Fab = withRouter(({ history }) => {
		return (
			<Fab style={{ position: "fixed", bottom: "10px", right: "10px" }} onClick={() => history.push("/add")}>
				<Icon icon={{ default: 'fa-plus' }} size={{ default: 32 }} />
			</Fab>)
	})

	constructor(props: Props) {
		super(props);
		this.state = {
			total: 0,
		}
	}

	render() {
		let arr: string[] = [];
		return (
			<Page>
				<Card>
					{calcTotal(this.props.entries).toFixed(2)} €
				</Card>

				<List 
					dataSource={this.props.entries}
					renderRow={(row: Entry) => {
						if(arr.indexOf(new Date(row.date).toDateString()) < 0) {
							
						}
						return (
							<ListItem key={row.id}>
								{
									arr.indexOf(new Date(row.date).toDateString()) < 0 &&
									(() => {
										arr.push(new Date(row.date).toDateString())
										console.log(arr);
										return true;
									})() && 
									<Row><Col style={{backgroundColor: 'blue', color: 'white'}}>{new Date(row.date).toDateString()}</Col></Row>
								}
								<Row>
									<Col>
										{row.category}
									</Col>
									<Col width="100px">
										{row.value}€
									</Col>
									<Col width="40px">
									<Button onClick={() => { removeEntry(row); store.dispatch(removeActionCreator(row))}}>
										<Icon icon="md-delete" />
									</Button>
								</Col>
								</Row>
							</ListItem>
						)
					}}
				/>
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