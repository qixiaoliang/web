import React from "react";
import { ajaxJson, ajaxAuthJson } from '../../util/ajax';
import BaseStep from "./BaseStep";
import { Props as BaseStepProps } from "./BaseStep";

import {Avatar} from 'material-ui';
import {Typography} from 'material-ui';
import { withStyles } from "material-ui";
import * as WithStyle from 'material-ui/styles';

//@ts-ignore
import defaultIcon from '../../../src/default.png';

export type BaseProps = {

}

export type ClassKey = 'avatar' | 'root' | 'right' | 'rightTitle';

const styles: WithStyle.StyleRulesCallback<ClassKey> = theme => {
	return {
		'root': {
			width: '100%',
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'center',
			margin: '16px 12px 56px 12px'
		},
		'avatar': {
			cursor: 'pointer',
			[ theme.breakpoints.up( 'sm' ) ]: {
				width: 200,
				height: 200
			},
			[ theme.breakpoints.down( 'md' ) ]: {
				width: 130,
				height: 130
			}
		},
		'right': {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			marginLeft: 26,
			textAlign: 'center',
			background: theme.palette.grey
		},
		'rightTitle': {
			marginBottom: 36,
			marginTop: 12
		}
	}
}

export type States = {
	avatarSrc: string;
	error: string;
}

class UpLoadIcon extends BaseStep<BaseProps & WithStyle.WithStyles<ClassKey>, States>{
	inputFile: HTMLInputElement;
	form: HTMLFormElement;

	state = {
		avatarSrc: defaultIcon,
		error: ''
	}

	startUpLoad = () => {
		this.inputFile.click();
	}

	onChange = () => {
		let files = ( this.inputFile as HTMLInputElement ).files;
		if ( files.length >= 1 ) {
			this.props.valid( this.props.step );

			let fileReader = new FileReader();
			fileReader.readAsDataURL( files[ 0 ] );
			fileReader.onload = () => {
				this.setState( {
					avatarSrc: fileReader.result
				} );
			}
		}
	}

	nextStep() {
		(
			async () => {
				let formData = new FormData( this.form );

				let result
				try {
					result = await ajaxAuthJson( '/api/upLoad', null, {
						body: formData,
						method: 'POST'
					} )
				}
				catch ( e ) {
					this.setState( {
						error: '上传失败'
					} )
				}

				if ( result && result.icon ) {
					let result2 = await ajaxAuthJson(
						'/api/setAvatar',
						{ avatar: result.icon }
					)
					if ( result2 ) {
						this.setState( {
							error: ''
						} )
						this.props.completed( this.props.step, result2 );
					}
					else {
						this.setState( {
							error: '设置头像失败'
						} )
					}
				}
				else {
					this.setState( {
						error: '上传失败'
					} )
				}
			}
		)().then();
	}

	render() {
		const { classes } = this.props;
		const { avatarSrc } = this.state;
		return (
			<div className={ classes.root }>
				<Avatar src={ avatarSrc } className={ classes.avatar } onClick={ this.startUpLoad } />

				<form
					style={ { display: 'none' } }
					encType="multipart/form-data"
					method="POST"
					ref={ r => this.form = r }>
					<input
						accept="image/*"
						onChange={ this.onChange }
						type="file"
						name="icon"
						id="icon"
						ref={ r => this.inputFile = r } />
				</form>

				<div className={ classes.right }>
					<Typography type="title" className={ classes.rightTitle }>
						点击上传头像
					</Typography>

					<Typography
						style={ { visibility: this.state.error ? 'visible' : 'hidden', color: 'red' } }
						type="body2">
						{ this.state.error }
					</Typography>

					<Typography type="body1">
						支持JPG PNG GIF格式。
					</Typography>
				</div>
			</div>
		)
	}
}

export default withStyles<ClassKey>( styles )<BaseProps & BaseStepProps>( UpLoadIcon )
