/* global site imports */

import './scss/style.scss';

import { BarbaViews } from './js/BarbaViews';

$(function() {
    let barbaViews = new BarbaViews();
    barbaViews.init();
});