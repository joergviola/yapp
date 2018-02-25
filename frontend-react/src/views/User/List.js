import React, { Component } from 'react'
import * as Layout from '@/components/Layout/'
import * as Form from '@/components/Form/'

export default class UserList extends Component {

    render() {
        return (
            <Layout.Row>
                <Layout.List label="Users" type="user" query="name=test|mail=10" cols="12" detail="/user/"
                    header={<div></div>}
                    body={item =>
                        <Layout.Row key={item.id}>
                            <Form.TextInput label="Company" cols="4" value={item.company_id} onchange={v => item.company_id = v}></Form.TextInput>
                            <Form.TextInput label="Company" cols="4" field="company_id" item={item}></Form.TextInput>
                            <Form.ToOneInput label="Client" cols="4" field="client_id" item={item} type="company"></Form.ToOneInput>
                            <div>{item.name}</div>
                            <div>{item.email}</div>
                        </Layout.Row>
                    }
                >
                    {/*<template slot="header">*/}
                        {/*<column span="4"><b>Company</b></column>*/}
                        {/*<column span="4"><b>Name</b></column>*/}
                        {/*<column span="4"><b>E-Mail</b></column>*/}
                    {/*</template>*/}
                    {/*<template scope="row">*/}
                        {/*<column span="4">{{row.item.company_id}}</column>*/}
                        {/*<column span="4">{{row.item.name}}</column>*/}
                        {/*<column span="4">{{row.item.email}}</column>*/}
                    {/*</template>*/}
                </Layout.List>
            </Layout.Row>
        )
    }
}
