import React from "react";
import BaseStep from "./BaseStep";
import { Props as BaseStepProps } from "./BaseStep";
import { ajaxJson } from '../../util/ajax';

import * as WithStyle from 'material-ui/styles';
import { withStyles } from "material-ui";
import  {Input, InputLabel } from "material-ui";
import { FormHelperText } from 'material-ui';

import VisibilityOff from "material-ui-icons/VisibilityOff";
import Visibility from 'material-ui-icons/Visibility';

export type ClassKey = 'row' | 'input' | 'inputLabel' | 'helperText';

const styles: WithStyle.StyleRulesCallback<ClassKey> = theme => {
    const labelWidth = 60;
    return {
        row: {
            display: 'flex',
            alignItems: 'center',
            width: '100%'
        },
        inputLabel: {
            width: labelWidth,
            marginRight: 6,
            textAlign: 'right'
        },
        input: {
            flex: 1
        },
        helperText: {
            marginLeft: labelWidth + 6,
            marginBottom: 4,
            color: 'red'
        }
    }
}

export type BaseProps = {

}

export class States {
    name: string;
    email: string;
    password: string;
    firmPassword: string;

    nameErr: boolean;
    emailErr: boolean;
    passwordErr: boolean;
    firmPasswordErr: boolean;

    passwordShow: boolean;
    firmPasswordShow: boolean;

    nameErrText: string;
    emailErrText: string;
    passwordErrText: string;
    firmPasswordErrText: string;
}

class InputInfo extends BaseStep<BaseProps & WithStyle.WithStyles<ClassKey>, States>{
    form: HTMLFormElement;
    nameInputElm: HTMLInputElement | null;
    emailInputElm: HTMLInputElement | null;
    passwordInputElm: HTMLInputElement | null;
    firmPasswordInputElm: HTMLInputElement | null;

    state = {
        name: '',
        email: '',
        password: '',
        firmPassword: '',

        nameErr: false,
        emailErr: false,
        passwordErr: false,
        firmPasswordErr: false,

        passwordShow: false,
        firmPasswordShow: false,

        nameErrText: '',
        emailErrText: '',
        passwordErrText: '',
        firmPasswordErrText: '',
    }

    check = () => {
        if ( this.form.checkValidity() ) {
            this.props.valid( this.props.step );
        }
        else {
            this.props.inValid( this.props.step );
        }
    }

    nextStep() {
        ( async () => {
            let { name, email, password } = this.state;
            let hasUser = await ajaxJson( '/api/hasUser', { name } );
            let hasEmail = await ajaxJson( '/api/hasEmail', { email } );

            if ( hasUser ) {
                this.setState( {
                    nameErr: true,
                    nameErrText: '此用户已存在'
                } )
            }

            if ( hasEmail ) {
                this.setState( {
                    emailErr: true,
                    emailErrText: '此邮箱已存在'
                } )
            }

            if ( !( hasUser || hasEmail ) ) {
                let result = await ajaxJson(
                    '/registerUser', { name, email, password }
                )
                if ( result && result.status === 'OK' )
                    this.props.completed( this.props.step, { name, email, password } );
                else {
                    this.setState( {
                        emailErr: true,
                        emailErrText: '注册失败'
                    } )
                }
            }
        } )().then();
    }

