require('@rails/ujs').start();
// require("turbolinks").start()
require('@rails/activestorage').start();
require('channels');

const componentRequireContext = require.context('apps/application', true);
const ReactRailsUJS = require('react_ujs');
ReactRailsUJS.useContext(componentRequireContext);
