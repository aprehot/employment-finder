import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectLogin } from './selectors';
import reducer from './reducer';
import saga from './saga';
import Login from './Login';
import { loginRequest } from './actions';

const mapDispatchToProps = (dispatch) => ({
  onSubmitForm: (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(loginRequest());
  }
});

const mapStateToProps = createStructuredSelector({
  user: makeSelectLogin()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'login', saga });

export default compose(withReducer, withSaga, withConnect)(Login);
export { mapDispatchToProps };
