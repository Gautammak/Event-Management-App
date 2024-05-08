const typeDefs = `#graphql

  type User {
    id: Int!
    userName: String!
    email: String!
    password: String!
    token: String
    resetToken: String
    resetTokenExpires: String
  }
  

  type Response {
    message: String
  }

  type CreatedUser {
    id: Int!
    userName: String!
    email: String!
  }
  type Invite {
    userName: String
    email: String
  }

  type Invitee {
    id: Int!
    eventId: Int!
    inviteeEmail: String!
    User: Invite
  }                           
  type Event {
    id: Int!
    title: String!
    description: String
    date: String!
    creatorId: Int!
    inviteeEmails: [String]
    invitees: [Invitee]!
  }

  type InviteUserResponse {
    message: String!
    eventId: Int!  
    inviteeEmails: [String]
  }

  type Query {
   
    getEvents(data: getEvents): [Event]  
      getEventById(data:getEventById): Event 
  }

  type Mutation {
    registerUser(data:register): User
    loginUser(data:login): User
    logoutUser(data:logout): Response
    changePassword(data:changePassword): Response
    updatePasswordRequest(data:updatePasswordRequest):Response
    resetPassword(data:resetPassword): Response
    createEvent(data:createEvent): Event
    inviteUser(data:inviteUser): InviteUserResponse
    updateEventById(data:updateEventById ): Event 
  }

  input  register{
    userName:String! 
    email:String! 
    password:String!
  }

  input login{
    email: String!
   password: String!
  }

  input logout{
    email:String!
  }

  input changePassword{
    email: String!
     oldPassword: String!
     newPassword: String!
  }

  input updatePasswordRequest{
    email: String!
  }

  input resetPassword{
    resetToken: String!
     newPassword: String!
  }

  input createEvent{
     title: String!
     description: String
     date: String!
     inviteeEmails: [String]
  }
  
  input  inviteUser {
    eventId: Int!
     inviteeEmails: [String]
  }

  input updateEventById {
    id: Int!
     title: String
      description: String
       date: String
  }

  input getEvents {
      page: Int
      limit: Int
      sortBy: String
      sortOrder: String
      search: String
      startDate: String
      endDate: String
  }

 input getEventById {
    id: Int
  }
`;

module.exports = typeDefs;
