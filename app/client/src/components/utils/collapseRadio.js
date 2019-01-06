import React, { Component } from 'react';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';

import {    
        List, 
        ListItem, 
        ListItemText, 
        Collapse, 
        Radio,
        RadioGroup, 
        FormControlLabel 
    } from '@material-ui/core';

export default class CollapseRadio extends Component {

    state = {
        open: false,
        value: '0'
    }

    componentDidMount() {
        if(this.props.initState){
            this.setState({
                open: this.props.initState
            })
        }
    }

    handleClick = () => {
        this.setState({
            open: !this.state.open
        })
    }

    handleAngle = () => (
        this.state.open ?
            <FontAwesomeIcon 
                icon={faAngleUp}
                className="icon"
            />
        :
            <FontAwesomeIcon 
                icon={faAngleDown}
                className="icon"
            />
    )

    renderList = () => (
        this.props.list ?
            this.props.list.map(value => (
                <FormControlLabel 
                    key={value._id}
                    value={`${value._id}`}
                    control={<Radio />}
                    label={value.name}
                />
            ))
            :null
    )


    handleChange = event => {
        this.props.handleFilters(event.target.value);
        this.setState({
            value: event.target.value
        })
    }

    render() {
        return (
            <div className="collapse_items_wrapper">
                <List style={{borderBottom: '1px solid #dbdbdb'}}>
                    <ListItem onClick={this.handleClick} style={{padding: '10px 23px 10px 0'}}>
                        <ListItemText 
                            primary={this.props.title}
                            className="collapse_title"
                        />
                        {this.handleAngle()}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <RadioGroup
                                aria-label="prices"
                                name="prices"
                                value={this.state.value}
                                onChange={this.handleChange}
                            >
                                {this.renderList()}
                            </RadioGroup>
                        </List>
                    </Collapse>
                </List>
            </div>
        )
    }
}
