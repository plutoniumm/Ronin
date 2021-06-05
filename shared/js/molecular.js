const dec2hex = ( dec ) => dec.toString( 16 ).padStart( 2, "0" );

// generateId :: Integer -> String
const randomString = ( len ) => {
    let arr = new Uint8Array( ( len || 40 ) / 2 )
    window.crypto.getRandomValues( arr )
    return Array.from( arr, dec2hex ).join( '' )
}

const req = {
    get,
    post,
    put,
    delete: _delete
};

function get ( url ) {
    const requestOptions = {
        method: 'GET'
    };
    return fetch( url, requestOptions ).then( handleResponse );
}

function post ( url, body ) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( body )
    };
    return fetch( url, requestOptions ).then( handleResponse );
}

function put ( url, body ) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( body )
    };
    return fetch( url, requestOptions ).then( handleResponse );
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete ( url ) {
    const requestOptions = {
        method: 'DELETE'
    };
    return fetch( url, requestOptions ).then( handleResponse );
}

// helper functions

function handleResponse ( response ) {
    return response.text().then( text => {
        const data = text && JSON.parse( text );
        if ( !response.ok ) {
            const error = ( data && data.message ) || response.statusText;
            return Promise.reject( error );
        }
        return data;
    } );
}

const debounce = function ( func, wait, immediate ) {
    let timeout;
    return () => {
        let context = this,
            args = arguments;
        let later = function () {
            timeout = null;
            if ( !immediate ) func.apply( context, args );
        };
        let callNow = immediate && !timeout;
        clearTimeout( timeout );
        timeout = setTimeout( later, wait );
        if ( callNow ) func.apply( context, args );
    };
};