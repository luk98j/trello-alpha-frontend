import http from "../http.js";

const API = {
    getHello: () => http.get('/hello'),
    createTrelloTable: (userName, title) => http.post('rest/api/private/trello/add-table',{
        userName,
        title
    }),
    getTrelloTable: (userName) => http.get('rest/api/private/trello/get-table?username='+userName),
    getSharedTrelloTable: (userName) => http.get('rest/api/private/trello/get-shared-tables?username='+userName),
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
    getTrelloTodoTask: (id) => http.get('rest/api/private/trello/get-tasks?id='+id),

    createTrelloComment: (cardId, userId, comment) => http.post('rest/api/private/trello/add-comment',{
        cardId: cardId,
        userId: userId,
        comment: comment
    }),

createTrelloTodo: (cardId, Name) => http.post('rest/api/private/trello/add-todo',{
    cardId: cardId,
    Name: Name,
  
}),
createTrelloTodoTask: (cardId, Name,checked) => http.post('rest/api/private/trello/add-todotask',{
    cardId: cardId,
    Name:Name,
    checked:checked
}),
addSharedUser:(userName, tableId) => http.post('rest/api/private/trello/post-shared-table',{
    userName: userName,
    tableId:tableId,
}),
getSharedUser:(id) => http.get('rest/api/private/trello/get-user-shared-table?id='+id),
deleteSharedUser:(userName, tableId) => http.post('rest/api/private/trello/delete-user-from-shared-table',{
    userName: userName,
    tableId:tableId,
}),
}

export default API;