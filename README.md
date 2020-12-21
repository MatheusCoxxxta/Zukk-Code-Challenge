# Zukk Code Challenge

- [Introdução](#introducao)
- [Desenvolvimento](#desenvolvimento)
- [Instalação](#instalacao)
- [Referências](#referencias)

## Introdução <a name = "introducao"></a>

Aplicação React Native para teste da Zukk.

Home             |  Delete Point       |     Drawer
:-------------------------:|:-------------------------:|:-------------------------:
![](https://i.imgur.com/JxHHMwE.png) |  ![](https://i.imgur.com/kO5U4pj.png) | ![](https://i.imgur.com/IsL3UpC.png)




## Desenvolvimento <a name = "desenvolvimento"></a>

### Libs e pluggins utilizados

- [React Navigation](https://reactnavigation.org/)

- [Mapbox-GL](https://github.com/react-native-mapbox-gl/maps)

- [Styled Components](https://styled-components.com/)

- [RealmDB](https://realm.io/)

### Detalhes do desenvolvimento

Inciei criando as duas telas e o design básico (textos e botões). Adicionei os mapas com dados "mockados" apenas para visualização.

Após criar as telas, criei a navegação do App, utilizando Stack Nativation, ou seja, navegação em pilha, que permite que o usuário não perca o histórico de navegação (conseguindo asssim usar teclas do smartphone para voltar tela).

Foi utilizado o máximo de componentização possível.

O componente de mapa da tela de anotação de pontos (Drawer) foi utilizado como um formulário de entrada de dados, dessa forma foi mais interessante usar o botão direto nesse componente, não como componente global da tela.

Para alinhar com as dificuldadesque tive no desenvolvimento (sinalizadas abaixo), foram feitas algimas mudanças. Como não foi implementada a entrada de polígonos (explicação abaixo), utilizei apenas um botão para salvar ponto e a função de criar novo ponto está sempre hábilitada na tela Drawer, por ser a funcionalidade principal da tela.

Os dados foram armazenados em um JSON e enviados para uma tabela no RealmDB. Estrutura da tabela:
```typescript
{
  id: number
  lat: double,
  long: double
}
```

### Dificuldades e impedimentos

Entre as maiores dificuldades esteve o fato de geolocalização ser uma área específica, então foi difícil encontrar material na web (snippets, documentação).

Outra dificuldade foi o curto prazo, por esse motivo e atrelado a problemas de pouca documentação, não foi possível desenvolver a parte de polígonos.

O maior impedimento foi o Mapbox estar em transição, descontinuando alguns componentes e utilizando novos. Os novos componentes ainda estão com documentação limitada, o que foi decisivo na minha escolha de usar alguns componentes mais antigos, porém melhor documentados, como o **PointAnnotation**.


## Instalação <a name = "instalacao"></a>

#### Pre-requisitos

Você precisa ter um ambiente React Native configurado (React Native CLI, Node.js, Yarn, SDK Android)

Clone esse repositório

```
git clone https://github.com/MatheusCoxxxta/Zukk-Code-Challenge.git
```

<br />
Instale os pacotes

```
yarn install
```

ou

```
npm install
```

<br />
Inicie o servidor local

```
yarn start
```

ou

```
npm run start
```

<br />
Rode em um dispositivo Android

```
yarn android
```

ou

```
npm run android
```


## Referências <a name = "referencias"></a>

- [React Native](https://reactnative.dev/)

- [Node.js](https://nodejs.org/en/)

- [Yarn](https://yarnpkg.com/)

- [React Navigation](https://reactnavigation.org/)

- [Mapbox-GL](https://github.com/react-native-mapbox-gl/maps)

- [Styled Components](https://styled-components.com/)

- [RealmDB](https://realm.io/)
