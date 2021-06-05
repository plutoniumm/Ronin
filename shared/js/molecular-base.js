const formatDuration = ms => {
    if ( ms < 0 ) ms = -ms;
    const time = {
        day: Math.floor( ms / 86400000 ),
        hour: Math.floor( ms / 3600000 ) % 24,
        minute: Math.floor( ms / 60000 ) % 60,
        second: Math.floor( ms / 1000 ) % 60,
        millisecond: Math.floor( ms ) % 1000
    };
    return Object.entries( time )
        .filter( val => val[ 1 ] !== 0 )
        .map( ( [ key, val ] ) => `${ val } ${ key }${ val !== 1 ? 's' : '' }` )
        .join( ', ' );
};

// Examples
// formatDuration( 1001 ); // '1 second, 1 millisecond'
// formatDuration( 34325055574 );
// '397 days, 6 hours, 44 minutes, 15 seconds, 574 milliseconds'

const sleep = ( ms ) =>
    new Promise( resolve => setTimeout( resolve, ms ) );
// const printNums = async () => {
//     console.log( 1 );
//     await sleep( 500 );
//     console.log( 2 );
//     console.log( 3 );
// };

// printNums(); // Logs: 1, 2, 3 (2 and 3 log after 500ms)

const copyToClipboard = str => {
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
// Examples
// copyToClipboard( 'Lorem ipsum' ); // 'Lorem ipsum' copied to clipboard.

const hashBrowser = val =>
    crypto.subtle
        .digest( 'SHA-256', new TextEncoder( 'utf-8' ).encode( val ) )
        .then( h => {
            let hexes = [],
                view = new DataView( h );
            for ( let i = 0;i < view.byteLength;i += 4 )
                hexes.push( ( '00000000' + view.getUint32( i ).toString( 16 ) ).slice( -8 ) );
            return hexes.join( '' );
        } );
Examples
// hashBrowser(
//     JSON.stringify( { a: 'a', b: [ 1, 2, 3, 4 ], foo: { c: 'bar' } } )
// ).then( console.log );
// // '04aa106279f5977f59f9067fa9712afc4aedc6f5862a8defc34552d8c7206393'

const parseCookie = str =>
    str
        .split( ';' )
        .map( v => v.split( '=' ) )
        .reduce( ( acc, v ) => {
            acc[ decodeURIComponent( v[ 0 ].trim() ) ] = decodeURIComponent( v[ 1 ].trim() );
            return acc;
        }, {} );
// Examples
// parseCookie('foo=bar; equation=E%3Dmc%5E2');
// // { foo: 'bar', equation: 'E=mc^2' }