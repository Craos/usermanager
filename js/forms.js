let novousuario_form = [
    {type:"settings", position:"label-left", offsetLeft: 10, labelWidth:150,  labelAlign: "left",  inputWidth:200, inputLeft:97, inputTop:110,},
    {type: "block", width: 100, list:[
    {type: "input", name:"first_name", label:"Nome: ", required: true}, {type: "input", name:"last_name", label:"Sobrenome: ", required: true},
    {type: "input", name:"username", label:"Endereço de e-mail: ", required: true},
    // {type: "input", name:"form_condominio", label:"Condominio: ", value: "Anima Clube", required: true},
        ]},
];

let alterarsenha_form = [
    {type:"settings", position:"label-left", offsetLeft: 10, labelWidth:150,  labelAlign: "left",  inputWidth:200, inputLeft:97, inputTop:110,},
    {type: "password", name:"password", label:"Senha: ", required: true},
    {type: "password", name:"repassword", label:"Confirme: ", required: true}
];