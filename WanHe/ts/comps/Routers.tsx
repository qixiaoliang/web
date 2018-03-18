import { BrowserRouter, withRouter, Route } from 'react-router-dom';
import React from 'react';
import MainTitle from './MainTitle';
import Footer from './Footer';
import MainPage from './MainPage';

export type Props = {

}

function Routers( props: Props ) {
    return (
        <BrowserRouter>
            <div>
                <Route render={
                    ( { history } ) => {
                        let title: string = undefined;
                        switch ( history.location.pathname ) {
                            case '/': title = "万和装饰"; break;
                            case '/about': title = "关于我们"; break;
                            case '/products': title = "所有商品"; break;
                            case '/instances': title = "装修案例"; break;
                            default: break;
                        }

                        return <MainTitle title={ title } onBack={
                            () => {
                                history.goBack();
                            }
                        } />
                    }
                } />

                <Route exact path="/" component={ MainPage } />

                <Route exact path="/products" render={ () => {
                    return <h1>products</h1>
                } } />

                <Route exact path="/instances" render={ () => {
                    return <h1>instances</h1>
                } } />

                <Route exact path="/about" render={ () => {
                    return <h1>about</h1>
                } } />

                <Route component={ Footer } />
            </div>
        </BrowserRouter>
    )
}

export default Routers;