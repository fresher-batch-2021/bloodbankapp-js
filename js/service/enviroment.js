const dbusername = "apikey-v2-zyhv5j7i61imeby1qya0ma2ejrc0fkf9n4e4bl3w5gn";
const dbpassword = "ec6094ae0714dc7a5ffc50a86924bef3";
const basicAuth = "Basic " + btoa(dbusername + ":" + dbpassword);
const authentication = { headers: { 'Authorization': basicAuth } }
const endpoint = "https://fffdcced-9a09-44ae-aa2f-e27add7efeb7-bluemix.cloudantnosqldb.appdomain.cloud/";