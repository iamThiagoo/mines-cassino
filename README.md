Lógica

Tela inicial
- Registrar jogador e resgata token, saldo de 10000 (FEITO)

Ação de sair do jogo
- Exclui usuário e conta (FEITO)

Iniciar jogo
- Verifica saldo do usuário com valor da aposta (FEITO)
- Define quantas minas terá no mapa, quanto mais... maior a odd por acerto (FEITO)
- abre conexão socket da aposta (FEITO)
- se B.O no socket, encerra aposta, sem afetar saldo do usuário (Não será necessário)

Usuário fez jogada
- Manda message para socket para ver o resultado daquele quadrado (FEITO)

Usuário ganhou
- Pega a odd atual, pega o valor da aposta e realiza a multiplicação (FEITO)
- fecha conexão com socket da aposta (FEITO)

Usuário perdeu
- Subtrai a valor da aposta do usuário e finaliza o jogo (FEITO)

ODDs (Stake):
0 = 1.00x
1 = 1.13x
2 = 1.29x
3 = 1.48x
4 = 1.71x
5 = 2.00x
6 = 2.35x
7 = 2.79x
8 = 3.35x
9 = 4.07x
10 = 5.00x
11 = 6.26x
12 = 7.96x
13 = 10.35x
14 = 13.80x
15 = 18.97x
16 = 27.11x
17 = 40.66x
18 = 65.06x
19 = 113.85x
20 = 227.7x
21 = 569.3x
22 = 2277x