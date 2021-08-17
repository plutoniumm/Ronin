const ƒ = ( x ) => document.querySelector( x );
const ƒA = ( x ) => [ ...document.querySelectorAll( x ) ];

window.onerror = function ( msg, url, lineNo, columnNo, error ) {
    console.log( msg, url, lineNo, columnNo, error );
    fetch( 'https://ronin.host:1871/error/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( {
            msg,    // error message
            url,    // url of error
            line: lineNo, // line number of error
            column: columnNo, // column number of error
            error   // error object
        } )
    } );
    return false;
}

const hashBrowser = val => // takes in string and returns has promise
    crypto.subtle
        .digest( 'SHA-256', new TextEncoder( 'utf-8' ).encode( val ) )
        .then( h => {
            let hexes = [],
                view = new DataView( h );
            for ( let i = 0;i < view.byteLength;i += 4 )
                hexes.push( ( '00000000' + view.getUint32( i ).toString( 16 ) ).slice( -8 ) );
            return hexes.join( '' );
        } );

const parseCookie = str => //takes in cookie string (value of cookie)
    str
        .split( ';' )
        .map( v => v.split( '=' ) )
        .reduce( ( acc, v ) => {
            acc[ decodeURIComponent( v[ 0 ].trim() ) ] = decodeURIComponent( v[ 1 ].trim() );
            return acc;
        }, {} );

const copyToClipboard = str => { //takes in raw string
    const el = document.createElement( 'textarea' );
    el.value = str;
    el.setAttribute( 'readonly', '' );
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild( el );
    const selected =
        document.getSelection().rangeCount > 0
            ? document.getSelection().getRangeAt( 0 )
            : false;
    el.select();
    document.execCommand( 'copy' );
    document.body.removeChild( el );
    if ( selected ) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange( selected );
    }
};

const String2HTML = str => str.replace(
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

const HTML2String = str => str.replace(
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

const truthy = condition => condition ? true : false;