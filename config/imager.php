<?php 

return [

    // All environments
    '*' => [
        'filenamePattern' => '{basename}_{transformString|shorthash}.{extension}'
    ],

    // Live (production) environment
    'live'  => [
    ],

    // Staging (pre-production) environment
    'staging'  => [
    ],

    // Local (development) environment
    'local'  => [
    ],
];
