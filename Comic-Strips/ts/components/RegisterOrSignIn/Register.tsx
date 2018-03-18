import React from 'react';
import InputInfo from './InputInfo';
import { Props as BaseStepProps } from './BaseStep';
import EmailValid from './EmailValid';

import {Button} from 'material-ui';
import {Typography} from 'material-ui';
import  {Stepper, Step, StepLabel } from 'material-ui';
import { withStyles } from 'material-ui';
import * as WithStyle from 'material-ui/styles';

import UpLoadIcon from "./UpLoadIcon";;

export type ClassKey = 'bottom' | 'bottomButton' | 'content';

export type Props = {
	completed: () => void;
}

export type States = {
	activeStep: number;
	completed: boolean;
	steps: {
		valid: boolean,
		completed: boolean,
		value: {
			[ key: string ]: any
		},
		next: boolean
	}[]
}

export type StyleProps = Props & WithStyle.WithStyles<ClassKey>

export type Steps = {
	label: string;
	optional: boolean;
	content: React.ComponentType<BaseStepProps>
}[]

const styles: WithStyle.StyleRulesCallback<ClassKey> = theme => {
	return {
		bottom: {
			display: 'flex',
			justifyContent: 'space-between',
			[ theme.breakpoints.up( 'sm' ) ]: {
				margin: '12px 18px 8px 18px'
			}
		},
		bottomButton: {
		},
		content: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
		}
	}
}

class Register extends React.Component<StyleProps, States> {

	constructor ( props: StyleProps ) {
		super( props );
	}

	onStepValid = ( index: number ) => {
		let { activeStep, steps } = this.state;
		steps[ activeStep ].valid = true;
		this.setState( {
			steps: steps.slice( 0 )
		} )
	}

	onStepInvalid = ( index: number ) => {
		let { activeStep, steps } = this.state;
		steps[ activeStep ].valid = false;
		this.setState( {
			steps: steps.slice( 0 )
		} )
	}

	onStepCompleted = ( index: number, result: object ) => {
		let { steps, activeStep } = this.state;
		steps[ activeStep ].completed = true;

		if ( steps.length - 1 <= activeStep ) {
			this.setState( {
				steps: steps.slice( 0 ),
				completed: true
			} )
		}
		else {
			steps[ activeStep + 1 ].value = result;

			this.setState( {
				activeStep: activeStep + 1,
				steps: steps.slice( 0 )
			} )
		}
	}

	steps: Steps = [
		{
			label: '注册',
			optional: false,
			content: InputInfo
		},
		{
			label: '验证',
			optional: false,
			content: EmailValid
		},
		{
			label: '上传头像',
			optional: true,
			content: UpLoadIcon,
		}
	]


	state = {
		activeStep: 0,
		completed: false,
		steps: this.steps.map( () => {
			return {
				valid: false,
				completed: false,
				value: {},
				next: false
			}
		} )
	}

	createSteps() {
		let { steps, activeStep } = this.state;

		return this.steps.map( ( item, index ) => {
			return (
				<Step
					completed={ steps[ activeStep ].completed }
					active={ activeStep === index }
					key={ index }>

					<StepLabel>
						{ item.label }
					</StepLabel>

				</Step>
			)
		} )
	}

	componentWillUpdate( nextProps: StyleProps, nextState: States ) {
		if ( nextState.completed ) {
			this.props.completed();
		}
	}

	render() {
		const { activeStep, completed } = this.state;
		const { classes } = this.props;
		const activeStepInfo = this.state.steps[ activeStep ];
		const ActiveContent = this.steps[ activeStep ].content;

		return (
			<div>
				<Stepper
					activeStep={ activeStep }>
					{ this.createSteps() }
				</Stepper>

				<div className={ classes.content }>
					<ActiveContent
						valid={ this.onStepValid }
						inValid={ this.onStepInvalid }
						next={ activeStepInfo.next }
						completed={ this.onStepCompleted }
						value={ activeStepInfo.value }
						step={ activeStep } />
				</div>

				<div className={ classes.bottom }>
					<Button
						raised
						disabled={ activeStep < 1 }
						onClick={
							() => {
								if ( activeStep >= 1 ) {
									this.setState( {
										activeStep: activeStep - 1
									} )
								}
							}
						}
						className={ classes.bottomButton }
						color={
							activeStep > 0 ? 'primary' : 'default'
						}>
						上一步
					</Button>

					<Button
						raised
						disabled={ !this.steps[ activeStep ].optional }
						onClick={
							() => {
								if ( activeStep >= this.state.steps.length - 1 ) {
									this.setState( {
										completed: true
									} )
								}
								else {
									this.setState( {
										activeStep: activeStep + 1
									} )
								}
							}
						}
						className={ classes.bottomButton }
						color={
							this.steps[ activeStep ].optional ?
								"primary" : "default"
						}>
						跳过
					</Button>

					<Button
						className={ classes.bottomButton }
						raised
						disabled={ !activeStepInfo.valid }
						onClick={
							() => {
								activeStepInfo.next = true;
								this.setState( {
									steps: this.state.steps.slice( 0 )
								} )
							}
						}
						color={
							activeStepInfo.valid ?
								'primary' : 'default'
						}>
						{ completed ? '完成' : '下一步' }
					</Button>
				</div>
			</div>
		)
	}
}

export default withStyles<ClassKey>( styles )<Props>( Register );

