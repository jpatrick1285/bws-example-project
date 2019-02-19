/* global site imports */

import './scss/style.scss';

import { BarbaViews } from './js/BarbaViews';
// import './js/main-nav-controller.js';
// import './js/page-transitions.js';

$(function() {
    let barbaViews = new BarbaViews();
    barbaViews.init();
});