    render() {
        const {
            nameErr,
            emailErr,
            passwordErr,
            firmPasswordErr,

            passwordShow,
            firmPasswordShow,

            nameErrText,
            emailErrText,
            passwordErrText,
            firmPasswordErrText,
        } = this.state;
        const { classes } = this.props;

        return (
            <form
                style={ { width: '100%' } }
                ref={ r => this.form = r }
                id="inputInfoForm"
                name="inputInfoForm"
                method="GET"
                action="/">

                <div className={ classes.row }>
                    <InputLabel
                        error={ nameErr }
                        className={ classes.inputLabel }
                        htmlFor="name"
                        required>
                        昵称
                    </InputLabel>
                    <Input
                        error={ nameErr }
                        className={ classes.input }
                        fullWidth
                        name="name"
                        id="name"
                        onChange={
                            ( e ) => {
                                if ( e.target.validity.valid ) {
                                    this.check();
                                    this.setState( {
                                        nameErr: false,
                                        name: e.target.value
                                    } )
                                }
                                else {
                                    this.setState( {
                                        nameErr: true,
                                        nameErrText: '1-16个字符',
                                        name: e.target.value
                                    } )
                                }
                            }
                        }
                        placeholder="1~32个字符"
                        inputProps={ {
                            required: true,
                            pattern: '.{1,16}',
                            type: 'text',
                            form: 'inputInfoForm'
                        } } />
                </div>
                <FormHelperText
                    style={ { visibility: nameErr ? 'visible' : 'hidden' } }
                    className={ classes.helperText }>
                    { nameErrText }
                </FormHelperText>

                <div className={ classes.row }>
                    <InputLabel
                        error={ emailErr }
                        className={ classes.inputLabel }
                        htmlFor="email"
                        required>
                        邮箱
                    </InputLabel>
                    <Input
                        error={ emailErr }
                        className={ classes.input }
                        fullWidth
                        onChange={
                            ( e ) => {
                                if ( e.target.validity.valid ) {
                                    this.check();
                                    this.setState( {
                                        emailErr: false,
                                        email: e.target.value
                                    } )
                                }
                                else {
                                    this.setState( {
                                        emailErr: true,
                                        emailErrText: 'EMAIL格式不正确',
                                        email: e.target.value
                                    } )
                                }
                            }
                        }
                        name="email"
                        id="email"
                        placeholder="输入EMAIL"
                        inputProps={ {
                            required: true,
                            type: 'email',
                            form: 'inputInfoForm'
                        } } />
                </div>
                <FormHelperText
                    style={ { visibility: emailErr ? 'visible' : 'hidden' } }
                    className={ classes.helperText }>
                    { emailErrText }
                </FormHelperText>

                <div className={ classes.row }>
                    <InputLabel
                        error={ passwordErr }
                        className={ classes.inputLabel }
                        htmlFor="password"
                        required>
                        密码
                    </InputLabel>
                    <Input
                        inputRef={ r => this.passwordInputElm = r }
                        error={ passwordErr }
                        className={ classes.input }
                        fullWidth
                        endAdornment={
                            <span
                                style={ { marginRight: '6px', cursor: 'pointer' } }
                                onClick={ () => this.setState(
                                    ( preState ) => {
                                        return {
                                            passwordShow: !preState.passwordShow
                                        }
                                    }
                                ) }>
                                {
                                    passwordShow ?
                                        <Visibility color="primary" /> :
                                        <VisibilityOff color="primary" />
                                }
                            </span>
                        }
                        onChange={
                            ( e ) => {
                                if ( e.target.validity.valid ) {
                                    this.check();
                                    this.setState( {
                                        passwordErr: false,
                                        password: e.target.value
                                    } )
                                }
                                else {
                                    this.setState( {
                                        passwordErr: true,
                                        passwordErrText: '8-24个字母，数字 ，或_',
                                        password: e.target.value
                                    } )
                                }
                            }
                        }
                        name="password"
                        id="password"
                        placeholder="输入密码"
                        inputProps={ {
                            required: true,
                            type: passwordShow ? 'text' : 'password',
                            form: 'inputInfoForm',
                            pattern: '[\\w_]{8,24}'
                        } } />
                </div>
                <FormHelperText
                    style={ { visibility: passwordErr ? 'visible' : 'hidden' } }
                    className={ classes.helperText }>
                    { passwordErrText }
                </FormHelperText>

                <div className={ classes.row }>
                    <InputLabel
                        error={ firmPasswordErr }
                        className={ classes.inputLabel }
                        htmlFor="firmPassword"
                        required>
                        确认
                    </InputLabel>
                    <Input
                        error={ firmPasswordErr }
                        className={ classes.input }
                        fullWidth
                        endAdornment={
                            <span
                                style={ { marginRight: '6px', cursor: 'pointer' } }
                                onClick={ () => this.setState(
                                    ( preState ) => {
                                        return {
                                            firmPasswordShow: !preState.firmPasswordShow
                                        }
                                    }
                                ) }>
                                {
                                    firmPasswordShow ?
                                        <Visibility color="primary" /> :
                                        <VisibilityOff color="primary" />
                                }
                            </span>
                        }
                        onChange={
                            ( e ) => {
                                if ( this.passwordInputElm.validity.valid ) {
                                    e.target.setAttribute(
                                        'pattern',
                                        this.passwordInputElm.value
                                    )
                                }
                                else {
                                    return;
                                }

                                if ( e.target.validity.valid ) {
                                    this.check();
                                    this.setState( {
                                        firmPasswordErr: false,
                                        firmPassword: e.target.value
                                    } )
                                }
                                else {
                                    this.setState( {
                                        firmPasswordErr: true,
                                        firmPasswordErrText: '密码不一致',
                                        firmPassword: e.target.value
                                    } )
                                }
                            }
                        }
                        name="firmPassword"
                        id="firmPassword"
                        placeholder="再次输入密码"
                        inputProps={ {
                            required: true,
                            type: firmPasswordShow ? 'text' : 'password',
                            form: 'inputInfoForm'
                        } } />
                </div>
                <FormHelperText
                    style={ { visibility: firmPasswordErr ? 'visible' : 'hidden' } }
                    className={ classes.helperText }>
                    { firmPasswordErrText }
                </FormHelperText>

            </form>
        )
    }
}

export default withStyles<ClassKey>( styles )<BaseProps & BaseStepProps>( InputInfo );

