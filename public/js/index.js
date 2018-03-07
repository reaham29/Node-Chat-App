var socket = io();

socket.on ('connect', function() {
    console.log('User connected');
});

socket.on ('newMessage', function (Msg) {
    console.log ('message received:', Msg);

    var li = jQuery('<li></li>');
    li.text(`${Msg.from} : ${Msg.text}`);

    jQuery('#messages').append(li);
});

socket.on ('disconnect', function() {
    console.log('User disconnected');
});

// socket.emit ('createMessage', {
//     from : "Reaham",
//     text : "Sending Msg"
// }, function (ackMsg) {
//     console.log ('At client :', ackMsg);
// });

jQuery('#msg-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit ('createMessage', {
        from : "User",
        text : jQuery('[name=msg]').val()
    }, function (ackMsg) {

    });
});