# Game Design Document

Revision: 0.0.1


> GDD Template Written by: Benjamin “HeadClot” Stanley


- Overview
  - Theme / Setting / Genre - Espaço sideral, guerra galáctica e ação

  - Core Gameplay Mechanics Brief - Desviar de obstáculos, coletar itens, atirar em inimigos

  - Targeted platforms - Celular (mobile)

  - Monetization model (Brief/Document) - Venda de skins novas e dlcs 

  - Project Scope - pequeno porte, com dois devs

  - Influences (Brief)
    - <Subway Surfers #1>
    - <Duck Hunt #2>
    - <God of war 2 #3>
    - <Subnautica #4>
    - <Doom #5>

  - The elevator Pitch - 

Um jogo de ação onde um Piloto e Atirador controlam a mesma nave em tempo real. Enquanto o piloto desvia de obstáculos em fases geradas aleatoriamente, o atirador elimina perseguidores antes que destruam a nave.

  - Project Description (Brief): um jogo de pequeno porte para plataforma mobile.

  - Project Description (Detailed): jogo com duas fases, cada uma dividida em 20 seções com obstáculos posicionados aleatoriamente. Um jogador navega entre os obstáculos e coleta combustível, enquanto o outro atira em inimigos. A munição tem tempo de recarregamento de um segundo. Telas de morte: colisão com obstáculo, três acertos dos inimigos na nave, falta de combustível, saída do mapa.

- What sets this project apart?

  - Core Gameplay Mechanics (Detailed)
    - <Light Gun Shooter, On-Rails #1>
    - <Multi-Axis Lane System #2>
    - <Core Gameplay Mechanic #3>
    - <Core Gameplay Mechanic #4>

- Story and Gameplay

  - Story (Brief) - Dois batedores humanos são surpreendidos por naves alienígenas do exército inimigo e precisam fugir antes que sua nave consiga ser destruída 
  - Story (Detailed) - Os protagonistas estavam fazendo seu trabalho de batedor, quando descobrem que as tropas inimigas estavam muito mais próximas que o esperado. Eles começam uma manobra evasiva, mas o tanque de combustível da nave é atingido. Nada explode, mas o combustível da nave começa a vazar e a única opção para despistar os aliens é se embrenhar em um campo de asteroides, enquanto o motor de teleporte da nave carrega. O piloto da nave precisa desviar de asteroides e coletar combustível enquanto o atirador se defende das naves inimigas. Assim que eles saem do campo de asteroides, surge uma minhoca espacial gigante que engole a nave. Dentro da minhoca tem destroços de naves que foram comidas, e o atirador precisa acertar parasitas que vivem ali dentro. Ao final da minhoca, eles finalmente conseguem se teletransportar para um local seguro.

  - Gameplay (Brief)
    Ser atingido por um asteroide é morte instantânea, mas ser atingido pelos aliens não. Ficar sem combustível também acaba o jogo, assim como bater nos destroços dentro da minhoca. A vida da nave e combustível são indicados por três lâmpadas.
  - Gameplay (Detailed)
Dois núcleos de Gameplay com impacto direto no outro, o primeiro nomeado como atirador e o segundo como piloto. 
  -O primeiro núcleo, possui uma visão fixa em estilo cockpit, com o jogador controlando através de botões a mira de uma arma para atirar em inimigos perseguidores que se aproximam até determinada distância e disparam contra a nave. Caso o atirador falhe em atirar nos perseguidores e eles consigam disparar contra a nave, em 3 disparos contra a nave, o jogo acaba. A mira do atirador é afetada pelos movimentos do piloto, presente no núcleo dois, e influenciando na movimentação dele, adicionando um “drift” nos controles dele, para representar a danificação dos motores.
 -O segundo núcleo, nomeado como piloto, com o jogador tendo visão de um “volante” da nave e de um campo de obstáculos (asteroides ou estruturas internas). Ele deve através de um joystick, controlar a movimentação da nave através de um campo de obstáculos gerados aleatoriamente por 3 fases, de 5 minutos cada. a movimentação da nave estará limitada em um campo de 8x8, onde a nave ocupa um espaço 2x2. durante a movimentação do piloto, a mira do atirador, será forçadamente movimentada no sentido oposto a movimentação. Em caso de colisão com qualquer obstáculo, a nave será destruída e o jogo acabará.
- Assets Needed
  - 2D- espaçonave, cockpit(atirador e piloto), laser da arma, naves inimigas, minhoca, asteróides, combustível, background espaço e interior do leviatã, balão de fala, vida da nave e nível de combustível 
 - Sound: tiros, background, movimentação, coleta do combustível, colisão (asteroide e tiros), diálogo, menu

  - Code:
-Piloto: Geração de objetos, em posição aleatória em um espaço 8x8, com velocidade de geração que aumenta exponencialmente.
movimentação da nave controlada pelo piloto, nesse mesmo espaço, e que caso a nave ocupe o mesmo espaço que um obstáculo, o fim de jogo é causado.
Drift da nave, caso ela seja atingida por inimigos do atirador, sendo equivalente a meia indicação por segundo em 1 disparo, a uma indicação por segundo em 2 disparos.
contagem de tempo de 5min, para uma pausa de 30 segundos.
Colisão com objeto especial, nomeado como buraco para obter a vitória e tijolos.
-Atirados: Geração de objetos  


  - Animation: explosão nava perseguidora, colisão frontal com obstáculo( variação asteroide e leviatã), disparo do cockpit, movimentação(cima, baixo, direita, esquerda), movimentação da arma do cockpit;
- Schedule
  - <Cenário #1>
  - <Assets #2>
  - <Aplicação #3>
  - <Teste #4>
