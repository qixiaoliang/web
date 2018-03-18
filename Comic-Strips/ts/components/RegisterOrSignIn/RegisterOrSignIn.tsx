import React from 'react';
import ReactDOM from 'react-dom';
import Register from './Register';
import SignIn from './SignIn';

import * as WithStyle from 'material-ui/styles';
import { withStyles } from 'material-ui';
import { Modal } from 'material-ui';
import { Tabs, Tab } from 'material-ui';
import { Typography } from 'material-ui';

import PersonAdd from "material-ui-icons/PersonAdd";
import Person from 'material-ui-icons/Person';

const styles: WithStyle.StyleRulesCallback<ClassKey> = theme => {
	return {
		modal: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center'
		},
		modalRoot: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			[ theme.breakpoints.up( 'sm' ) ]: {
				minWidth: '32%',
				marginTop: '-3%'
			},
			[ theme.breakpoints.down( 'sm' ) ]: {
				width: '82%',
				marginTop: '-8%',
			},
			background: theme.palette.background.default,
			padding: 18
		},
		content: {
			flex: 1,
			marginTop: 6
		},
		tabLabel: {
			display: 'inline-flex',
			alignItems: 'center',
			letterSpacing: 4
		},
		tabLabelIcon: {
			marginRight: 16,
			verticalAlign: 'bottom',
			Transform: 'scale(1.8)'
		}
	}
}

export type ClassKey = 'modal' | 'modalRoot' | 'tabLabel' | 'tabLabelIcon' | 'content';
export interface Props {
	close?: ( node: React.Component ) => void;
}
export type StyleProps = Props & WithStyle.WithStyles<ClassKey>

class RegisterOrSignIn extends React.Component<StyleProps, {}> {
	state = {
		selectedTab: 0,
		open: true
	}

	onCompleted = () => {
		if ( this.props.close )
			this.props.close( this );
	}

	getTabContent() {
		switch ( this.state.selectedTab ) {
			case 0: return (
				<Register
					completed={ this.onCompleted.bind( this ) } />
			)
			case 1: return (
				<SignIn
					completed={ this.onCompleted.bind( this ) } />
			)
			default: return <></>;
		}
	}

	tabsChange = ( e: React.ChangeEvent<{}>, index: number ) => {
		this.setState( {
			selectedTab: index
		} )
	}

	constructor ( props: StyleProps ) {
		super( props );
	}

	render() {
		const { classes } = this.props;
		const { selectedTab } = this.state;

		return ReactDOM.createPortal(
			(
				<Modal
					onBackdropClick={
						() => {
							if ( this.props.close )
								this.props.close( this )
						}
					}
					className={ classes.modal }
					open={ this.state.open } >
					<div
						className={ classes.modalRoot }>
						<Tabs
							centered
							value={ selectedTab }
							onChange={ this.tabsChange }>
							<Tab
								key="0"
								label={
									<Typography
										className={ classes.tabLabel }
										type="title">
										<span>
											<PersonAdd className={ classes.tabLabelIcon } />
											<span>注册</span>
										</span>
									</Typography>
								} />
							<Tab
								key="1"
								label={
									<Typography
										className={ classes.tabLabel }
										type="title">
										<span>
											<Person className={ classes.tabLabelIcon } />
											<span>登录</span>
										</span>
									</Typography>
								} />
						</Tabs>

						<div className={ classes.content }>
							{ this.getTabContent() }
						</div>
					</div>
				</Modal>
			), document.getElementById( 'modal' ) )
	}
}

let _RegisterOrSignIn = withStyles<ClassKey>( styles )<Props>( RegisterOrSignIn );
export default _RegisterOrSignIn;

export function ShowSignIn( close?: () => void ) {
	ReactDOM.render(
		<_RegisterOrSignIn close={ ( node: React.Component ) => {
			ReactDOM.unmountComponentAtNode(
				document.getElementById( 'modal' )
			);
			if ( close ) close();
		} } />,
		document.getElementById( 'modal' )
	)
}



