
//const token = '6552571630:AAGQuYy4HWWyTd4ew1TWUYFyTCkXREFmCkI';
//const chatId = "-1001925575186"

const TelegramBot = require('node-telegram-bot-api');

const token = '6552571630:AAGQuYy4HWWyTd4ew1TWUYFyTCkXREFmCkI'; // Substitua pelo seu token
const bot = new TelegramBot(token, { polling: true });
const chatId = '-1001925575186'; // Substitua pelo ID do chat
let link = "https://oddspedia.com/br/futebol/odds"
const linhasBombas = [
    '💣💣💣💣💣',
    '💣💣💣💣💣',
    '💣💣💣💣💣',
    '💣💣💣💣💣',
    '💣💣💣💣💣'
];

const mensagemValidacao = '🔔Validando Entrada🔔\n🚨É recomendado você que se cadastre antes do sinal para não perder a entrada\n🔗 Cadastre-se [AQUI](URL_DO_SEU_LINK)';
const messages = [
    mensagemValidacao,
    criarMensagemComEstrelaEBombasAleatorias()
];


function criarMensagemComEstrelaEBombasAleatorias() {
    const tempoRestante = 120;

    const linhasMensagem = [
        '💰Entrada Confirmada💰',
        '💣 Mines EXCLUSIVO da "nome da empresa"',
        `⌛ Válido por: 02:00 min`,
        `🔄 N° de tentativas: ${Math.floor(Math.random() * 3) + 2}`,
        `[CADASTRE-SE AQUI](URL_DO_SEU_LINK)`, // Adicione o link aqui
        '',
        criarLinhasBombasAleatorias()
    ];

    return linhasMensagem.join('\n');
}

function criarLinhasBombasAleatorias() {
    const indexEstrelaVertical = Math.floor(Math.random() * 5);
    const indexEstrelaHorizontal = Math.floor(Math.random() * 5);
    const indexBombaVertical = Math.floor(Math.random() * 5);
    const indexBombaHorizontal = Math.floor(Math.random() * 5);

    const linhasMensagem = [];

    for (let i = 0; i < 5; i++) {
        if (i === indexEstrelaVertical) {
            const linhaEstrelaVertical = [...linhasBombas[i]];
            linhaEstrelaVertical[indexBombaVertical] = '⭐';
            linhasMensagem.push(linhaEstrelaVertical.join(''));
        } else if (i === indexEstrelaHorizontal) {
            const linhaEstrelaHorizontal = [...linhasBombas[i]];
            linhaEstrelaHorizontal[indexBombaHorizontal] = '⭐';
            linhasMensagem.push(linhaEstrelaHorizontal.join(''));
        } else {
            linhasMensagem.push(linhasBombas[i]);
        }
    }

    return linhasMensagem.join('\n');
}

function enviarMensagensRecorrentes() {
    bot.sendMessage(chatId, messages[0])
        .then(() => {
            setTimeout(() => {
                bot.sendMessage(chatId, messages[1])
                    .then(() => {
                        setTimeout(enviarMensagensRecorrentes, 2000); // Intervalo de 2 segundos antes de enviar as mensagens novamente
                    })
                    .catch(error => {
                        console.error('Erro ao enviar mensagem:', error);
                        setTimeout(enviarMensagensRecorrentes, 2000); // Em caso de erro, tente novamente após 2 segundos
                    });
            }, 3000); // Intervalo de 3 segundos antes de enviar a segunda mensagem
        })
        .catch(error => {
            console.error('Erro ao enviar mensagem:', error);
            setTimeout(enviarMensagensRecorrentes, 2000); // Em caso de erro, tente novamente após 2 segundos
        });
}

// Iniciar o processo de envio de mensagens recorrentes
enviarMensagensRecorrentes();











