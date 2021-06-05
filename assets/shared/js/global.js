export const URLpars = () => {
    const entries = new URLSearchParams( window.location.search ).entries();
    const params = {};
    for ( let entry of entries ) params[ entry[ 0 ] ] = entry[ 1 ];
    return params;
}
export const chURL = ( key, value ) => {
    let searchParams = new URLSearchParams( window.location.search );
    searchParams.set( key, value );
    let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
    window.history.pushState( { path: newurl }, '', newurl );
}