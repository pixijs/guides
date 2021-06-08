(function () {
    var pathname = document.location.pathname;
    if (pathname.endsWith('/')) {
        pathname += 'index.html';
    }
    var link = document.querySelector('.explorer-wrapper a[href="' + pathname + '"]');
    if (link) {
        link.classList.add('selected');
    }
  })();