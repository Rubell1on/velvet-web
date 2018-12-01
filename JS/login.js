$('input[type=submit]').click(function(){
    $.post({
        url: "/login",
        type: 'POST',
        data: {login: $('input[name="login"]').val(), password: $('input[name="password"]').val()},
        // contentType: "applicatino/plain; charset=utf-8",
        dataType: 'json',
        success: function (resp) {
            alert(resp);
            localStorage.setItem("resp", JSON.stringify(resp));
            location.href = "/";
        }
        // error: function (xhr, str) {
        //     alert('Возникла ошибка: ' + xhr.responseCode);
        // }
    });
    // console.log($('input[name="login"]').val(), $('input[name="password"]').val());
});