import React from 'react';

import withStyles, { StyleRulesCallback, WithStyles } from 'material-ui/styles/withStyles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { lightGreen } from 'material-ui/colors';

export type ClassKey = 'root' | 'accountItem' | 'account_item' | 'account' | 'title' | 'btn';
const styles: StyleRulesCallback<ClassKey> = theme => {
    return {
        root: {
            width: '100vw',
            padding: '12px 18px',
            marginTop: 12
        },
        title: {
            marginBottom: 16
        },
        accountItem: {
            background: theme.palette.background.status,
            padding: '6px 12px',
            border: '1px solid',
            borderColor: lightGreen[ 500 ],
            margin: '8px 0'
        },
        account_item: {
            color: lightGreen[ 800 ],
            display:'inline'
        },
        account: {
            marginLeft: 12,
            color: lightGreen[ 900 ],
            display:'inline'
        },
        btn: {
            marginTop: 16
        }
    }
}

export type Props = {

}


type States = {

}

class CalcAmount extends React.Component<Props & WithStyles<ClassKey>, States>{
    state = {

    }

    render() {
        let { classes } = this.props;
        let { } = this.state;

        let AccountItem = ( { item, account }: { [ key: string ]: string } ) => (
            <div className={ classes.accountItem }>
                <Typography
                    type="body2"
                    className={ classes.account_item }>
                    { item }
                </Typography>
                <Typography
                    type="body2"
                    className={ classes.account }>
                    { account }
                </Typography>
            </div>
        )

        return (
            <div className={ classes.root }>
                <Typography type="headline" className={ classes.title }>
                    我家装修多少钱
                </Typography>

                <AccountItem
                    item="石膏顶"
                    account="90元每平方米" />
                <AccountItem
                    item="石膏顶"
                    account="90元每平方米" />
                <AccountItem
                    item="室内门"
                    account="500元每个" />
                <AccountItem
                    item="隔断"
                    account="55元每平方米" />

                <Button
                    raised
                    color="primary"
                    className={ classes.btn }
                    
                    fullWidth>
                    立即联系装修
                </Button>
            </div>
        )
    }
}
export default withStyles<ClassKey>( styles )<Props>( CalcAmount );