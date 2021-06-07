export function encodeHTML(html) {
  return html.replace(/[<>&"]/g, function (c){
    return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c];
  });
}

export function decodeHTML(txt) {
  let arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
  return txt.replace(/&*(lt|gt|nbsp|amp|quot);/ig, function (all,t){
    return arrEntities[t];
  });
}