import React from 'react';

import { makeStyles } from '@material-ui/core/styles';


import Paper from '@material-ui/core/Paper';



import MaterialTable from 'material-table'


// import { observable, computed } from "mobx"
import { observer } from "mobx-react"

const useStyles = makeStyles({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
});

const rootStyle = {
    width: '100%',
    overflowX: 'auto',
};

const tableStyle = {
    minWidth: 650,
};

const PartnersPage = observer(
    class PartnersPage extends React.Component {
        constructor(props) {
            super(props);

            this.handleChange = this.handleChange.bind(this);
            this.state = { value: 0 };


            let self = this;
            setTimeout(function () {
                self.props.store.getAll();
            }, 2000);
        }

        handleChange(event, newValue) {
            this.setState((state) => {
                // Important: read `state` instead of `this.state` when updating.
                return { value: newValue }
            });
        };

        render() {
            const { store } = this.props;
            return (
                <Paper style={rootStyle} >
                    <MaterialTable

                        title="Partners"
                        columns={[
                            { title: 'Pid', field: 'Pid', defaultGroupOrder: 0 },
                            { title: 'Agency', field: 'Agency' },
                            { title: 'Scheme', field: 'Scheme' },
                            { title: 'Id', field: 'Id' },
                        ]}
                        data={store.partnersList}
                        options={{
                            grouping: true,
                            paging: false,
                        }}
                    />
                </Paper>
            );
        }
    })



export default PartnersPage;
