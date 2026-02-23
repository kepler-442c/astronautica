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

  - Project Description (Brief): um jogo de pequeno porte para plataforma mobile, 

  - Project Description (Detailed)

- What sets this project apart?

  - Core Gameplay Mechanics (Detailed)
    - <Light Gun Shooter, On-Rails #1>
    - <Multi-Axis Lane System #2>
    - <Core Gameplay Mechanic #3>
    - <Core Gameplay Mechanic #4>

- Story and Gameplay

  - Story (Brief) - Dois batedores humanos são surpreendidos por naves alienígenas do exército inimigo e precisam fugir antes que sua nave consiga ser destruída 
  - Story (Detailed) - Os protagonistas estavam fazendo seu trabalho de batedor, quando descobrem que as tropas inimigas estavam muito mais próximas que o esperado. Eles começam uma manobra evasiva, mas o tanque de combustível da nave é atingido. Nada explode, mas o combustível da nave começa a vazar e a única opção para despistar os aliens é se embrenhar em um campo de asteroides, já que a nave dos protagonistas é pequena o suficiente. O piloto da nave precisa desviar de asteroides e coletar combustível enquanto o atirador se defende das naves inimigas. Assim que eles saem do campo de asteroides, surge uma minhoca espacial gigante que engole a nave. Dentro da minhoca ainda tem asteroides (porque ela come asteroides), e o atirador precisa acertar determinadas áreas destacadas vezes o suficiente para a minhoca vomitar a nave. Quando eles passam pelo buraco de minhoca (a boca) eles aparecem novamente no início do jogo.

  - Gameplay (Brief)
    Ser atingido por um asteroide é morte instantânea, mas ser atingido pelos aliens não. Ficar sem combustível tbm acaba o jogo, assim como bater no lado de dentro da minhoca, podendo ser por falta de controle do piloto ou porque o atirador não acertou o suficiente as áreas marcadas.
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
contagem de tempo de 5min, para um pausa de 30 segundos.
Colisão com objeto especial, nomeado como buraco para obter a vitoria e tijolos.
-Atirados: Geração de objetos  


  - Animation: explosão nava perseguidora, colisão frontal com obstáculo( variação asteroide e leviatã), disparo do cockpit, movimentação(cima, baixo, direita, esquerda), movimentação da arma do cockpit;
- Schedule
  - <Object #1>
  - <Object #2>
  - <Object #3>
  - <Object #4>


# Overview


## Theme / Setting / Genre

<Insert Theme here>

## Core Gameplay Mechanics Brief

  - <Gameplay Mechanic #1>
  - <Gameplay Mechanic #2>
  - <Gameplay Mechanic #3>
  - <Gameplay Mechanic #4>

## Targeted platforms
  - <Example Platform #1 Here>
  - <Example Platform #2 Here>
  - <Example Platform #3 Here>

## Monetization model (Brief/Document) 
  - Monetization Type (Premium, Paid Alpha/Beta/Final, Ad Driven, Micro-transactions, Subscription, etc.)
  - Link to Monetization Document (How do you plan to monetize the game?)

## Project Scope 
  - Game Time Scale - 15 minutos
    - Cost? (How much will it cost?) - nada
    - Time Scale (How long will it take to make this game?) - três meses
  - Team Size - 2 pessoas
    - Core Team: Pablo e Elise
      - Team Member name? Pablo
        - What does he/she do?
        - Cost to employ them full time or part time-  0 reais
      - etc. (List as many core team members as you need to)
    - Marketing Team - o da feira
      - Team Member name?
        - What does he/she do?
        - Cost to employ them full time or part time 
      - Etc. (List as many marketing team members as you need to)
    - Licenses / Hardware / Other Costs
    - Total Costs with breakdown

## Influences (Brief)
  - Subway Surfers #1
    - Jogo mobile
    - Geração aleatória de obstáculos 
    - Duck Hunt #2
    - Jogo de fliperama
    - /Explain why this is an influence in 1 Paragraph or less/
  - Influence #3
    - Medium (Television, Games, Literature, Movies, etc.)
    - /Explain why this is an influence in 1 Paragraph or less/
  - Influence #4>
    - Medium (Television, Games, Literature, Movies, etc.)
    - /Explain why this is an influence in 1 Paragraph or less/

## The elevator Pitch

[A one sentence pitch for your game.]
Pretend that your were pitching your game to a executive going to the elevator. You have less than 60 Seconds.

## Project Description (Brief):

[Two Paragraphs at least]
[No more than three paragraphs]

## Project Description (Detailed)

[Four Paragraphs or more If needs be]
[No more than six paragraphs]

# What sets this project apart?
  - <Reason #1>
  - <Reason #2>
  - <Reason #3>
  - <Reason #4>
  - <etc.>

## Core Gameplay Mechanics (Detailed)
  - [Core Gameplay Mechanic #1]
    - [Details] /Describe in 2 Paragraphs or less/
    - [How it works] /Describe in 2 Paragraphs or less/
  - [Core Gameplay Mechanic #2]
    - [Details] /Describe in 2 Paragraphs or less/
    - [How it works] /Describe in 2 Paragraphs or less/
  - [Core Gameplay Mechanic #3]
    - [Details] /Describe in 2 Paragraphs or less/
    - [How it works] /Describe in 2 Paragraphs or less/
  - [Core Gameplay Mechanic #4]
    - [Details] /Describe in 2 Paragraphs or less/
    - [How it works] /Describe in 2 Paragraphs or less/

# Story and Gameplay

## Story (Brief)

[The Summary or TL;DR version of below]

## Story (Detailed)

[Go into as much detail as needs be]
[Spare no detail]
[Use Mind Mapping software to get your point across]

## Gameplay (Brief)

[The Summary version of below]

## Gameplay (Detailed)

[Go into as much detail as needs be]
[Spare no detail]
[Combine this with the game mechanics section above]

# Assets Needed

## 2D
  - Textures
    - Environment Textures
  - Heightmap data (If applicable)
    - List required data required - Example: DEM data of the entire UK.
  - Etc.

## 3D
  - Characters List
    - Character #1
    - Character #2
    - Character #3
    - etc.
  - Environmental Art Lists
    - Example #1
    - Example #2 
    - Example #3
    - etc.

## Sound
  - Sound List (Ambient)
    - Outside
      - Level 1
      - Level 2 
      - Level 3
      - etc.
    - Inside
      - Level 1
      - Level 2
      - Level 3
      - etc.
  - Sound List (Player)
    - Character Movement Sound List
      - Example 1
      - Example 2
      - etc. 
    - Character Hit / Collision Sound list
      - Example 1
      - Example 2
      - etc.
    - Character on Injured / Death sound list
      - Example 1
      - Example 2
      - etc.

## Code
  - Character Scripts (Player Pawn/Player Controller)
    - Example
  - Ambient Scripts (Runs in the background)
    - Example
  - NPC Scripts
    - Example

## Animation
  - Environment Animations 
    - Example
  - Character Animations 
    - Player
      - Example 
    - NPC
      - Example

# Schedule
  - <Object #1>
    - Time Scale
      - Milestone 1
      - Milestone 2
      - Etc.
  - <Object #2>
    - Time Scale
      - Milestone 1
      - Milestone 2
      - Etc.
  - <Object #3>
    - Time Scale
      - Milestone 1
      - Milestone 2
      - Etc.
  - <Object #4>
    - Time Scale
      - Milestone 1
      - Milestone 2
      - Etc.
