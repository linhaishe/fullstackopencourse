## 0.4 New note diagram

```mermaid
sequenceDiagram
    participant browser
    participant server
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: No content
    deactivate server
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: new HTML document
    deactivate server
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the CSS file
    deactivate server
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JS file
    deactivate server
    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server
        
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{content: "sending", date: "2023-02-03T00:25:27.391Z"}, ...]
    deactivate server
    Note right of browser: The browser executes the callback function that renders the notes 
```
![image.png](http://tva1.sinaimg.cn/large/005NUwygly1hblwti8sn2j30fu0ipach.jpg)

## 0.5 Single page app diagram

```mermaid
sequenceDiagram
    participant browser
    participant server
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the CSS file
    deactivate server
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the JS file
    deactivate server
    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server
        
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{content: "sending", date: "2023-02-03T00:25:27.391Z"}, ...]
    deactivate server
    Note right of browser: The browser executes the callback function that renders the notes 
```
![image.png](http://tva1.sinaimg.cn/large/005NUwygly1hblwtytvbmj30hj0egwgi.jpg)
