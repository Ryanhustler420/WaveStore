import React, { Component } from 'react';

import FormField from './../../utils/Form/FormField';
import { update, generateData, isFormValid, resetFields } from '../../utils/Form/formsAction';
import { getWoods, addWood } from './../../../actions/products_actions';
import { connect } from 'react-redux';

class ManageWoods extends Component {

    state = {
        formError: false,
        formSuccess: false,
        formdata: {
            name: {
                element: 'input',
                value: '',
                config: {
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Wood name'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            }
        }
    }

    showCategoryItems = () => (
        this.props.products.woods ?
            this.props.products.woods.map((item, i) => (
                <div className="category_item" key={item._id}>
                    {item.name}
                </div>
            ))
        :null
    )

    updateForm = (element) => {
        // it send state snapshot to function 'update()' and modify that 
        // than return backs the copy and here we set the state with that data
        const newFormdata = update(element, this.state.formdata, 'woods');
        this.setState({
            formError: false, 
            formdata: newFormdata
        });
    }

    componentDidMount() {
        this.props.dispatch(getWoods());
    }

    resetFieldHandler = () => {
        const newFormdata = resetFields(this.state.formdata, 'woods');

        this.setState({
            formData: newFormdata,
            formSuccess: true
        })
    }

    submitForm = (event) => {
        event.preventDefault();
        let dataToSubmit = generateData(this.state.formdata, 'woods');
        let formIsValid = isFormValid(this.state.formdata, 'woods');
        let existingWoods = this.props.products.woods;
        if(formIsValid){
            this.props.dispatch(addWood(dataToSubmit, existingWoods)).then(response => {
                if(response.payload.success){
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

    render() {
        return (
            <div className="admin_category_wrapper">
                <h1>Woods</h1>
                <div className="admin_two_column">
                    <div className="left">
                        <div className="brands_container">
                            {this.showCategoryItems()}
                        </div>
                    </div>
                    <div className="right">
                        <form onSubmit={(event) => this.submitForm(event)}>
                            <FormField 
                                id={'name'}
                                formdata={this.state.formdata.name}
                                change={(element) => this.updateForm(element)}
                            />
                            {
                                this.state.formError ?
                                    <div className="error_label">
                                        Please check your data
                                    </div>
                                :null
                            }
                                <button type="submit" tabIndex="-1" onClick={(event) => this.submitForm(event)}>
                                    Add wood
                                </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(ManageWoods);
