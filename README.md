
# Executar a aplicação

- Clone o repositório
- Dentro do diretório raíz do projeto, digite:
- ```docker compose up --build -d```
- Aguarde a criação dos containers, e a instalação dos pacotes.
- Executar testes do app back-end:
- ```./run-tests.sh```
- App front-end pode ser acessado em: http://localhost:3000

# Observações

- Obs: Foi dada uma ênfase maior na aplicação do back-end, sendo desenvolvido todos os recursos sugeridos no escopo do projeto, aplicando conceitos de arquitetura e testes unitários com cobertura de quase 100%. O funcionamento dos recursos pode ser conferido nos testes em "/app/tests".

- Obs front-end: Apenas algumas páginas foram desenvolvidas, para ser possível aplicar os recursos desenvolvidos no back-end. (Contém algumas falhas, e não contém todos os recursos, não foi possível finalizar a tempo).

# Stack utilizada

Pacotes utilizados no desenvolvimento do back-end:

- Node 20.14, versão LTS mais atual no momento
- Nodemon para hot-reload no ambiente dev
- Express para fornecer APIs
- Express-Validator para validação de requests
- Sequelize para gerenciar o banco de dados
- Sequelize-Cli para gerenciar models e migrations
- Jest para testes
- Axios para teste das APIs
- MariaDB 11.x, versão LTS mais atual no momento
- Ethereal.mail para o envio de e-mails fake

# Docker

- A aplicação foi conteinerizada para se ter um ambiente de desenvolvimento padronizado e estável. Sendo 3 containers, db(banco de dados com MariaDB), app-fe(Front-end com React), e app-be(Back-end com Node)
