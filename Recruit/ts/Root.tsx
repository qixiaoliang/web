
import React from 'react';
import CardSwitcher from './comps/CardSwitcher';
import Cards from './comps/CardPages';
import SoundSwitcher from './comps/SoundSwitcher';
import ProgressBar from './comps/ProgressBar';
class Root extends React.Component {
    state = {
        curPage: 0
    }

    render() {
        return (
            <div>
                <SoundSwitcher />
                <CardSwitcher
                    onSwitch={
                        val => {
                            this.setState( {
                                curPage: val
                            } )
                        }
                    }>
                    { Cards.map( ( Card, i ) => <Card key={ i } /> ) }
                </CardSwitcher>
                <ProgressBar step={ this.state.curPage } maxSteps={ Cards.length - 1 } />
            </div>
        )
    }
}

export default Root;