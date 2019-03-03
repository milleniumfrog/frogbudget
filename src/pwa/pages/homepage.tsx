import React from 'react';
import { connect } from "react-redux";
import { mapStateToProps } from "../providers/redux/connector";
import { Page, List, ListItem, Row, Col, Fab, Icon, Button, Splitter, SplitterSide, SplitterContent, Toolbar, ToolbarButton, BottomToolbar } from 'react-onsenui';
import { Entry } from '../../types/entry';
import { Redirect } from 'react-router';
import { removeEntry } from '../providers/universal/entries_and_repeats';
import { logger } from '../providers/logger';
import { generateEntriesFromRepeats } from '../providers/universal/entries_and_repeats';
import { platform } from 'onsenui';

declare const VERSION: string;
interface Props {
	entries: Entry[]
}
interface State {
	total: number,
	slice: number;
	openMenu: boolean;
	redirect?: string;
	active?: Entry;
}

let counter = 0;

class HomePage extends React.Component<Props, State>{

	constructor(props: Props) {
		logger.construct("homepage");
		super(props);
		this.state = {
			total: 0,
			slice: 0,
			openMenu: false,
		}
		generateEntriesFromRepeats();
		this.MenuLeft = this.MenuLeft.bind(this);
		this.renderToolbar = this.renderToolbar.bind(this);
		this.renderBottomToolbar = this.renderBottomToolbar.bind(this);
	}

	render() {
		if(this.state.redirect)
			return(<Redirect to={this.state.redirect} />);

		logger.info("RENDER homepage");
		let arr: string[] = [];
		return (
			<Splitter>
				<SplitterSide
					side="left"
					collapse={true}
					width={200}
					isOpen={this.state.openMenu}
					onClose={() => {this.setState({openMenu: false})}}
					swipeable={true}>
					<Page>
						<this.MenuLeft />
					</Page>
				</SplitterSide>
				<SplitterContent>
					<Page renderToolbar={this.renderToolbar} renderBottomToolbar={this.renderBottomToolbar}>

						<List
							dataSource={this.props.entries.slice(this.state.slice * 20, 20 * (1 + this.state.slice))}
							renderRow={(row: Entry) => {
								return (
									<React.Fragment key={row.id || `tmp_${++counter}`}>
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
												{!(this.state.active && this.state.active.id === row.id) &&
													<Col width="100px">
														{row.value}€
													</Col>
												}
												<Col width="50px">
													<Button onClick={() => this.setState({active: (this.state.active && this.state.active.id === row.id) ? undefined : row})} modifier="light">
														<Icon icon={(this.state.active && this.state.active.id === row.id) ? "ion-close-round" : "ion-chevron-left"} size={{default: 22}}/>
													</Button>
												</Col>
												{this.state.active && this.state.active.id === row.id && 
													<Col width="50px">
														<Button modifier="light" onClick={() => {this.setState({redirect: '/edit/' + row.id})}}>
															<Icon icon="ion-wrench" size={{default: 22}} />
														</Button>
													</Col>
												}
												{this.state.active && this.state.active.id === row.id && 
													<Col width="50px">
														<Button modifier="light" onClick={() => {removeEntry(row)}}>
															<Icon icon="ion-trash-b" size={{default: 22}} />
														</Button>
													</Col>
												}
											</Row>
										</ListItem>
									</React.Fragment>
								)
							}}
						/>
						<Fab style={{ position: "fixed", bottom: platform.isAndroid() ? "50px" : "70px", right: "10px" }} onClick={() => this.setState({redirect: '/add'})}>
							<Icon icon={{ default: 'fa-plus' }} size={{ default: 32 }} />
						</Fab>
					</Page>
				</SplitterContent>
			</Splitter>
		)
	}

	MenuLeft() {
		return(
			<List dataSource={menu}
				renderRow={(val: [string, string | undefined]) => {
					return(
						<ListItem key={"tmp_" + (++counter)}
							onClick={() => {
								if(val[1])
									this.setState({redirect: val[1]})
							}}
						>
							{val[0]}
						</ListItem>
					);
				}}
			/>
		);
	}

	renderToolbar() {
		return(
			<Toolbar>
				<ToolbarButton onClick={() => this.setState({openMenu: true})} className='left'>
					<Icon icon={{default: 'ion-navicon'}} size={{default: 40, material: 50}}/>
				</ToolbarButton>
				<h3 className='right' style={{paddingRight: '20px',margin: 0, lineHeight: '60px', textAlign: 'center', width: '100%',}}>
					{calcTotal(this.props.entries).toFixed(2)} €
				</h3>
			</Toolbar>
		);
	}

	renderBottomToolbar() {
		return (
			<BottomToolbar style={{height: platform.isAndroid() ? '45px' : '60px'}}>
				<Row>
					<ToolbarButton onClick={() => this.setState({slice: this.state.slice === 0 ? this.state.slice : this.state.slice-1})}>
						<Icon icon={{ default: "ion-chevron-left" }} size={{default: 30}} style={{paddingTop: '5px'}} />
					</ToolbarButton>
					<Col style={{textAlign: "center", lineHeight: '44px'}}>
						{this.state.slice*20+1}-{(1+this.state.slice)*20} von {this.props.entries.length}
					</Col>
					<ToolbarButton onClick={() => this.setState({slice: (this.state.slice+1)*20 < this.props.entries.length ? this.state.slice+1 : this.state.slice})}>
						<Icon icon={{ default: "ion-chevron-right" }} size={{default: 30}} style={{paddingTop: '5px'}} />
					</ToolbarButton>
				</Row>
			</BottomToolbar>
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

const menu: [string, string | undefined][] = [
	['version: ' + VERSION, undefined]
];


export const ConnectedHomepage = connect(mapStateToProps, null)(HomePage);