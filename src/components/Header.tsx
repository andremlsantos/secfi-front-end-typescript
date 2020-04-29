import React, { Component } from 'react'
import '../css/Header.css'

export class Header extends Component {
    render() {
        return (
            <nav>
                <ul>
                    <li><a href="https://www.secfi.com/" className="left logo"> </a></li>
                    <li><a href="#" className="right">Contact</a></li>
                    <li><a href="#" className="right">GitHub</a></li>
                </ul>
            </nav>
        )
    }
}

export default Header
