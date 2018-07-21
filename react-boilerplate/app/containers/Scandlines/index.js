
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import H1 from 'components/H1';
import messages from './messages';
import TicketTable from './TicketTable';
import { RESTART_ON_REMOUNT } from 'utils/constants';
import 'whatwg-fetch';


export default class Scandlines extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  // Since state and props are static,
  // there's no need to re-render this component
  componentDidMount() {

    fetch('http://localhost:3500/api/scandlines', {
      method: 'GET',
    })
      .then(function (response) {
        console.log(response)
      }
      )
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Scandlines Page</title>
          <meta
            name="description"
            content="Feature page of React.js Boilerplate application"
          />
        </Helmet>
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>

      </div>
    );
  }
}
