## Http : Hyper text transfer protocol

* difference between http and https : http m data same aata hai as it is but in https me data encrypt kr deta hai jo data hm send kr dete hai ki reable na ho serve rpr ho.


- Http is a client server model.
- URL , URN , URI: uniform resource locator ....identiefer ka resource name hota hai , address location , corporate m urn and uri jyda bolte h instread of address and url

# HTTP HEADERS:
- is a metadata - which is a key value pair sent along with request and response
- header doing so many works like few below:
    - caching , authentication , manage state (cart m kch rkha hai user , wo guest state m hai ,user state m h)
    - X-prefic ->2012(X-depreicted ) ab ni use hota hai
- Headers type :
  1. Request header -> from client
  2. Response header -> from server
  3. Representation header -> encoding /compression 
  4. Payload header -> data (id: data,email: sddd)
   and many more.... metadta ahia kai trh k ho skte hai

# Most common headers:
1. Accept: application/json
2. User : Agent
3. Authorization : Bearer .....
4. Content : Type
5. Cookie : key value pairs object hai like itne time tk user ko login rkhenge
6. Cache : control ...data kb expire kre like...

# CORS headers:
1. Access - Control - Allow - Origin
2. Access - Control - Allow - Credentials
3. Access - Control - Allow - Method

# Security headers  : policies in header : plocies hoti hai h compny ki kahan kahan s data allow kr skte hai kya allow hai scurity ploicyies
1. Cross - Origin - Embedder - Policy
2. Cross - Origin - Opener - Policy
3. Content - Security - Policy
4. X- XSS - Protection


# HTTP Methods :
- Basic set of operations that can be used to ineternet with server
There are some basic methods in https:
* mostly used : GET,POST, PUT , DELETE
1. GET : retreive a resource
2. HEAD : no message body ( response headers only)
3. OPTIONS : what operations are available (like kya ky avaiable get hai post hai kya availbe h)
4. TRACE : loopback test (get soe data)
5. DELETE : remove a resource
6. PUT : replace a resource
7. POST : interact with resource (mostly add)
8. PATCH : change part of resource

# HTTP STATUS CODE:
XX means below : we can use 2 digit also like - 100, 101,103,201....
- 1XX - informational //info pass krni h user ko 
- 2XX - Success //succesfully done
- 3XX - Redirection //move,remove or whatever u doing
- 4XX - Client error //client s info shi s nhi ayi hai, token ni aya jaise ye sb
- 5XX - Server error //netwrok break hua ... ya hmari glti hai hmare end s hoti hi


# few errors are : 
100 - continue
102- processing
200- OK
201 - created
202 - accepted
307- temporary redirect
308 - permanent redirect
400 - Bad request
401- Unauthorized
402 - Payment required
404 - not found
500 - internal server error (basiclly u will. in see in outage)
504- gateway time out
 

