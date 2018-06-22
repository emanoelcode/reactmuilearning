import React, {Component, Fragment} from 'react';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import WriterList from "./Writers/WriterList";
import { NotFound } from './Erros';

export default class extends Component {

    state = {
        writers: []
    };


    async componentDidMount() {
        //A parte ?_embed=texts da URL do json server faz com que o servidor retorne
        //o json de writers com o texts embutido/aninhado
        const writers = await (await fetch('http://localhost:3004/writers?_embed=texts')).json();
        this.setState({writers});
    }

    // componentDidMount() {
    //     fetch('http://localhost:3004/writers')
    //         .then(res => res.json())
    //         .then(writers => this.setState({writers}));
    // }

    render() {
        return (
            <BrowserRouter>
                <Fragment>
                    <ul>
                        <li>
                            <Link to={"/"}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to={"/writers"}>
                                Writers
                            </Link>
                        </li>
                    </ul>

                    {/*Switch faz com que seja roteado apenas para a primeira opção de rota correspondente encontrada*/}
                    <Switch>
                        <Route exact path="/" render={() => <div>Home</div>}/>

                        <Route path="/writers" render={
                            props => <WriterList {...props} writers={this.state.writers}/>
                        }/>

                        <Route component={NotFound} />
                    </Switch>
                </Fragment>
            </BrowserRouter>
        );
    }

}