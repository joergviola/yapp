import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios'

export default class List extends Component {

    constructor(props) {
        super(props)
        this.state = {items:[]}
    }

    componentDidMount() {
        axios.get('http://localhost/tony/backend/public/api/1.0/'+this.props.type+'?q=' + encodeURIComponent(this.props.query))
            .then(response => {
                console.log('GET RESULT', response.data);
                const items = response.data;
                items.forEach(item => {
                    item.url = this.props.detail+item.id
                })
                this.setState({items:items})
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const rows = this.state.items.map(item =>
            this.props.body(item)
        )

        return (
            <div className={'col-sm-'+this.props.cols}>
                <div className="card">
                    <div className="card-header">
                        <strong>{this.props.label}</strong>
                    </div>
                    <div className="card-block">
                        <div className="row">
                            <slot name="header"></slot>
                        </div>
                        {rows}
                    </div>
                    <div className="card-footer">
                        <Link to={this.props.detail + 1} className="btn btn-default pull-right">Create</Link>
                    </div>
                </div>
            </div>
        )
    }
}
