export default function () {

  // if the string contains urls, replace them with anchor tags
  return function (text) {

    if (typeof (text) !== "string") return text;

    // regex from: https://gist.github.com/jakemmarsh/6008983
    const regexHasHttp = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    const regexNonHttp = /(^|[^\/])(www\.[\S]+(\b|$))/gim;

    text = text.replace(regexHasHttp, "<a href=\"$1\" target=\"_blank\">$1</a>");
    text = text.replace(regexNonHttp, "$1<a href=\"http://$2\" target=\"_blank\">$2</a>");

    return text;
  };
}
