import React, { useState } from 'react';
import { Form, Input, Modal, Select, message } from "antd";
import Spinner from './Spinner';
import axios from 'axios';

function AddEditTransaction({showAddEditTransactionModal, setShowAddEditTransactionModal, getTransactions}) 
{
    const [loading, setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem("spendwise-user"));
    const onFinish = async function(values)
    {
        try 
        {
            setLoading(true);
            await axios.post("/api/transactions/add-transaction", {...values, userId: user._id});
            getTransactions();
            message.success("Transaction added successfully");
            setShowAddEditTransactionModal(false);
            setLoading(false);
        } 
        catch (error) 
        {
            setLoading(false);
            message.error("Something went wrong");    
        }
    }

    return (
        <Modal title="Add Transaction" open={showAddEditTransactionModal} onCancel={() => setShowAddEditTransactionModal(false)} className="modalstyle" footer={false}>
            {loading && <Spinner />}
            <Form layout="vertical" className="transaction-form" onFinish={onFinish}>
                <Form.Item label="Amount" name="amount">
                    <Input type="text"></Input>
                </Form.Item>
                <Form.Item label="Type" name="type">
                    <Select>
                        <Select.Option value="income">Income</Select.Option>
                        <Select.Option value="expense">Expense</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Category" name="category">
                    <Select>
                        <Select.Option value="salary">Salary</Select.Option>
                        <Select.Option value="freelance">Freelance</Select.Option>
                        <Select.Option value="friend-family">Friend/Family</Select.Option>
                        <Select.Option value="entertainment">Entertainment</Select.Option>
                        <Select.Option value="sports">Sports</Select.Option>
                        <Select.Option value="health">Health</Select.Option>
                        <Select.Option value="food">Food</Select.Option>
                        <Select.Option value="education">Education</Select.Option>
                        <Select.Option value="tax">Tax</Select.Option>
                        <Select.Option value="shopping">Shopping</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Date" name="date">
                    <Input type="date"></Input>
                </Form.Item>
                <Form.Item label="Reference" name="reference">
                    <Input type="text"></Input>
                </Form.Item>
                <Form.Item label="Description" name="description">
                    <Input type="text"></Input>
                </Form.Item>
                <div className="d-flex justify-content-end">
                    <button className="primary" type="submit">SAVE</button>
                </div>
            </Form>
        </Modal>
    );
}

export default AddEditTransaction;