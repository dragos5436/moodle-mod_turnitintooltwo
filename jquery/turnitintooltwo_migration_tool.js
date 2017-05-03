$(document).ready(function(){

    // only display the modal during a manual migration.
    if ($("#migrate_type").data("migratetype") == 1) {
        $.colorbox({width: 500, height: 500, inline:true, opacity: "0.7", href:"#migration_alert",
        onLoad: function() {
            lightBoxCloseButton();
        },
        onCleanup:function() {
            $('#tii_close_bar').remove();
            $('#migration_alert').hide();
        }});
        $('#migration_alert').show();
    } else {
        migrate($("#migrate_type").data("courseid"), $("#migrate_type").data("turnitintoolid"));
    }
}); 

$('.migrate_link').click(function() {
    migrate($(this).data("courseid"), $(this).data("turnitintoolid"));
});

$('.dontmigrate_link').click(function () {
    $.colorbox.close();
    $('#migration_alert').hide();
});

function migrate(courseid, turnitintoolid) {
    $.ajax({
        "dataType": 'json',
        "type": "POST",
        url: M.cfg.wwwroot + "/mod/turnitintooltwo/ajax.php",
        "data": {action: "begin_migration", courseid: courseid, turnitintoolid: turnitintoolid, sesskey: M.cfg.sesskey},
        success: function(data) {
            if ($.colorbox) {
                $.colorbox.close();
            }
            $('#migration_alert').hide();
            window.location.href = M.cfg.wwwroot + "/mod/turnitintooltwo/view.php?id="+data.id;
        }
    });
}

function lightBoxCloseButton() {
    $('body').append('<div id="tii_close_bar"><a href="#" onclick="$.colorbox.close(); return false;">' + M.str.turnitintooltwo.closebutton + '</a></div>');
}
