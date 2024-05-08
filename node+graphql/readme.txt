mutation($userName: String!, $email: String!, $password: String!){
  registerUser(userName: $userName, email: $email, password: $password) {
    id
    userName
    email
    password
  }
}
{
  "userName": "gautam1",
  "email": "gm1@gmail.com",
  "password": "12345"
}

mutation loginUser($email: String!, $password: String!) {
  loginUser(email: $email, password: $password) {
    id
    userName
    email
    token
  }
}
{
  "email": "gm1@gmail.com",
  "password": "12345"
}


mutation LogoutUser($email: String!) {
  logoutUser(email: $email) {
    message
  }
}
{
  "email": "gm1@gmail.com",
}

mutation ChangePassword($email: String!, $oldPassword: String!, $newPassword: String!) {
  changePassword(email: $email, oldPassword: $oldPassword, newPassword: $newPassword) {
    message
  }
}
{
  "email": "gm1@gmail.com",
  "oldPassword": "12345",
  "newPassword": "123456"
}

mutation  updatePasswordRequest($email: String!) {
  updatePasswordRequest(email: $email) {
    message
  }
}

{
  "email": "gm1@gmail.com",
}

mutation ResetPassword($resetToken: String!, $newPassword: String!) {
  resetPassword(resetToken: $resetToken, newPassword: $newPassword) {
    message
  }
}
{
  "resetToken": "b6e1215c30a1591a3e2cef3ea96b7bef124d54f0155e2f4795de54bf19ddffd4",
  "newPassword": "12345"
}

mutation CreateEvent($title: String!, $description: String, $date: String!, $inviteeEmails: [String]) {
  createEvent(title: $title, description: $description, date: $date, inviteeEmails: $inviteeEmails) {
    id
    title
    description
    date
   
  }
}
{
  "title": "Your Event Title",
  "description": "Your Event Description",
  "date": "2023-12-31",
  "inviteeEmails": ["gm2@gmail.com", "gm3@gmail.com"]
}

mutation($eventId: Int!, $inviteeEmails: [String]){
  inviteUser(eventId: $eventId,inviteeEmails: $inviteeEmails) {
    eventId
    inviteeEmails
    message
  }
}
{
  "eventId": 1,
  "inviteeEmails": ["gm50@gmail.com" , "gm10@gmail.com"]
}

query GetEvents($page: Int, $limit: Int, $sortBy: String, $sortOrder: String, $search: String, $startDate: String, $endDate: String) {
  getEvents(page: $page, limit: $limit, sortBy: $sortBy, sortOrder: $sortOrder, search: $search, startDate: $startDate, endDate: $endDate) {
    id
    title
    description
    date
  }
}
{
  "page": 1,
  "limit": 5,
  "sortBy": "date",  
  "sortOrder": "DESC", 
}

query GetEvents($page: Int, $limit: Int, $sortBy: String, $sortOrder: String, $search: String, $startDate: String, $endDate: String) {
  getEvents(page: $page, limit: $limit, sortBy: $sortBy, sortOrder: $sortOrder, search: $search, startDate: $startDate, endDate: $endDate) {
    id
    title
    description
    date
  }
}
{
  "search":"event title"
}
{
  "startDate":"2023-01-01",
  "endDate":"2025-01-01"
}

query GetEventById($id: Int!) {
  getEventById(id: $id) {
    id
    title
    description
    date
    creatorId
    invitees {
      id
      eventId
      inviteeEmail
      User {
        userName
        email
      }
    }
  }
}

{
  "id":1
}

mutation UpdateEventById($eventId: Int!, $title: String, $description: String, $date: String) {
  updateEventById(id: $id, title: $title, description: $description, date: $date) {
    eventId
    title
    description
    date
  }
}
{
  "eventId":1,
 "title":"titleupdated",
 "description":"description updated"
}






mutation($data: register){
  registerUser(data: $data) {
    userName
    email
    password

  }
}


{
  "data":{
   "userName": "gautam",
   "email": "gm1@gmail.com",
   "password": "1234567" 
  }
}

mutation($data: login){
  loginUser(data: $data) {
    email
    token
  }
}

{
  "data":{
   "email": "gm1@gmail.com",
   "password": "1234567" 
  }
}

