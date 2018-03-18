import React from 'react';
import Carousel from '../Carousel';

import Typography from 'material-ui/Typography';
import Tabs, { Tab } from 'material-ui/Tabs';
import withStyles, { StyleRulesCallback, WithStyles } from 'material-ui/styles/withStyles';
import { pink } from 'material-ui/colors';

export type ClassKey =
    'root'
    | 'carousel'
    | 'title'
    | 'indicator'
    | 'tabs'
    | 'labelSelected'
    | 'img'
    | 'labelContainer';

const styles: StyleRulesCallback<ClassKey> = theme => {
    return {
        root: {
            width: '100vw',
        },
        carousel: {
            width: '100%',
            height: '60vw'
        },
        title: {
            margin: '26px 16px 6px 16px'
        },
        indicator: {
            display: 'none'
        },
        tabs: {
            paddingLeft: 16,
            paddingRight: 16,
            marginTop: -8
        },
        labelSelected: {
            transform: 'scale(1.1)',
            fontWeight: 'bold',
            transition: 'all .6s ease',
            color: pink[ 400 ]
        },
        img: {
            height: '66vw'
        },
        labelContainer: {
            display: 'flex',
            justifyContent: 'flex-start'
        }
    }
}

export type Props = {

}


type States = {
    curTab: number,
}

class ImgGroups extends React.Component<Props & WithStyles<ClassKey>, States>{
    state = {
        curTab: 0
    }

    render() {
        let { classes } = this.props;

        return (
            <div className={ classes.root }>
                <Typography
                    className={ classes.title }
                    type="headline">
                    遇见未来家
                </Typography>

                <Tabs
                    classes={ {
                        root: classes.labelContainer
                    } }
                    centered={ false }
                    className={ classes.tabs }
                    fullWidth
                    indicatorClassName={ classes.indicator }
                    value={ this.state.curTab }
                    onChange={
                        ( e, v ) => {
                            this.setState( {
                                curTab: v
                            } )
                        }
                    }>
                    {
                        window.imgFiles.map( ( f, i ) => {
                            return (
                                <Tab value={ i } key={ i }
                                    classes={ {
                                        rootInheritSelected: classes.labelSelected
                                    } }
                                    label={
                                        <Typography type="body2">
                                            { f.dirName }
                                        </Typography>
                                    } />
                            )
                        } )
                    }
                </Tabs>

                <div>
                    <Carousel time={ 5000 } className={ classes.carousel }>
                        {
                            window.imgFiles[ this.state.curTab ]
                                .files.map( ( file, i ) => {
                                    return <img className={ classes.img } src={ file } key={ i } />
                                } )
                        }
                    </Carousel>
                </div>
            </div>
        )
    }
}

export default withStyles<ClassKey>( styles )<Props>( ImgGroups );