const ƒ = ( x ) => document.querySelector( x );
const ƒA = ( x ) => [ ...document.querySelectorAll( x ) ];

const escape = str => str.replace(
    /[&<>'"]/g,
    tag =>
    ( {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[ tag ] || tag )
);

const unescape = str => str.replace(
    /&amp;|&lt;|&gt;|&#39;|&quot;/g,
    tag =>
    ( {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&#39;': "'",
        '&quot;': '"'
    }[ tag ] || tag )
);

Object.prototype.toString = function () { return `${ JSON.stringify( this ) }` };

const getµ = () => {
    const entries = new URLSearchParams( window.location.search ).entries();
    const params = {};
    for ( let entry of entries ) params[ entry[ 0 ] ] = entry[ 1 ];
    return params;
};

const setµ = ( key, value ) => {
    let searchParams = new URLSearchParams( window.location.search );
    searchParams.set( key, value );
    let newURL = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
    window.history.pushState( { path: newURL }, '', newURL );
};

const thread = fn => {
    const worker = new Worker(
        URL.createObjectURL(
            new Blob( [ `postMessage((${ fn })());` ] ),
            { type: 'application/javascript; charset=utf-8' }
        )
    );
    return new Promise( ( res, rej ) => {
        worker.onmessage = ( { data } ) => {
            res( data ), worker.terminate();
        };
        worker.onerror = err => {
            rej( err ), worker.terminate();
        };
    } );
};

const onClickOutside = ( element, callback ) => {
    document.addEventListener( 'click', e => {
        if ( !element.contains( e.target ) ) callback();
    } );
};