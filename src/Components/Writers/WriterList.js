import React,  { Fragment } from 'react'
import { Link, Route } from "react-router-dom";
import WriterDetail from "./WriterDetail"
import { NotFound } from '../Erros';
export default ({ match: { url }, writers }) =>
    <Fragment>
        <ul>
            {writers.map(({ id, name }) =>
                <li key={id}>
                    <Link to={`${url}/${id}`}>
                        {name}
                    </Link>
                </li>
            )}

        </ul>

        <Route exact patch={url} render={
            () => <h3>Please select a writer from above.</h3>
        } />

        <Route
            path={`${url}/:writerId`}
            render={ (props) => {

                const writer = writers.find(writer => writer.id === props.match.params.writerId);

                if(!writer)
                {
                    return <NotFound/>
                    //Opção para tratar redirecionando para uma página de erro
                    //return <Redirect to="/404" />
                }

                return <WriterDetail {...props} {...writer} />
            }
        } />
    </Fragment>