import React, { Component } from 'react'
import SideNav from './../../../HOC/sideNav';

import FormField from './../../utils/Form/FormField';
import { update, generateData, isFormValid, populateOptionsFields, resetFields } from '../../utils/Form/formsAction';

import { connect } from 'react-redux';
import { getWoods, getBrands, addProduct, clearProductReduxState } from './../../../actions/products_actions';

class AddProduct extends Component {

    state = {
        formError: false,
        formSuccess: false,
        formdata: {
            name: {
                element: 'input',
                value: '',
                config: {
                    label: 'Product name',
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Product name'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            description: {
                element: 'textarea',
                value: '',
                config: {
                    label: 'Product description',
                    name: 'description_input',
                    type: 'text',
                    placeholder: 'Enter description'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            price: {
                element: 'input',
                value: '',
                config: {
                    label: 'Product price',
                    name: 'price_input',
                    type: 'number',
                    placeholder: 'Enter price'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            brand: {
                element: 'select',
                value: '',
                config: {
                    label: 'Product Brand',
                    name: 'brand_input',
                    options: []
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            shipping: {
                element: 'select',
                value: '',
                config: {
                    label: 'Shipping',
                    name: 'shipping_input',
                    options: [
                        {key: true, value: 'Yes'},
                        {key: false, value: 'No'}
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            available: {
                element: 'select',
                value: '',
                config: {
                    label: 'Available, in stock',
                    name: 'available_input',
                    options: [
                        {key: true, value: 'Yes'},
                        {key: false, value: 'No'}
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            wood: {
                element: 'select',
                value: '',
                config: {
                    label: 'Wood material',
                    name: 'wood_input',
                    options: []
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            frets: {
                element: 'select',
                value: '',
                config: {
                    label: 'Frets material',
                    name: 'frets_input',
                    options: [
                        {key: 20, value: 20},
                        {key: 21, value: 21},
                        {key: 22, value: 22},
                        {key: 24, value: 24}
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            publish: {
                element: 'select',
                value: '',
                config: {
                    label: 'Publish',
                    name: 'publish_input',
                    options: [
                        {key: true, value: 'Public'},
                        {key: false, value: 'Hidden'}
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            }
        }
    }

    submitForm = (event) => {
        event.preventDefault();
        let dataToSubmit = generateData(this.state.formdata, 'products');
        let formIsValid = isFormValid(this.state.formdata, 'products');
        if(formIsValid){
            this.props.dispatch(addProduct(dataToSubmit)).then(() => {
                if (this.props.products.addProduct.success) {
                    this.resetFieldHandler();
                }else {
                    this.setState({formError: true});
                }
            })
        } else {
            this.setState({
                formError: true
            })
        }
    }


    resetFieldHandler = () => {

        const newFormdata = resetFields(this.state.formdata, 'products');

        this.setState({
            formData: newFormdata,
            formSuccess: true
        })

        setTimeout(() => {
            this.setState({
                formSuccess: false
            },() => {
                this.props.dispatch(clearProductReduxState())
            })
        },3000);
    }

    updateForm = (element) => {
        // it send state snapshot to function 'update()' and modify that 
        // than return backs the copy and here we set the state with that data
        const newFormdata = update(element, this.state.formdata, 'products');
        this.setState({
            formError: false, 
            formdata: newFormdata
        });
    }

    updateFields = (formData) => {
        this.setState({
            formdata: formData
        })
    }

    componentDidMount() {
        const formdata = this.state.formdata;

        this.props.dispatch(getBrands()).then(response => {
            const newFormdata = populateOptionsFields(formdata, this.props.products.brands, 'brand')
            this.updateFields(newFormdata);
        })

        this.props.dispatch(getWoods()).then(response => {
            const newFormdata = populateOptionsFields(formdata, this.props.products.woods, 'wood')
            this.updateFields(newFormdata);
        })
    }

    render() {
        return (
            <SideNav>
                <div>
                    <h1>Add product</h1>

                    <form onSubmit={(event) => this.submitForm(event)}>
                        <FormField 
                            id={'name'}
                            formdata={this.state.formdata.name}
                            change={(element) => this.updateForm(element)}
                        />

                        <FormField 
                            id={'description'}
                            formdata={this.state.formdata.description}
                            change={(element) => this.updateForm(element)}
                        />

                        <FormField 
                            id={'price'}
                            formdata={this.state.formdata.price}
                            change={(element) => this.updateForm(element)}
                        />

                        <div className="form_devider"></div>

                        <FormField 
                            id={'brand'}
                            formdata={this.state.formdata.brand}
                            change={(element) => this.updateForm(element)}
                        />

                        <FormField 
                            id={'shipping'}
                            formdata={this.state.formdata.shipping}
                            change={(element) => this.updateForm(element)}
                        />

                        <FormField 
                            id={'available'}
                            formdata={this.state.formdata.available}
                            change={(element) => this.updateForm(element)}
                        />

                        <div className="form_devider"></div>

                        <FormField 
                            id={'wood'}
                            formdata={this.state.formdata.wood}
                            change={(element) => this.updateForm(element)}
                        />

                        <FormField 
                            id={'frets'}
                            formdata={this.state.formdata.frets}
                            change={(element) => this.updateForm(element)}
                        />

                        <div className="form_devider"></div>


                        <FormField 
                            id={'publish'}
                            formdata={this.state.formdata.publish}
                            change={(element) => this.updateForm(element)}
                        />

                        {this.state.formSuccess ? 
                            <div className="form_success">
                                Success
                            </div>
                        :null}

                        {
                            this.state.formError ?
                                <div className="error_label">
                                    Please check your data
                                </div>
                            :null
                        }
                        <button type="submit" tabIndex="-1" onClick={(event) => this.submitForm(event)}>
                            Add product
                        </button>

                    </form>
                </div>
            </SideNav>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(AddProduct);