/**
 * Created by andrew on 11.04.14.
 */
function addFidesioSonataAdminEventListeners(updateMessagePath, writable) {

    var defaultLocation = document.location;

    $('#config').on('change', 'select', function () {
        $(this).closest('form').submit();
    });

    if (writable) {
        $('#addTranslation').on('click', function (e) {
            e.preventDefault();
            var form = $(this).closest('form');
            $.ajax({
                type: 'POST',
                headers: {'X-HTTP-METHOD-OVERRIDE': 'PUT'},
                url: form.attr('action'),
                data: {
                    '_method': 'PUT',
                    'message': form.find('#newTranslationMessage').val(),
                    'id': form.find('#newTranslationId').val()
                },
                beforeSend: function () {
                    form.children('.alert-message').remove();
                },
                error: function () {
                    form.append('<span class="label label-important alert-message">Could not be saved.</span>');
                },
                success: function () {
                    form.append('<span class="label label-success alert-message">Translation was saved.</span>');
                },
                complete: function () {
                    $(self).data('timeoutId', setTimeout(function () {
                        $(self).data('timeoutId', undefined);
                        form.children('.alert-message').fadeOut(300, function () {
                            $(this).remove();
                        });
                    }, 10000));
                }
            })
        });
        $('#clearCache').on('click', function (e) {
            e.preventDefault();
            var btn = $(this);
            $.ajax({
                type: 'POST',
                url: $(this).attr('href'),
                data: {
                    '_method': 'POST'
                },
                beforeSend: function () {
                    btn.parent().children('.alert-message').remove();
                },
                error: function () {
                    btn.parent().append('<span class="label label-important alert-message">Cache NOT cleared.</span>');
                },
                success: function () {
                    btn.parent().append('<span class="label label-success alert-message">Cache cleared.</span>');
                },
                complete: function () {
                    $(self).data('timeoutId', setTimeout(function () {
                        $(self).data('timeoutId', undefined);
                        $(this).parent().children('.alert-message').fadeOut(300, function () {
                            $(this).remove();
                        });
                    }, 10000));
                }
            })
        });

        $('[data-transaltions-container] textarea')
            .blur(function () {
                var self = this;
                $.ajax(updateMessagePath + '?id=' + encodeURIComponent($(this).data('id')), {
                    type: 'POST',
                    headers: {'X-HTTP-METHOD-OVERRIDE': 'PUT'},
                    data: {'_method': 'PUT', 'message': $(this).val()},
                    beforeSend: function () {
                        $(self).parent().closest('td').prev('td').children('.alert-message').remove();
                    },
                    error: function () {
                        $(self).parent().closest('td').prev('td').append('<span class="label label-important alert-message">Could not be saved.</span>');
                    },
                    success: function () {
                        $(self).parent().closest('td').prev('td').append('<span class="label label-success alert-message">Translation was saved.</span>');
                    },
                    complete: function () {
                        var parent = $(self).parent();
                        $(self).data('timeoutId', setTimeout(function () {
                            $(self).data('timeoutId', undefined);
                            parent.closest('td').prev('td').children('.alert-message').fadeOut(300, function () {
                                $(this).remove();
                            });
                        }, 10000));
                    }
                });

            })
            .focus(function (e) {
                e.preventDefault();
                this.select();
                var timeoutId = $(this).data('timeoutId');
                if (timeoutId) {
                    clearTimeout(timeoutId);
                    $(this).data('timeoutId', undefined);
                }

                $(this).parent().children('.alert-message').remove();
            }).mouseup(function (e) {
                e.preventDefault();
            }).keyup(function (e) {
                if (e.keyCode == 9) {
                    //Tab key
                    e.preventDefault();
                    this.select();
                }
            });

        $('.remove_translation').on('click', function (e) {
            e.preventDefault();
            var btn = $(this);
            var confirmed = confirm('Are you sure you want to delete this translation?');
            if (confirmed == true) {
                $.ajax({
                    type: 'POST',
                    url: $(this).attr('href'),
                    data: {
                        '_method': 'POST',
                        'id': btn.data('id')
                    },
                    beforeSend: function () {
                        btn.parent().children('.alert-message').remove();
                    },
                    error: function () {
                        btn.parent().append('<span class="label label-important alert-message">Not removed</span>');
                    },
                    success: function () {
                        btn.closest('.translation-row').fadeOut('slow', function () {
                            $(this).remove();
                        });
                    }
                })
            }
        });
    }

    $('body').on('click', '.show_spoiler', function (e) {
        e.preventDefault();
        var block = $(this).closest('.spoiler_block');
        var target = block.find('.spoiler');
        target.slideToggle();
    });

    $('[data-download]').on('click', function () {
        document.location = defaultLocation;
    });
}
