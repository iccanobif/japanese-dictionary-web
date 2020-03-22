import React, { Component } from 'react';
import './spinner.css'

export default class Spinner extends Component
{
    render()
    {
        // TODO: A better way to handle visibility would be to make two css classes rather
        // than setting the "visible" property straight from javascript.
        const visible = this.props.visible
        const cssVisibilityValue = visible ? "unset" : "hidden"

        return (<div class="loader" style={{ visibility: cssVisibilityValue }}></div>)
    }
}