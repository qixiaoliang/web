import React from 'react';

import { withStyles } from 'material-ui';
import * as WithStyle from 'material-ui/styles';
import { Input, InputLabel } from 'material-ui';
import { FormHelperText, FormControlLabel } from 'material-ui';
import { Button } from 'material-ui';
import { Checkbox } from 'material-ui';
import { Avatar } from 'material-ui';

//@ts-ignore
import defaultIcon from '../../../src/default.png';

import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from "material-ui-icons/VisibilityOff";
import Email from 'material-ui-icons/Email';
import Texture from "material-ui-icons/Texture";

import { ajaxJson, ajaxWithAuth } from "../../util/ajax";
import { saveUserAuth, clearUserAuth } from "../../util/UserSignal";

export type ClassKey = string;
const styles: WithStyle.StyleRulesCallback<ClassKey> = theme => {
    const labelWidth = 60;
    return {
        avatar: {
            [ theme.breakpoints.up( 'sm' ) ]: {
                width: 100,
                height: 100,
            },
            [ theme.breakpoints.down( 'md' ) ]: {
                width: 82,
                height: 82
            },
            margin: '22px 0 32px 0'
        },
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
        },
        submit: {
            marginTop: 12,
            marginBottom: 12,
            padding: '8px 0'
        }
    }
}

export type Props = {
    completed: () => void
}

export enum SignType {
    name, email
}

export type States = {
    nameErr: boolean;
    passwordErr: boolean;
    nameErrText: string;
    passwordErrText: string;
    signType: SignType;
    passwordShow: boolean;
    keepSign: boolean;
    valid: boolean;
    icon: string;
}

class SignIn extends React.Component<Props & WithStyle.WithStyles<ClassKey>, States>{
    form: HTMLFormElement;
    name: string;
    password: string;

    state = {
        nameErr: false,
        passwordErr: false,
        nameErrText: '',
        passwordErrText: '',
        signType: SignType.name,
        passwordShow: false,
        keepSign: true,
        valid: false,
        icon: defaultIcon
    }

    check = () => {
        if ( this.form.checkValidity() ) {
            this.setState( {
                valid: true
            } )
        }
        else {
            this.setState( {
                valid: false
            } )
        }
    }

    inputBlur = ( e: React.SyntheticEvent<any> ) => {
        let target = ( e.target as HTMLInputElement );
        if ( target.validity.valid ) {
            let value = target.value;

            ( async () => {
                if ( this.state.signType === SignType.email ) {
                    let hasEmail = await ajaxJson(
                        '/api/hasEmail', { email: value }
                    )
                    if ( !hasEmail ) {
                        this.setState( {
                            nameErr: true,
                            nameErrText: 'EMAIL不存在'
                        } )
                        return;
                    }
                    else {
                        let emailOwner = await ajaxJson(
                            '/api/emailOwner', { email: value }
                        )
                        value = emailOwner;
                    }
                }

                let hasUser = await ajaxJson(
                    '/api/hasUser', { name: value }
                )

                if ( hasUser ) {
                    let _icon = await ajaxJson(
                        '/api/avatar', { name: value }
                    )

                    if ( _icon ) {
                        this.setState( {
                            icon: window.serverAddress + '/src/' + _icon
                        } )
                    }
                }
                else {
                    this.setState( {
                        nameErr: true,
                        nameErrText: '用户不存在'
                    } )
                }
            } )().then();
        }
    }

    render() {
        const { classes } = this.props;
        const {
            nameErr,
            keepSign,
            nameErrText,
            passwordErr,
            passwordErrText,
            passwordShow,
            signType,
            valid
        } = this.state;

        return (
            <form
                style={ { width: '100%' } }
                ref={ r => this.form = r }
                id="inputInfoForm"
                name="inputInfoForm"
                method="GET"
                action="/">

                <div
                    style={ {
                        display: 'flex',
                        justifyContent: 'center'
                    } }>
                    <Avatar
                        className={ classes.avatar }
                        src={ this.state.icon } />
                </div>

                <div className={ classes.row }>
                    <InputLabel
                        error={ nameErr }
                        className={ classes.inputLabel }
                        htmlFor="name"
                        required>
                        { signType === SignType.name ? '昵称' : '邮箱' }
                    </InputLabel>
                    <Input
                        error={ nameErr }
                        className={ classes.input }
                        fullWidth
                        onBlur={ this.inputBlur }
                        endAdornment={
                            <span
                                style={ { marginRight: '6px', cursor: 'pointer' } }
                                onClick={ () => this.setState(
                                    ( preState ) => {
                                        return {
                                            signType: signType === SignType.name ?
                                                SignType.email : SignType.name,
                                            nameErr: false
                                        }
                                    }
                                ) }>
                                {
                                    signType === SignType.name ?
                                        <Email color="primary" /> :
                                        <Texture color="primary" />
                                }
                            </span>
                        }
                        onChange={
                            ( e ) => {
                                if ( e.target.validity.valid ) {
                                    this.check();
                                    this.setState( {
                                        nameErr: false,
                                    } )
                                }
                                else {
                                    this.setState( {
                                        nameErr: true,
                                        nameErrText: signType === SignType.name ?
                                            '1-24个字符' : 'EMAIL格式不正确'
                                    } )
                                }
                                this.name = e.target.value;
                            }
                        }
                        name="name"
                        id="name"
                        placeholder="输入EMAIL或昵称"
                        inputProps={ {
                            required: true,
                            type: signType === SignType.name ? 'text' : 'email',
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
                        error={ passwordErr }
                        className={ classes.inputLabel }
                        htmlFor="password"
                        required>
                        密码
                    </InputLabel>
                    <Input
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
                                        passwordErrText: ''
                                    } )
                                }
                                else {
                                    this.setState( {
                                        passwordErr: true,
                                        passwordErrText: '8-24个字母，数字 ，或_'
                                    } )
                                }
                                this.password = e.target.value
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

                <div
                    style={ {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end'
                    } }>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={ this.state.keepSign }
                                onChange={
                                    () => {
                                        this.setState( preState => {
                                            return {
                                                keepSign: !preState.keepSign
                                            }
                                        } )
                                    }
                                } />
                        }
                        label="记住登录信息" />
                </div>

                <Button
                    className={ classes.submit }
                    raised
                    onClick={
                        () => {
                            ( async () => {
                                let name;
                                if ( signType === SignType.email ) {
                                    name = await ajaxJson(
                                        '/api/emailOwner', { email: this.name }
                                    );
                                }
                                else {
                                    name = this.name;
                                }

                                saveUserAuth(
                                    { name, password: this.password },
                                    keepSign
                                );

                                let result = await ajaxWithAuth(
                                    '/api/privateUserInfo'
                                )
                                if ( result.status === 200 ) {
                                    this.props.completed();
                                }
                                else {
                                    clearUserAuth();
                                    this.setState( {
                                        passwordErr: true,
                                        passwordErrText: '密码错误'
                                    } )
                                }
                            } )().then()
                        }
                    }
                    color="primary"
                    fullWidth
                    disabled={ !valid || nameErr || passwordErr }>
                    登录
                </Button>
            </form>
        )
    }
}

export default withStyles<ClassKey>( styles )<Props>( SignIn );