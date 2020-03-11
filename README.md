```
COMP3133 Chat Application - Assignment 1

Group Members:
- Jezzica Tan, 
- Norris Co, 101126499
```


```
1. Run app locally
   - Run server
     - open a terminal
     - cd server
     - npm install
     - npm run start

   - Run client
     - open another terminal
     - cd client
     - npm install
     - npm run start

   - Lobby is at ( http://localhost:3000 )

   - If you don't see existing rooms, refresh the page
```

```
2 To test APIs, we need to run browser without CORS
   - For Windows
     - Right click on desktop, add new shortcut
     - Enter location of item as: "C:\Program Files (x86)\Google\Chrome\Application     \chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp
     - Click Next.
     - Click OK
     - (Make sure you close Google Chrome first, if you have existing tabs open)
     - Open the shortcut that you made 'Chrome.exe' or whatever you named it

   - For Mac or Linux (all instructions are here)
     - https://alfilatov.com/posts/run-chrome-without-cors/?fbclid=IwAR0oRm1UMn-YHePWQlkfYx8mM1nvo96LyGTLZgA4arfprVlT73HzeVV1H0c
```

```
3. APIs
   - Chat History ( http://localhost:3000/api/history )
   - Game History ( http://localhost:3000/api/roomhistory?roomname={roomname} )
   - Event Log ( http://localhost:3000/api/eventlog )
```
