import axios from 'axios';
window.axios = axlsios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
