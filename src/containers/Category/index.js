import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, getAllCategory } from '../../actions/index';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input';
import Modal from '../../components/UI/Modal';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import {
    IoBagCheckOutline,
    IoBagCheckSharp,
    IoArrowRedoSharp,
    IoArrowDownSharp
} from "react-icons/io5";

export function Category() {
    const category = useSelector(state => state.category);
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [show, setShow] = useState(false);
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const dispatch = useDispatch();



    const handleClose = () => {
        const form = new FormData();
        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);
        dispatch(addCategory(form));
        setCategoryName('');
        setParentCategoryId('');
        // const cat = {
        //     categoryName,
        //     parentCategoryId,
        //     categoryImage
        // };
        // console.log(cat);
        setShow(false);
    }
    const handleShow = () => setShow(true);


    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                {
                    label: category.name,
                    value: category.id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }
                // <li key={category.name}>
                //     {category.name}
                //     {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
                // </li>
            )
        }
        return myCategories;
    }


    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category.id, name: category.name })
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }

        return options;
    }


    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    }

    const updateCategory = () => {
        setUpdateCategoryModal(true);
    }

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <button onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <IoBagCheckSharp />,
                                uncheck: <IoBagCheckOutline />,
                                halfCheck: <IoBagCheckOutline />,
                                expandClose: <IoArrowRedoSharp />,
                                expandOpen: <IoArrowDownSharp />
                            }}
                        />
                        {/* <ul>
                            {renderCategories(category.categories)}
                            {JSON.stringify(createCategoryList(category.categories))}
                        </ul> */}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button>Delete</button>
                        <button onClick={updateCategory}>Edit</button>
                    </Col>
                </Row>
            </Container>

            <Modal
                show={show}
                handleClose={handleClose}
                modalTitle={'Add New Category'}
            >
                <Input
                    value={categoryName}
                    placeholder={`Category Name`}
                    onChange={(e) => { setCategoryName(e.target.value) }}
                />

                <select
                    className="form-control"
                    value={parentCategoryId}
                    onChange={(e) => { setParentCategoryId(e.target.value) }}>
                    <option>Select Category</option>
                    {/* <option>Electronics</option>
                        <option>Sports Books & More</option>
                        <option>Mens</option>
                        <option>Experts-Knowledge</option>
                        <option>Mobiles</option> */}
                    {/* <option>Select Category 2</option> */}
                    {
                        createCategoryList(category.categories).map(option => {
                            return <option key={option.value} value={option.value}>{option.name}</option>
                        })
                    }
                </select>

                <input type="file" name="categoryImage" onChange={handleCategoryImage} />
            </Modal>


            {/* Edit Categories */}

            <Modal
                show={updateCategoryModal}
                handleClose={() => setUpdateCategoryModal(false)}
                modalTitle={'Update Categories'}
                size="lg"
            >
                <Input
                    value={categoryName}
                    placeholder={`Category Name`}
                    onChange={(e) => { setCategoryName(e.target.value) }}
                />

                <select
                    className="form-control"
                    value={parentCategoryId}
                    onChange={(e) => { setParentCategoryId(e.target.value) }}>
                    <option>Select Category</option>
                    {/* <option>Electronics</option>
                        <option>Sports Books & More</option>
                        <option>Mens</option>
                        <option>Experts-Knowledge</option>
                        <option>Mobiles</option> */}
                    {/* <option>Select Category 2</option> */}
                    {
                        createCategoryList(category.categories).map(option => {
                            return <option key={option.value} value={option.value}>{option.name}</option>
                        })
                    }
                </select>

                <input type="file" name="categoryImage" onChange={handleCategoryImage} />
            </Modal>
        </Layout>
    )
}
