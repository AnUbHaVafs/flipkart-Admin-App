import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Header from '../Header'
import './style.css';

export default function Layout(props) {
    return (
        <div>
            <Header />
            {
                props.sidebar ?
                    <Container fluid>
                        <Row>
                            <Col md={2} className="sidebar">
                                <ul>
                                    <li><Link to="/" className="navbar-brand">Home</Link></li>
                                    <li><Link to="/category" className="navbar-brand">Category</Link></li>
                                    <li><Link to="/products" className="navbar-brand">Products</Link></li>
                                    <li><Link to="/orders" className="navbar-brand">Orders</Link></li>
                                </ul>
                            </Col>
                            <Col md={10} style={{ marginLeft: 'auto', paddingTop: '60px' }} >{props.children}</Col>
                        </Row>
                    </Container>
                    :
                    props.children
            }

        </div>
    )
}
