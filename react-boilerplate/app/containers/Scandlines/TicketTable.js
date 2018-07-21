export default class TicketTable extends React.Component {
    // eslint-disable-line react/prefer-stateless-function
    // Since state and props are static,
    // there's no need to re-render this component

    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {
        getDataFromScandlines();
    }

    getDataFromScandlines() {

    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Feature Page</title>
                    <meta
                        name="description"
                        content="Feature page of React.js Boilerplate application"
                    />
                </Helmet>
                <H1>
                    <table style="width:100%">
                        <tr>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Age</th>
                        </tr>
                        <tr>
                            <td>Jill</td>
                            <td>Smith</td>
                            <td>50</td>
                        </tr>
                        <tr>
                            <td>Eve</td>
                            <td>Jackson</td>
                            <td>94</td>
                        </tr>
                    </table>
                </H1>
            </div>
        );
    }
}
