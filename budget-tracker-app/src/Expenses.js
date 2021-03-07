import React, { Component, useState }  from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
import { Form, FormGroup, Button, Input, Label } from 'reactstrap';


class Expenses extends Component {
    state = {  
        date: new Date(),
        isLoading: true,
        expenses: [],
    }

    handleChange

    async componentDidMount(){
        const response = await fetch('/api/expenses')
        const body = await response.json();
        this.setState({expenses:body, isLoading: false});
    }

    render() { 
        const title = <h2>Add Expense</h2>;

        return ( 
        <React.Fragment>             
            {title}
            <Form onSumit={this.handleSubmit}>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input type="text" name="title" id="title" onChange={this.handleChange}/>
                </FormGroup>

                <FormGroup>
                    <Label for="category">Category</Label>
                    <Input type="text" name="category" id="category" onChange={this.handleChange}/>
                </FormGroup>

                <FormGroup>
                    <Label for="expensedate">Date</Label>
                    <DatePicker selected={this.state.date} onChange={this.handleChange} />
                </FormGroup>

                <FormGroup>
                    <Label for="location">Location</Label>
                    <Input type="text" name="location" id="location" onChange={this.handleChange}/>
                </FormGroup>

                <FormGroup>
                    <Button color="primary" type="submit">Save</Button>{' '}
                    <Button color="secondary" tag={Link} to ="/categories">Cancel</Button>

                </FormGroup> 
            </Form>

        </React.Fragment>  
        );
    }
}
 
export default Expenses;