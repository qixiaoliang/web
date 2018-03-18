import BaseStep from './BaseStep';
import React from 'react';
import { ajaxWithAuth, ajaxJson } from '../../util/ajax'
import { Props as BaseStepProps } from './BaseStep';
import { saveUserAuth } from '../../util/UserSignal';

import { withStyles } from 'material-ui';
import * as WithStyle from 'material-ui/styles';
import { Button } from 'material-ui';
import { Typography } from 'material-ui';

export type BaseProps = {

}

export type ClassKey = 'title' | 'emailBtn' | 'validBtn' | 'reValidBtn' | 'error';
const styles: WithStyle.StyleRulesCallback<ClassKey> = theme => {
    return {
        title: {
            marginTop: 12,
            marginBottom: 38,
        },
        reValidBtn: {
            marginBottom: 8,
        },
        emailBtn: {
            width: '46%',
            marginBottom: 20
        },
        validBtn: {
            width: '66%',
            marginBottom: 32
        },
        error: {
            color: theme.palette.error
        }
    }
}

export type States = {
    error: string;
    keepSign: boolean;
}
class EmailValid extends BaseStep<BaseProps & WithStyle.WithStyles<ClassKey>, States> {
    state = {
        error: '',
        keepSign: false
    }

    nextStep() {

    }

    render() {
        const { classes } = this.props;

        return (
            <>
                <Typography type="title" className={ classes.title }>
                    {
                        this.state.error ?
                            <span className={ classes.error }>
                                { this.state.error }
                            </span> :
                            '前往你的邮箱确认注册'
                    }
                </Typography>

                <Button
                    raised
                    onClick={
                        () => (
                            async () => {
                                let result = await ajaxJson(
                                    '/registerUser',
                                    this.props.value
                                )
                                if ( !result ) {
                                    this.setState( {
                                        error: '邮件发送失败'
                                    } )
                                }
                            }
                        )().then()
                    }
                    className={ classes.reValidBtn }>
                    未收到？重新发送
            </Button>

                <Button
                    className={ classes.emailBtn }
                    raised
                    onClick={
                        () => {
                            this.setState( ( preState ) => {
                                return {
                                    keepSign: !preState.keepSign
                                }
                            } )
                        }
                    }
                    color={
                        this.state.keepSign ? 'secondary' : 'default'
                    }>
                    记住登陆信息
            </Button>

                <Button
                    className={ classes.validBtn }
                    raised
                    onClick={
                        () => (
                            async () => {
                                let { name, password } = this.props.value;

                                let result = await ajaxJson(
                                    '/api/hasUser',
                                    { name }
                                )
                                if ( result === true ) {
                                    saveUserAuth(
                                        { name, password }, this.state.keepSign
                                    )

                                    this.props.completed(
                                        this.props.step, null
                                    )
                                    this.setState( {
                                        error: ''
                                    } )
                                }
                                else {
                                    this.setState( {
                                        error: '验证失败'
                                    } )
                                }
                            }
                        )().then()
                    }
                    color="primary">
                    已验证
            </Button>
            </>
        )
    }
}

export default withStyles<ClassKey>( styles )<BaseProps & BaseStepProps>( EmailValid );