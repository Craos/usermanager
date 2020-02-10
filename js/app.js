
/*
modelo firebase
let config = {
    login: 'https://vllibs.firebaseapp.com/oauth/index.html?a=l',
    verify: 'https://api.craos.net:8443/anoauth/rpc/oauthuser',
    tokenprovider: 'https://api.craos.net:8443/oauth/provider_access?token=eq.',
    userinfo: 'https://api.craos.net:8443/oauth/oauth_users?verticals_uuid=eq.',
    shareinfo: 'https://api.craos.net:8443/oauth/oauth_users?verticals_uuid=eq.',
};*/

let App = function() {

    let sidebar = new dhtmlXSideBar({

        parent:         document.body,
        template:       "icons",
        icons_path:     "icons/",
        single_cell:    false,
        bubble:         6,
        width:          40,
        header:         false,
        autohide:       false,
        offsets: {          // optional, offsets for fullscreen init
            top:    0,     // you can specify all four sides
            right:  0,     // or only the side where you want to have an offset
            bottom: 0,
            left:   0
        },
        items: [
            {
                id:         "Usuario",
                text:       "Usuários",
                icon:       "../img/user.png",
                selected:   true
            },
            {
                id:         "sep1",
                type:       "separator"
            },
            {
                id:         "Perfis",
                text:       "Perfis",
                icon:       "../img/perfil.png",
                selected:   false
            },
            {
                id:         "sep1",
                type:       "separator"
            },
        ]
    });

    sidebar.attachEvent("onSelect", function(id){

        let cell = sidebar.cells(id);
        if (id === 'Rastreio'){
            usuario(cell);
        }

    });

    usuario(sidebar.cells('Usuario'));

};