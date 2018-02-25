import React, { Component } from 'react'

export default class TextInput extends Component {

    render() {
        return (
            <div className={'col-sm-'+this.props.cols}>
                <label htmlFor="field">{this.props.label}</label>
                <input type="text" name="field" id="field" classNamei="form-control"></input>
            </div>
        )
    }
}
