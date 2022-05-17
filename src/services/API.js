import http from "../http.js";

const API = {
    getHello: () => http.get('/hello'),
    createTrelloTable: (userName, title) => http.post('rest/api/private/trello/add-table',{
        userName,
        title
    }),
    getTrelloTable: (userName) => http.get('rest/api/private/trello/get-table?username='+userName),
    getTrelloList: (table) => http.get('rest/api/private/trello/get-list?id='+table),
    getTrelloTableInfo: (table) => http.get('rest/api/private/trello/get-info-table?id='+table),
    createTrelloList: (title, tableId) => http.post('rest/api/private/trello/add-list',{
        title,
        tableId
    }),
    createTrelloCard: (title, listId, description) => http.post('rest/api/private/trello/add-card',{
        title: title,
        listId: listId,
        description: description
    }),
    editTrelloCard: (title, cardId, description) => http.post('rest/api/private/trello/edit-card',{
        title: title,
        cardId: cardId,
        description: description
    }),
    getTrelloCard: (id) => http.get('rest/api/private/trello/get-cards?id='+id),
    getTrelloComment: (id) => http.get('rest/api/private/trello/get-comments?id='+id),
    getTrelloTodo: (id) => http.get('rest/api/private/trello/get-todos?id='+id),
    createTrelloComment: (cardId, userId, comment) => http.post('rest/api/private/trello/add-comment',{
        cardId: cardId,
        userId: userId,
        comment: comment
    }),
}

export default API;