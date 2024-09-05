## Bike Sellers

-   O Bike Sellers visa criar uma comunidade de entusiastas de bicicletas, promovendo a mobilidade sustentável e incentivando o uso de bicicletas como meio de transporte e lazer. 🚴‍♂️🚴‍♀️

## Executar Programa
### Obtendo o repositório
-   Para executar o programa, inicialmente clone o repositório através do comando:

``` git clone https://github.com/dsm-cefet-rj/ti-2024-1-grupo-10-1.git```

### Executando o Frontend
-   Uma vez baixado o repositório, utilizando um terminal, vá até a pasta "frontend" e digite os seguintes comandos:
```
cd ti-2024-1-grupo-10-1/frontend/
npm i # Demora alguns segundos
npm run dev
```
Com isso a parte de frontend da aplicação já está disponível na porta indicada pelo terminal.

### Executando o Backend

#### Iniciando o Banco de Dados
- Para iniciar o banco de dados, utilize provilégios de administrador para baixar e executar o MongoDB.
- Com o MongoDB instalado, execute os códigos a seguir (em outro terminal) para ativar o serviço do banco de dados:
```
sudo systemctl start mongod.service
# Verifique se o serviço de banco de dados está ativo através deste comando: 
sudo systemctl status mongod.service
### Saida:
● mongod.service - MongoDB Database Server
	***
   	Active: active (running) since Mon 2024-XX-XX XX:XX:XX -03
	***
```
#### Inicializando o Backend
-   Para inicializar o backend, vá ao diretório `backend/backbike`, instale as dependências do projeto e em sequência execute o código inicializador como o trecho abaixo:
```
cd ../../
pwd # */ti-2024-1-grupo-10-1
cd backend/backbike/
npm i # Demora alguns minutos
npm start # Iniciando o backend da aplicação
```


Com isso a aplicação já está pronta para ser utilizada. Para utilizá-lo localmente vá a URL indicada pelo frontend.
