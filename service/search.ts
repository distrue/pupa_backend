export function viewTitle(src: string) {
    if(src.match(/.*\./) !== null)  src = String(src.match(/.*\./)); 
    return src.replace(/(\.|\")/gi,"");
};

export function searchTitle(src: string) {
    src = src.replace(/\"/gi, "");
    if( String( src.match(/^[가-힣|a-z|A-Z|\s]*/) ) !== null) {
        src = String( src.match(/^[가-힣|a-z|A-Z|\s]*/) );
    }
    return src;
};
