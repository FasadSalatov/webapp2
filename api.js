async function getUser(chat_id){
    let answer = await fetch(`/api2/user/${chat_id}`, {
        method: 'GET'
    })

    return await answer.json();
}

async function createUser(chat_id, referral_id){
    let answer = await fetch(`/api2/user/-1`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            chatId: chat_id,
            referralId: referral_id
        })
    })

    return await answer.json();
}

async function addWallet(wallet, chat_id){
    let answer = await fetch(`/api2/user-wallet`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            chatId: chat_id,
            wallet: wallet
        })
    })

    return await answer.json();
}


async function getSetting(){
    let answer = await fetch(`/api2/cost`, {
        method: 'GET',
    })

    return await answer.json();
}

async function buyToken(chat_id, tokens){
    let answer = await fetch(`/api2/buy`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            chatId: chat_id,
            tokens: tokens
        })
    })

    return await answer.json();
}

async function claimToken(chat_id){
    let answer = await fetch(`/api2/claim-token/${chat_id}`, {
        method: 'GET',
    })

    return '';
}