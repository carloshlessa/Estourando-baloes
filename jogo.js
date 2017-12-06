var timeid = null; //variavel que armazena o valor da funcao time out


function iniciajogo(){

	var url = window.location.search;
	
	var nivel_jogo = url.replace("?","");

	var tempo_segundo = 0;



	if(nivel_jogo == 1){ // nivel facil = 120 segundos
		tempo_segundo = 120;
	}
	
	if(nivel_jogo == 2){ // nivel normal = 60 segundos
		tempo_segundo = 60;
	}

	if(nivel_jogo == 3){ // nivel dificil = 30 segundos 
		tempo_segundo = 30;
	}

	//inserindo segundo no span
	document.getElementById('cronometro').innerHTML = tempo_segundo;

	//
	var qtde_baloes = 80;

	cria_baloes(qtde_baloes);

	//imprimir qtde de baloes inteiro
	document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;
	document.getElementById('baloes_estourados').innerHTML = 0;

	contagem_tempo(tempo_segundo + 1);
}

function contagem_tempo(segundos){

	segundos = segundos - 1;

	if(segundos == -1){
		clearTimeout(timerid);//para o cronometro
		game_over();
		return false;
	}

	document.getElementById('cronometro').innerHTML = segundos;

	timerid = setTimeout("contagem_tempo("+segundos+")", 1000);

}

function game_over(){
	remove_eventos_baloes();
	alert('Voce nao conseguiu terminar a tempo');
}
function cria_baloes(qtde_baloes){
	
	for(var i = 1; i <= qtde_baloes; i++ ){

		var balao = document.createElement("img");
		balao.src = 'imagens/balao_azul_pequeno.png';
		balao.style.margin = '10px';
		balao.id = 'b' + i;
		balao.onclick = function(){ estourar(this);}

		document.getElementById('cenario').appendChild(balao);
	}
}

function estourar(e){

	var id_balao = e.id;

	document.getElementById(id_balao).setAttribute('onclick','');
	document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';

	pontuacao(-1);
}

function pontuacao(acao){

	var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
	var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;
	baloes_inteiros = parseInt(baloes_inteiros);
	baloes_estourados = parseInt(baloes_estourados);

	baloes_inteiros = baloes_inteiros + acao;
	baloes_estourados = baloes_estourados - acao;

	document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
	document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

	situacao_jogo(baloes_inteiros, baloes_estourados);
}

function situacao_jogo(baloes_inteiros, baloes_estourados){
	if (baloes_inteiros == 0) {
		alert('Parabens voce estourou todos os baloes');
		parar_jogo();
	}
}

function parar_jogo() {
	clearTimeout(timerid);
}

function remove_eventos_baloes() {
    var i = 1; //contado para recuperar balões por id
    
    //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while(document.getElementById('b'+i)) {
        //retira o evento onclick do elemnto
        document.getElementById('b'+i).onclick = '';
        i++; //faz a iteração da variávei i
    }
}

