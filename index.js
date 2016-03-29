function setAngle(e,angle) {
    e.css('transform','rotateX('+angle+'deg)'); // jQuery 1.8.0以降はベンダープレフィックスを自動で付けてくれる
}
// dir: 0:0→90度、1:90→0度
function animate(e,dir,ms) {
    const div = 9; /* 分割数 */
    for (var i = 0; i<=div; i++) {
        (function(i) {
            setTimeout(function() {
                setAngle(e,dir ? 90/div*i : 90/div*(div-i));
            },ms/div*i);
        })(i);
    }
}
function fmt2(n) {
    return ('0'+n).slice(-2);
}
$(function() {
    var cnt = 0;
    const ms = 100; // 50～990(ミリ秒)
    var e;

    $('#hour').each(function() {
        var e = $(this);
        setAngle(e.find('.bottom2'),90);
        e.find('.bottom' ).text(fmt2(23));
        e.find('.bottom2').text(fmt2( 0)); // 回転する方
        animate(e.find('.bottom2'),false,990);
    });
    $('#min,#sec').each(function() {
        var e = $(this);
        setAngle(e.find('.bottom2'),90);
        e.find('.bottom' ).text(fmt2(59));
        e.find('.bottom2').text(fmt2( 0)); // 回転する方
        animate(e.find('.bottom2'),false,990);
    });

    e = $('#sec');
    setAngle(e.find('.top2'),0);
    setAngle(e.find('.bottom2'),90);
    setInterval(function() {
        setAngle(e.find('.top2'),0);
        e.find('.top' ).text(fmt2((cnt+1)%60));
        e.find('.top2').text(fmt2( cnt   %60)); // 回転する方
        animate(e.find('.top2'),true,ms);
        (function(cnt) {
            setTimeout(function() {
                setAngle(e.find('.bottom2'),90);
                e.find('.bottom' ).text(fmt2( cnt   %60));
                e.find('.bottom2').text(fmt2((cnt+1)%60)); // 回転する方
                animate(e.find('.bottom2'),false,ms);
            },ms);
        })(cnt);
        cnt++;
    },1000);
});
