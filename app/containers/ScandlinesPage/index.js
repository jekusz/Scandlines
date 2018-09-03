import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectDepartures
} from './selectors';
import { loadDepartures, eraseDepartures } from './actions';
import reducer from './reducer';
import saga from './saga';
import ScandlinesPage from './ScandlinesPage';

const mapDispatchToProps = (dispatch) => ({
  onLoadDepartures: (formValues) => {
    dispatch(eraseDepartures())
    dispatch(loadDepartures(formValues))}
});

const mapStateToProps = createStructuredSelector({
  departures: makeSelectDepartures(),
  loading: makeSelectLoading(),
  error: makeSelectError()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'scandlines', reducer });
const withSaga = injectSaga({ key: 'scandlines', saga });

export default compose(withReducer, withSaga, withConnect)(ScandlinesPage);
export { mapDispatchToProps };
