//Dados que vão ser armazenado após o login
export const TOKEN_CHAVE = '&app-token';
export const ID_USUARIO = '&id-usuario';
export const NOME_USUARIO = '&nome-usuario';
export const STATUS = '&status';
export const CPF_USUARIO = '&cpf-usuario';

export const loginToken = token => { localStorage.setItem(TOKEN_CHAVE,token); }
export const desconectar = () => { localStorage.clear() };

export const setarIdUsuario = id => localStorage.setItem(ID_USUARIO,id);
export const pegarIdUsuario = () => localStorage.getItem(ID_USUARIO);

export const setarStatus = status => localStorage.setItem(STATUS,status);
export const pegarStatus = () => localStorage.getItem(STATUS);

export const setarNomeUsuario = nome => localStorage.setItem(NOME_USUARIO,nome);
export const pegarNomeUsuario = () => localStorage.getItem(NOME_USUARIO);


export const setarCpf = cpf => localStorage.setItem(CPF_USUARIO,cpf);
export const pegarCpf = () => localStorage.getItem(CPF_USUARIO);


export const pegarToken = () => localStorage.getItem(TOKEN_CHAVE)