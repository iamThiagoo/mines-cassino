# 💣 Mines - Cassino  

Esse repositório contém minha versão do jogo **Mines** inspirado na versão de jogos de azar de alguns cassinos.

## 🎮 Sobre o Jogo  
No Mines, os jogadores escolhem células em uma grade para evitar minas escondidas e ganhar multiplicadores. Cada célula segura aumenta os ganhos potenciais, mas o risco de encontrar uma mina também cresce.  

Este projeto foi criado para explorar e recriar a dinâmica e a estratégia de um jogo de cassino moderno. Se for testar, não espere ganhar dinheiro no final, ok? ... também gostaria 😅

---

## 🚀 Tech's
- NestJS (Jest)
- AstroJS
- MongoDB
- Docker
- Socket.io

---

## ▶️ Rodar a aplicação

1. Garanta de ter o Docker e Docker Compose na sua máquina.
2. Rode todas as aplicações com o comando:
    ```bash
    docker-compose up -d
    ```
3. Este comando irá subir todos os containers necessários para rodar todo o projeto

---

## 📊 Estratégia das ODD's 
A estratégia usada para a definição das odds segue o modelo/multiplicador padrão da Stake (casa de aposta usada como consulta). Cada número de acertos corresponde a um multiplicador de recompensa. 

| Acertos | Odd        | Acertos | Odd        |  
|:------|:------|:------:|------:|    
| 0       | 1.00x      | 12      | 7.96x      | 
| 1       | 1.13x      | 13      | 10.35x     |     
| 2       | 1.29x      | 14      | 13.80x     | 
| 3       | 1.48x      | 15      | 18.97x     | 
| 4       | 1.71x      | 16      | 27.11x     |
| 5       | 2.00x      | 17      | 40.66x     |  
| 6       | 2.35x      | 18      | 65.06x     |     
| 7       | 2.79x      | 19      | 113.85x    | 
| 8       | 3.35x      | 20      | 227.7x     |   
| 9       | 4.07x      | 21      | 569.3x     | 
| 10      | 5.00x      | 22      | 2277x      |  
| 11      | 6.26x      |
