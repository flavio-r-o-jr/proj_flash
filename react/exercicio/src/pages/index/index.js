import React, { Component } from 'react';
import { Image } from 'antd';
import flash from '../../imagens/flash.jpg'
import "./index.css"

export default class Index extends Component {
    render() {
        return (
            <div className='index-image'>
                <Image width="90%" margin="center" preview="false" src={flash} />
            </div>
        )
    }
}