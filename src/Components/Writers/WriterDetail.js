import React, {Fragment} from 'react'
import {Link, Route} from "react-router-dom";
import {NotFound} from '../Erros';
import Text from "./Text";

export default ({match: {url}, name, born, deceased, description, image, texts}) =>
    <Fragment>
        <img src={image} alt={name} style={{maxWidth: 200}}/>

        <h1>{name}</h1>

        <h3>
            {born} &mdash; {deceased}
        </h3>

        <p>
            {description}
        </p>

        <ul>
            {texts.map(text =>
                <li key={text.id}>
                    <Link to={`${url}/texts/${text.id}`}>
                        {text.title}
                    </Link>
                </li>
            )}
        </ul>

        <Route
            path={`${url}/texts/:textId`}
            render={(props) => {

                const text = texts.find(text => text.id === props.match.params.textId);

                if (!text) {
                    return <NotFound/>
                }

                return <Text {...text} />
            }}
        />

    </Fragment>