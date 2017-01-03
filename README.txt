api 정리

1. users

<스키마>
email: String, // key if facebook login. else use default mongoDB id.
isFacebook: String // "true" or "false" convert to real boolean value by Boolean.parseBoolean in JAVA

GET, /users : 유저 리스트 불러오기. 결과물은 유저들의 json array

GET, /users/:key : 단일 유저 불러오기. :key가 이메일이면 이메일로, 몽고 디비 id면 그 아이디로 찾아서 가져옴. 결과물은
단일 유저의 json

POST, /users : 유저 생성. request body에 json으로 email(선택), isFacebook(필수)를 포함하여 보내야 한다. 결과물은 생성된
유저의 json이다. 사실 일단 필요한건 몽고 디비 아이디니까 그 외에는 디버그 용으로 활용하고 나중에 없앨 수 있다. 바디에
mongo_id 라는 필드를 추가하여 중복 아이디 추가를 방지한다.

PUT, /users/:user_id : 아이디에 해당하는 유저 수정. 이메일 주소 업데이트나, 페이스북 연동/해지 등에 활용될 수 있을 것
같다. 아이디 이외의 모든 필드를 자유롭게 json에 포함하여 전송하면 그 부분이 수정된다. 결과는 수정이 완료되었다는
메시지다.

DELETE, /users/:user_id : 유저 삭제. 아이디에 해당하는 유저를 삭제한다. 결과물은 삭제가 성공하였다는 메시지.

2. friends

<스키마>
whose: Schema.ObjectId, // object id of owner
fromWhere: String, // 'facebook' or 'phonebook' or 'both'
email: String, // key if from facebook
phone: String, // key if from phonebook
name: String,
birth: Date,
gender: String // M, F, or user defined.

GET, /friends/:user_id : 아이디에 해당하는 유저의 모든 친구 리스트를 json array로 출력

GET, /friends/:user_id/:key : 아이디에 해당하는 유저의 친구 하나를 key(이메일 또는 -포함한 휴대폰 번호)로 GET.

POST, /friends/:user_id : 유저에 친구를 추가한다. whose를 제외한 모든 정보는 URL이 아닌 body에 json으로
들어간다. 필수로 들어가야 할 것은 whose, fromWhere, name이고 email, phone은 둘 중 하나가 반드시 들어가야 하며, 나머지는
선택적이다.

PUT, /friends/:user_id/:key : 유저에 추가된 이메일 또는 휴대폰 번호로 친구를 찾아 수정한다.
수정될 정보는 body에 json으로 들어간다.

DELETE, /friends/:user_id/:key : 유저의 친구를 이메일 또는 휴대폰 번호로 찾아서 삭제한다.




