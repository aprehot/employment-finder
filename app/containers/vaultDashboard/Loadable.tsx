/**
 * Asynchronously loads the component for HomePage
 */
const Loadable = require('react-loadable');

import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';

export default Loadable({
  loader: () => import('./index'),
  loading: LoadingIndicator,
});
