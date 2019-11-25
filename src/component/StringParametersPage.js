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


            this.props.store.getAll();
        }

        handleChange(event, newValue) {
            this.setState((state) => {
                return { value: newValue }
            });
        };

        render() {
            // uses hooks functional api... 
            //const classes = useStyles();


            const { store } = this.props;
            return (
                <Paper style={rootStyle} >
                    <MaterialTable

                        title="String Parameters"
                        columns={[
                            { title: 'Pid', field: 'Pid', defaultGroupOrder: 0 },
                            { title: 'Id', field: 'Id' },
                            { title: 'Value', field: 'Value' },
                        ]}
                        data={store.all}
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
