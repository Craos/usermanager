function usuarios(cell) {

    let layoutusuario = cell.attachLayout({
        pattern: "1C",
        offsets: {
            top: 5,
            right: 10,
            bottom: 5,
            left: 10
        },
        cells: [
            {
                id: "a",
                text: "Formulário para Cadastros",
                header: true,
                width: 455,
            },
            {
                id: "b",
                header: true,
                height: 400,
            },
        ]
    });

    let tabelausuarios = layoutusuario.cells('b').attachGrid();

    layoutusuario.cells('b').setText('<label style="font-size: 14px">Encontrar por </label><input type="text" title="search" id="searchFilter" style="width: 150px"> </input>');

    tabelausuarios.setHeader("E-mail,Nome");
    tabelausuarios.enableAutoWidth(true);
    tabelausuarios.init();
    tabelausuarios.enableSmartRendering(true);
    tabelausuarios.makeFilter("searchFilter", 1);

    tabelausuarios.attachEvent("onRowSelect", function (id) {
        $.ajax({
            type: "GET",
            url: config.endpoint + '/oauth_users?verticals_uuid=eq.' + id,
            dataType: "json",
            headers: {
                Prefer: "return=representation",
                Accept: "application/vnd.pgrst.object+json"
            },
            success: function (response) {
                form_novousuario.setFormData(response);
            }
        }).fail(function (jqXHR) {
            dhtmlx.alert({
                title: 'Atenção',
                type: 'alert-error',
                text: jqXHR.responseJSON.message
            });
        });
    });

    atualizargrid();

    function atualizargrid() {

        tabelausuarios.clearAll();

        $.ajax({
            type: "GET",
            url: config.endpoint + '/oauth_users?select=verticals_uuid,username,first_name,last_name,condominio',
            dataType: "json",
            success: function (data) {
                data.filter(function (item) {
                    tabelausuarios.addRow(item.verticals_uuid, [item.username, item.first_name + ' ' + item.last_name]);
                });
            },
        }).fail(function (jqXHR) {
            dhtmlx.alert({
                title: 'Atenção',
                type: 'alert-error',
                text: jqXHR.responseJSON.message
            });
        });
    }

    // function alterarSenha(id) {

    //     let myWins = new dhtmlXWindows({
    //         image_path: "codebase/imgs/"
    //     });
    //
    //     myWins.createWindow({
    //         id: "Alterar a senha",
    //         width: 300,
    //         height: 200,
    //         center: true
    //     });
    //
    //     myWins.window("winautorizar").attachToolbar({
    //         icon_path: 'img/comandos/',
    //         items: [
    //             {id: "salvar", type: "button", text: "Salvar", img: "salvar.png"}
    //         ],
    //         onClick: function () {
    //             form.validate();
    //         }
    //     });
    //
    //     let form = myWins.window("winautorizar").attachForm(alterarsenha_form);
    //
    //     form.attachEvent("onAfterValidate", function (status) {
    //
    //         if (!status)
    //             return;
    //
    //         let tempdata = form.getFormData();
    //
    //         if (tempdata.password !== tempdata.repassword) {
    //             dhtmlx.alert({
    //                 title: 'Autorização',
    //                 type: 'alert-error',
    //                 text: 'As senhas não coicidem!'
    //             });
    //         }
    //
    //         let data = {
    //             password: tempdata.password
    //         };
    //
    //         $.ajax({
    //             type: "POST",
    //             url: config.endpoint +  '/oauth_users',
    //             dataType: "json",
    //             headers: {
    //                 Prefer: "return=representation",
    //                 Accept: "application/vnd.pgrst.object+json"
    //             },
    //             success: function () {
    //
    //                 myWins.window("winautorizar").close();
    //                 dhtmlx.alert({
    //                     title: 'Autorização',
    //                     type: 'alert',
    //                     text: 'Registrado com sucesso!'
    //                 });
    //             },
    //             data: data
    //         }).fail(function (jqXHR) {
    //             dhtmlx.alert({
    //                 title: 'Atenção',
    //                 type: 'alert-error',
    //                 text: jqXHR.responseJSON.message
    //             });
    //         });
    //
    //     });
    //
    // }

    layoutusuario.cells('a').attachToolbar({
        items: [
            {id: "novo", type: "button", text: "Novo Usuario", img: "img/adicionar.png"},
            {id: "editar", type: "button", text: "Editar", img: "img/editar.png"},
            {id: "sep1", type: "separator"},
            {id: "remover", type: "button", text: "Remover", img: "img/excluir.png"},
            {id: "alterarsenha", type: "button", text: "Alterar senha", img: "img/senha.png"},
            {id: "sep1", type: "separator"},
            {id: "concluido", type: "button", text: "Concluir Cadastro", img: "img/concluido.png"},
            {id: "sep1", type: "separator" },
            {id: "ajuda", type: "button", img: "img/info.png"},
        ],

        onClick: function (id) {
            if (id === 'concluido') {
                let concluircadastro_dados = form_novousuario.getFormData();
                concluircadastro(concluircadastro_dados, function (response) {
                    dhtmlx.message.position = "top";
                    if (response === true) {
                        dhtmlx.message("Cadastro Concluído.");
                    } else {
                        dhtmlx.message("Falha ao Cadastrar Usuário. Tente novamente.");
                    }
                });
            }
                // } else if ('alterarsenha') {
                //     alterarSenha(tabelausuarios.getSelectedRowId());
            // }
            else if(id === 'remover'){
                $.ajax({
                    type: "DELETE",
                    url: config.endpoint + '/oauth_users?verticals_uuid=eq.' + tabelausuarios.getSelectedRowId(),
                    dataType: "json",
                    headers: {
                        Prefer: "return=representation",
                        Accept: "application/vnd.pgrst.object+json"
                    },
                    success: function () {
                        atualizargrid();
                        dhtmlx.message.position="top";
                        dhtmlx.message("Registro excluido.");
                    },
                }).fail(function (jqXHR) {
                    console.debug('Ocorreu algum erro ao tentar conectar-se ao banco de dados.')
                });
            }
        },
    });

    let form_novousuario = layoutusuario.cells("a").attachForm();

    form_novousuario.loadStruct(novousuario_form);

    let concluircadastro = function(data, callback) {
        $.ajax({
            type: "POST",
            url: config.endpoint +  '/oauth_users',
            dataType: "json",
            headers: {
                Prefer: "return=representation",
                Accept: "application/vnd.pgrst.object+json"
            },
            success: function (response) {
                if (response.verticals_uuid.length > 0){
                    callback(true);
                }else{
                    callback(false);
                }
            },
            data: data
        }).fail(function (jqXHR) {
            dhtmlx.alert({
                title: 'Atenção',
                type: 'alert-error',
                text: jqXHR.responseJSON.message
            });
        });
    };
}