// chat-messages-api.js
import HTTPTransport from 'modules/http';
import { BaseAPI } from 'modules/http/base-api';

const chatMessagesAPIInstance = new HTTPTransport('api/v1/messages');

class ChatMessagesAPI extends BaseAPI {
    request({id}) {
        return chatMessagesAPIInstance.get(`/${id}`);
    }
}