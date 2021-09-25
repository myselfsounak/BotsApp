const { MessageType } = require('@adiwajshing/baileys');
const Strings = require('../lib/db');
const ADMINS = Strings.admins;

module.exports = {
    name: 'admins',
    description: ADMINS.DESCRIPTION,
    extendedDescription: ADMINS.EXTENDED_DESCRIPTION,
    async handle(client, chat, BotsApp, args) {
        if(!BotsApp.isGroup) {
            client.sendMessage(
                BotsApp.chatId, 
                ADMINS.NOT_GROUP_CHAT,
                MessageType.text
            );
            return;
        }

        var message = '';
        for(let admin of BotsApp.groupAdmins) {
            let number = admin.split('@')[0];
            message += `@${number} `;
        }

        if(!BotsApp.isReply) {
            client.sendMessage(
                BotsApp.chatId, 
                message, 
                MessageType.text, 
                {
                   contextInfo: {
                      mentionedJid: BotsApp.groupAdmins
                    }
                }
            );
            return;
        }
        
        client.sendMessage(
            BotsApp.chatId, 
            message, 
            MessageType.text, 
            {
                contextInfo: { 
                    stanzaId: BotsApp.replyMessageId, 
                    participant: BotsApp.replyParticipant, 
                    quotedMessage: {conversation: BotsApp.replyMessage}, 
                    mentionedJid: BotsApp.groupAdmins
                } 
            }
        );
    }
};