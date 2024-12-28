Lógica

Tela inicial
- Registrar jogador e resgata token, saldo de 10000 (FEITO)

Ação de sair do jogo
- Exclui usuário e conta (FEITO)

Iniciar jogo
- Verifica saldo do usuário com valor da aposta
- Define quantas minas terá no mapa, quanto mais... maior a odd por acerto
- abre conexão socket da aposta
- se B.O no socket, encerra aposta, sem afetar saldo do usuário

Usuário fez jogada
- Manda message para socket para ver o resultado daquele quadrado

Usuário ganhou
- Pega a odd atual, pega o valor da aposta e realiza a multiplicação
- fecha conexão com socket da aposta

Usuário perdeu
- Subtrai a valor da aposta do usuário e finaliza o jogo