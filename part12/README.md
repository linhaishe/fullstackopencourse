# PART 12

learn how to package code into standard units of software called containers.These containers can help us develop software faster and easier than before. We will utilize containers to create immutable execution environments for our Node.js and React projects. Containers also make it easy to include multiple services with our projects. With their flexibility, we will explore and experiment with many different and popular tools by utilizing containers.

# Containers

Containers encapsulate your application into a single package. This package will include the application and all of its dependencies. As a result, each container can run isolated from the other containers.

Containers prevent the application inside from accessing files and resources of the device. Developers can give the contained applications permission to access files and specify available resources. More accurately, containers are OS-level virtualization. The easiest-to-compare technology is a virtual machine (VM). VMs are used to run multiple operating systems on a single physical machine. They have to run the whole operating system, whereas a container runs the software using the host operating system. The resulting difference between VMs and containers is that there is hardly any overhead when running containers; they only need to run a single process.

As containers are relatively lightweight, at least compared to virtual machines, they can be quick to scale. And as they isolate the software running inside, it enables the software to run identically almost anywhere. As such, they are the go-to option in any cloud environment or application with more than a handful of users.

Cloud services like AWS, Google Cloud, and Microsoft Azure all support containers in multiple different forms. These include AWS Fargate and Google Cloud Run, both of which run containers as serverless - where the application container does not even need to be running if it is not used. You can also install container runtime on most machines and run containers there yourself - including your own machine.

So containers are used in cloud environment and even during development. What are the benefits of using containers? Here are two common scenarios:

*Scenario 1: You are developing a new application that needs to run on the same machine as a legacy application. Both require installing different versions of Node.*

You can probably use nvm, virtual machines, or dark magic to get them running at the same time. However, containers are an excellent solution as you can run both applications in their respective containers. They are isolated from each other and do not interfere.

*Scenario 2: Your application runs on your machine. You need to move the application to a server.*

It is not uncommon that the application just does not run on the server despite it works just fine on your machine. It may be due to some missing dependency or other differences in the environments. Here containers are an excellent solution since you can run the application in the same execution environment both on your machine and on the server. It is not perfect: different hardware can be an issue, but you can limit the differences between environments.

Sometimes you may hear about the *"Works in my container"* issue. The phrase describes a situation in which the application works fine in a container running on your machine but breaks when the container is started on a server. The phrase is a play on the infamous *"Works on my machine"* issue, which containers are often promised to solve. The situation also is most likely a usage error.

-------

# Containers and images

There are two core concepts in this part: *container* and *image*. They are easy to confuse with one another.

A *container* is a runtime instance of an *image*.

Both of the following statements are true:

- Images include all of the code, dependencies and instructions on how to run the application
- Containers package software into standardized units

To help with the confusion, almost everyone uses the word container to describe both. But you can never actually build a container or download one since containers only exist during runtime. Images, on the other hand, are **immutable** files. As a result of the immutability, you can not edit an image after you have created one. However, you can use existing images to create *a new image* by adding new layers on top of the existing ones.

"Container" 翻译为**“容器”，"image" 翻译为“镜像”**。 

在计算机和软件领域，"container" 和"image" 通常指的是容器化技术（如Docker）中的概念，分别指代运行时环境和打包好的运行环境文件。

- **Container (容器):** 

  指一个可以运行应用程序的独立运行实例。 它从镜像创建而来，并包含应用程序运行时所需的代码、库、环境变量和配置文件等。

- **Image (镜像):** 

  是一个只读的、轻量级、可执行的软件包，它包含了创建容器所需的一切。 镜像可以看作是运行应用程序的模板。

Cooking metaphor:

- Image is pre-cooked, frozen treat.
- Container is the delicious treat.

| 操作目标         | 命令                                        |
| ---------------- | ------------------------------------------- |
| 启动已有容器     | `docker start -ai <container_name_or_ID>`   |
| 从镜像创建新容器 | `docker run -it --name <name> <image> bash` |

---

# Dockerfile

Instead of modifying a container by copying files inside, we can create a new image that contains the "Hello, World!" application. The tool for this is the Dockerfile. Dockerfile is a simple text file that contains all of the instructions for creating an image. Let's create an example Dockerfile from the "Hello, World!" application.

```bash
docker build -t fs-hello-world .  
# a simple dot will mean to copy Dockerfile is in this directory
```

不是每个docker都有dockerfile。当你 **自己构建镜像** 时，才会有一个 `Dockerfile。`

没有 Dockerfile 的情况

- 如果你是从 **Docker Hub 拉取现成的镜像**（比如 `node:20`、`ubuntu`、`hello-world`），
   你本地并不会自动拥有对应的 `Dockerfile`。
- 它们的 Dockerfile 是由镜像作者（官方或第三方）在构建时使用的，但不会被带到你的系统。

🧱 举个例子：

你执行：

```
docker run -it node:20 bash
```

Docker 会：

- 从 Docker Hub 拉取 `node:20` 镜像
- 创建容器并进入

👉 你能运行它、修改它、提交新镜像，但你 **看不到原始 Dockerfile**，除非你去 Docker Hub 官方仓库查看。

让你的镜像有可重复构建的过程（而不是用 `docker commit` 手动保存状态），就应该自己写一个 `Dockerfile`。

假设你的 `Dockerfile` 是这样的 👇

```dockerfile
FROM node:20
WORKDIR /usr/src/app
COPY . .
CMD ["node", "index.js"]
```

The WORKDIR instruction was slipped in to ensure we don't interfere with the contents of the image. It will guarantee all of the following commands will have */usr/src/app* set as the working directory. If the directory doesn't exist in the base image, it will be automatically created.

If we do not specify a WORKDIR, we risk overwriting important files by accident. If you check the root (*/*) of the node:20 image with *docker run node:20 ls*, you can notice all of the directories and files that are already included in the image.

当你构建镜像后：

```
docker build -t hello-node .
```

然后你运行：

```
docker run hello-node
```

👉 容器会执行：

```
node index.js
```

也就是说，`CMD ["node", "index.js"]` 是默认命令。

------

💡 但是！

如果你想临时运行别的命令，可以在 `docker run` 后面**覆盖掉 CMD**：

```bash
docker run hello-node node --version

# or

docker run -it fs-hello-world bash
```

这时：

- `Dockerfile` 里定义的 `CMD ["node", "index.js"]` 会被**忽略**

- 取而代之执行你传入的 `node --version`

- 容器会输出类似：

  ```
  v20.11.0
  ```

------

🔁 总结一下区别：

| 情况                                   | 执行的命令                                      |
| -------------------------------------- | ----------------------------------------------- |
| `docker run hello-node`                | 执行 Dockerfile 里的 `CMD ["node", "index.js"]` |
| `docker run hello-node bash`           | 忽略 CMD，执行 `bash`                           |
| `docker run hello-node node --version` | 忽略 CMD，执行 `node --version`                 |

------

🧠 延伸：

`CMD` 是给镜像提供一个**默认行为**，方便别人使用时不必记住复杂的命令。
 但它并不强制执行 —— 用户运行容器时始终可以手动指定新命令来覆盖它。

| 特性                   | CMD                    | ENTRYPOINT                    | ENTRYPOINT + CMD                       |
| ---------------------- | ---------------------- | ----------------------------- | -------------------------------------- |
| 默认命令               | ✅                      | ✅                             | ✅                                      |
| 可被 `docker run` 覆盖 | ✅（容易）              | 🚫（不容易）                   | ✅（只覆盖参数）                        |
| 常见用途               | 提供默认行为           | 保证固定执行程序              | 同时有固定命令和默认参数               |
| 例子                   | `CMD ["npm", "start"]` | `ENTRYPOINT ["npm", "start"]` | `ENTRYPOINT ["npm"]` + `CMD ["start"]` |

```bash
docker run -p 3123:3000 express-server 
# The -p flag in the run command will inform Docker that a port from the host machine should be opened and directed to a port in the container. The format is -p host-port:application-port.
```

## ci diff npm i

The npm install can be risky. Instead of using npm install, npm offers a much better tool for installing dependencies, the *ci* command.

Differences between ci and install:

- install may update the package-lock.json
- install may install a different version of a dependency if you have ^ or ~ in the version of the dependency.
- ci will delete the node_modules folder before installing anything
- ci will follow the package-lock.json and does not alter any files

So in short: *ci* creates reliable builds, while *install* is the one to use when you want to install new dependencies.

As we are not installing anything new during the build step, and we don't want the versions to suddenly change, we will use *ci*:

```dockerfile
FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm ci
CMD DEBUG=playground:* npm startcopy
```

Even better, we can use *npm ci --omit=dev* to not waste time installing development dependencies.

## nano

方便在终端里对文件进行增删改的操作，微可视化。

```bash
# container 里运行
apt update && apt install -y nano
# 安装完再验证一次：
nano --version
```

## Docker compose

[Docker compose](https://docs.docker.com/compose/) is another fantastic tool, which can help us to manage containers.

```bash
docker compose -f docker-compose.dev.yml up -d
```

| 参数                        | 含义                      |
| --------------------------- | ------------------------- |
| `-f docker-compose.dev.yml` | 使用开发环境 Compose 文件 |
| `up`                        | 构建并启动容器            |
| `-d`                        | 后台运行容器，不占用终端  |

### 1️⃣ `docker compose`

- 这是 **Docker Compose 的 CLI 命令**
- 用来管理多容器应用（build、up、down、logs 等）
- 注意：新版 Docker 使用 **`docker compose`**（中间没有 `-`），老版本是 `docker-compose`

------

### 2️⃣ `-f docker-compose.dev.yml`

- 指定要使用的 Compose 文件
- 默认情况下，`docker compose up` 会使用 `docker-compose.yml`
- 如果你有多个环境的 Compose 文件（比如 dev / prod / test），就可以通过 `-f` 指定
- 例子：
  - `docker-compose.dev.yml` → 开发环境
  - `docker-compose.prod.yml` → 生产环境

------

### 3️⃣ `up`

- `up` 会做两件事：
  1. **build 镜像**（如果 Compose 文件里指定了 `build`）
  2. **启动容器**（按照 Compose 文件的 service 配置）
- 如果镜像已经存在，默认会复用，不会重新 build
- 可以加 `--build` 强制重建镜像

------

### 4️⃣ `-d`

- `-d` 是 **detached 模式**，意思是让容器在后台运行
- 如果不加 `-d`，终端会显示所有容器日志，并占用当前终端

start the MongoDB with *docker compose -f docker-compose.dev.yml up -d*. With *-d* it will run it in the background. You can view the output logs with *docker compose -f docker-compose.dev.yml logs -f*. There the *-f* will ensure we *follow* the logs.

Bind mount is the act of binding a file (or directory) on the host machine to a file (or directory) in the container. A bind mount is done by adding a *-v* flag with *container run*. The syntax is *-v FILE-IN-HOST:FILE-IN-CONTAINER*. Since we already learned about Docker Compose let's skip that. The bind mount is declared under key *volumes* in *docker-compose.dev.yml*. Otherwise the format is the same, first host and then container:

```yml
services:
  node-app:
    build: .
    container_name: todo-app-backend-yml
    ports:
      - "3123:3000" # 宿主机 3123 映射容器 3000
    environment:
      - DEBUG=app:* # 设置环境变量
    volumes:
      - .:/usr/src/app # 可选：挂载代码，方便修改立即生效
    command: npm start # 可以覆盖 Dockerfile CMD，如果不写就默认 CMD
```

```yml
services:
  mongo:
    image: mongo
    ports:
      - 3456:27017 # 自定义端口:官方默认端口
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example
      MONGO_INITDB_DATABASE: the_database
    volumes:
      - ./mongo/mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js
  redis:
    image: redis
    ports: 
      - 3490:6379
    command: ['redis-server', '--appendonly', 'yes'] # Overwrite the CMD
    volumes: # Declare the volume
      - ./redis_data:/data
```

![image-20251027123639966](/Users/chenruo/Library/Application Support/typora-user-images/image-20251027123639966.png)

```bash
docker compose -f docker-compose.dev.yml down --volumes
# to ensure that nothing is left

docker compose -f docker-compose.dev.yml up
# to initialize the database
```

```bash
MONGO_URL=mongodb://root:example@localhost:3456/the_database?authSource=admin npm run dev
# 带权限进入 mongo cli
```

There are two distinct methods to store the data:

- Declaring a location in your filesystem (called [bind mount](https://docs.docker.com/storage/bind-mounts/))
- Letting Docker decide where to store the data ([volume](https://docs.docker.com/storage/volumes/))

Now the volume is created and managed by Docker. After starting the application (*docker compose -f docker-compose.dev.yml up*) you can list the volumes with *docker volume ls*, inspect one of them with *docker volume inspect* and even delete them with *docker volume rm*:

```bash
$ docker volume ls
DRIVER    VOLUME NAME
local     todo-backend_mongo_data
$ docker volume inspect todo-backend_mongo_data
[
    {
        "CreatedAt": "2024-19-03T12:52:11Z",
        "Driver": "local",
        "Labels": {
            "com.docker.compose.project": "todo-backend",
            "com.docker.compose.version": "1.29.2",
            "com.docker.compose.volume": "mongo_data"
        },
        "Mountpoint": "/var/lib/docker/volumes/todo-backend_mongo_data/_data",
        "Name": "todo-backend_mongo_data",
        "Options": null,
        "Scope": "local"
    }
]
```

*Question Everything* is still applicable here. As said in [part 3](https://fullstackopen.com/en/part3/saving_data_to_mongo_db): The key is to be systematic. Since the problem can exist anywhere, *you must question everything*, and eliminate all possible sources of error one by one.

```bash
REDIS_URL=redis://localhost:3490 MONGO_URL=mongodb://root:example@localhost:3456/the_database?authSource=admin npm run dev

VITE_BACKEND_URL=http://localhost:3456 npm run dev
```

# multiple stages

[Multi-stage builds](https://docs.docker.com/build/building/multi-stage/) are designed to split the build process into many separate stages, where it is possible to limit what parts of the image files are moved between the stages.

```bash
FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

RUN npm install -g serve

CMD ["serve", "dist"]

# option 1
# and run -  `docker build . -t hello-front`  - in bash to init image
# `docker run -it hello-front bash` - to create a container and entry the bash

# option 2
# docker build . -t hello-front - build the image
# docker run -p 5001:3000 hello-front - the app will be available in http://localhost:5001
```

We have also declared *another stage*, where only the relevant files of the first stage (the *dist* directory, that contains the static content) are copied.

After we build it again, the image is ready to serve the static content. The default port will be 80 for Nginx, so something like *-p 8000:80* will work, so the parameters of the RUN command need to be changed a bit.

```bash
# The first FROM is now a stage called build-stage
# ---- Build stage ----

FROM node:20 AS build-stage 

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

# This is a new stage, everything before this is gone, except for the files that we want to COPY
# ---- Production stage ----
FROM nginx:1.25-alpine

# COPY the directory dist from the build-stage to /usr/share/nginx/html
# The target location here was found from the Docker hub page

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

# nginx 默认就会启动
```

| command           | `docker build . -t hello-front` | `docker build -t my-vite-app .` |
| ----------------- | ------------------------------- | ------------------------------- |
| **镜像名称**      | hello-front                     | my-vite-app                     |
| **tag 默认值**    | latest                          | latest                          |
| **build context** | 当前目录                        | 当前目录                        |
| **效果区别**      | 无本质区别                      | 无本质区别                      |

## 如何添加环境变量在容器启动的时候

![image-20251028122735772](/Users/chenruo/Library/Application Support/typora-user-images/image-20251028122735772.png)

```bash
# ---- Build stage ----
FROM node:20 AS build-stage

WORKDIR /usr/src/app

# 定义可传入的参数
ARG VITE_API_URL

COPY . .

# 把环境变量注入构建环境
ENV VITE_API_URL=$VITE_API_URL

RUN npm ci
RUN npm run build

```

```bash
# 构建镜像，不会启动服务
docker build -f ./dev.Dockerfile -t hello-front-dev .

# 运行容器，把 容器的 5173 端口映射到宿主机的 5173 端口
docker run -it --rm -p 5173:5173 hello-front-dev

# docker run -it hello-front-dev bash 
# 不过这个命令会build出新的容器
```

| 参数              | 含义                          |
| ----------------- | ----------------------------- |
| `-it`             | 交互模式（方便看日志）        |
| `--rm`            | 容器停止后自动删除            |
| `-p 5173:5173`    | 宿主机端口:容器端口           |
| `hello-front-dev` | 镜像名（就是你 build 的 tag） |

# Communication between containers in a Docker network

[Busybox](https://www.busybox.net/) is a small executable with multiple tools that you may need. It is called "The Swiss Army Knife of Embedded Linux", and we definitely can use it to our advantage.

While the hello-front-dev is running, we can do the request with [wget](https://en.wikipedia.org/wiki/Wget) since it's a tool included in Busybox to send a request from the debug-helper to hello-front-dev.

```bash
docker compose -f docker-compose.dev.yml run debug-helper wget -O - http://app:5173

# 跑这段的时候，容器也需要run
```

The URL is the interesting part here. We simply said to connect to port 5173 of the service *app*. *app* is the name of the service specified in the *docker-compose.dev.yml* file:

### 使用 **volumes + Nodemon** 来做热重载开发

- **volumes**：把宿主机的后端源码挂载到容器里，这样你在本地改代码，容器里的应用也会看到变化。
- **Nodemon**：监控源码变化，自动重启后端服务器。

作用：你不用每次改后端代码都重新 build 容器，直接改就能生效。

# Communications between containers in a more ambitious environment

There are multiple different options for a reverse proxy implementation, such as Traefik, Caddy, Nginx, and Apache (ordered by initial release from newer to older). Our pick is [Nginx](https://hub.docker.com/_/nginx).

> *A reverse proxy is a type of proxy server that retrieves resources on behalf of a client from one or more servers. These resources are then returned to the client, appearing as if they originated from the reverse proxy server itself.*
>
> **反向代理**就是**客户端的“前台门卫”**，接收所有请求，然后把请求分发到真正的服务器，最终把响应返回给客户端。

```
客户端
   |
   v
[反向代理服务器]
   |       \
   v        v
[后端服务器1] [后端服务器2]

```

假设你有一个网站：

- 静态资源服务器：`10.0.0.2`
- API 服务器：`10.0.0.3`

你部署了一个 Nginx 反向代理：

```nginx
server {
    listen 80;

    location / {
        proxy_pass http://10.0.0.2;  # 静态资源
    }

    location /api/ {
        proxy_pass http://10.0.0.3;  # API 请求
    }
}
```

客户端请求：

- `/index.html` → Nginx 转发到 `10.0.0.2`
- `/api/users` → Nginx 转发到 `10.0.0.3`

客户端只和 Nginx 打交道，不知道后端实际 IP。

反向代理的好处挺多，我帮你整理成几个重点，分技术角度和运维角度来看：

------

### 1️⃣ **负载均衡**

- 多台后端服务器处理请求，反向代理根据算法（轮询、最少连接、IP 哈希等）分发流量。
- **好处**：避免单台服务器过载，提高可用性和性能。

------

### 2️⃣ **安全性**

- 隐藏真实后端服务器的 IP。
- 可以做请求过滤、防火墙、限流等。
- **好处**：减少直接攻击风险，保护后端服务。

------

### 3️⃣ **缓存与加速**

- 对静态内容（图片、CSS、JS）做缓存。
- 减少后端服务器压力，提高响应速度。
- **好处**：更快的页面加载，更低的服务器负载。

------

### 4️⃣ **统一入口 & 路由管理**

- 前端只访问一个 URL，反向代理根据路径或域名转发到不同服务。
- **好处**：多个服务统一对外暴露，内部架构可以灵活调整。

------

### 5️⃣ **HTTPS/TLS 终端**

- 可以在反向代理上统一处理 HTTPS，后端只处理 HTTP。
- **好处**：简化证书管理，减轻后端负担。

------

### 6️⃣ **高可用与故障切换**

- 当某台后端服务器宕机，反向代理可以自动切换到可用服务器。
- **好处**：提高系统可用性，减少宕机影响。

## nginx 统一代理前后端接口

目标是 **在前端和后端前面加一个 Nginx 反向代理**，实现一个开发环境下的统一入口。意思是你不用直接访问前端的 5173 端口或者后端的 4000 端口，而是通过 nginx 统一代理请求到相应的服务

1. 创建 `nginx.dev.conf`

这个文件就是 Nginx 的配置，告诉它：

- `/` 路径的请求转发到前端 `todo-frontend` 的 5173 端口
- `/api` 的请求转发到后端 `todo-backend` 的 4000 端口

The *proxy_pass* directive has an interesting feature with a trailing slash. As we are using the path */api* for location but the backend application only answers in paths */* or */todos* we will want the */api* to be removed from the request. In other words, even though the browser will send a GET request to */api/todos/1* we want the Nginx to proxy the request to */todos/1*. Do this by adding a trailing slash */* to the URL at the end of *proxy_pass*.

```nginx
events {}

http {
    upstream frontend {
        server todo-frontend:5173;
    }

    upstream backend {
        server todo-backend:3000;
    }

    server {
        listen 80;

        # 前端请求
        location / {
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_pass http://frontend;
        }

        # 后端 API 请求
        location /api/ {
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_pass http://backend;
        }
    }
}

```

![image-20251028153713156](/Users/chenruo/Library/Application Support/typora-user-images/image-20251028153713156.png)

frontend should access the backend through Nginx, so the requests should be done to http://localhost:8080/api/todos: 这句话的意思，就是直接请求后端数据了，但是前端资源是什么阶段获取呢 用中文

###### ChatGPT 说：

用中文解释就是：

这句话的意思是 **前端应用（React）在运行时请求后端数据的时候，要通过 Nginx 转发到后端**，所以请求 URL 是 `http://localhost:8080/api/todos`。

至于 **前端资源（HTML/JS/CSS）** 是在浏览器第一次访问网站的时候获取的，也就是**初始加载阶段**：

1. 浏览器打开 `http://localhost:8080`
2. Nginx 将请求转发到前端容器（5173 端口），前端容器返回 React 的源码（HTML + JS + CSS）
3. 浏览器下载并执行这些资源，React 应用开始运行

随后，React 应用内部的请求（比如获取 `/api/todos` 数据）就通过 Nginx 转发到后端容器，这属于 **运行时阶段**，和初始加载前端资源是分开的两个阶段。

简单说就是：

- **初始加载阶段** → 获取前端资源（HTML/JS/CSS）
- **运行时阶段** → React 应用在浏览器里向 `/api` 请求后端数据

Heavyweight container orchestration tools like [Kubernetes](https://kubernetes.io/) allow us to manage containers on a completely new level. These tools hide away the physical machines and allow us, the developers, to worry less about the infrastructure.

If you are interested in learning more in-depth about containers come to the [DevOps with Docker](https://devopswithdocker.com/) course and you can find more about Kubernetes in the advanced 5 credit [DevOps with Kubernetes](https://devopswithkubernetes.com/) course. You should now have the skills to complete both of them!



非常好 👏，你的生产版 `docker-compose.yml` 基本正确！
 只差一个关键细节 👇，这就是为什么你的 **代理没真正起作用** 的原因。

------

## ⚠️ 问题出在这里：

你在 Nginx 容器里挂载了：

```
volumes:
  - ./nginx.conf:/etc/nginx/nginx.conf:ro
```

这表示你覆盖了整个 **Nginx 主配置文件**（`/etc/nginx/nginx.conf`），
 而不是 **默认的站点配置文件**（`/etc/nginx/conf.d/default.conf`）。

👉 所以如果你 `nginx.conf` 文件里写的是下面这种完整结构：

```
events {}
http {
  upstream backend {
    server todo-backend:3000;
  }
  upstream frontend {
    server todo-frontend:80;
  }

  server {
    listen 80;

    location / {
      proxy_pass http://frontend;
    }

    location /api/ {
      rewrite ^/api/(.*)$ /$1 break;
      proxy_pass http://backend;
    }
  }
}
```

那是 ✅ 正确的完整 nginx.conf。
 但如果你误写成了只包含 `server { ... }` 这一段（没有 `events`、`http` 块），
 那么 nginx 启动时会报错：

```
"events" directive is not allowed here
```

------

## ✅ 正确做法有两种：

### **方案 A（推荐）**

保持你的 nginx.conf 是完整的文件（包含 `events` 和 `http` 块），保持挂载方式不变：

```
volumes:
  - ./nginx.conf:/etc/nginx/nginx.conf:ro
```

> ✅ 这样 nginx.conf 作为主配置文件工作。

------

### **方案 B**

如果你的配置文件只有 `server { ... }` 这一层，就要改成挂载到默认路径：

```
volumes:
  - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro
```

> ✅ 这样它会被包含在 nginx 默认的主配置 `/etc/nginx/nginx.conf` 中。

# host sync contianer with yml 【WIP】

宿主机的依赖和容器的依赖不互通，开发安装以来是会出现不同的问题。

## 方案 1：在运行中的容器里执行安装命令

```bash
docker exec hello-front-dev npm install axios
```

`docker exec` = 在一个正在运行的容器里执行命令

`hello-front-dev` = 容器名字（你可以通过 `docker ps` 查到）

`npm install axios` = 在容器内部安装依赖

这样安装的依赖会被添加到容器内部的 `node_modules`。
如果你还挂载了本地目录（包含 `package.json`），也会自动把 `axios` 写入你的 `package.json`。

但 ⚠️ 注意：**一旦容器被删除（`--rm`）这些安装的依赖也会丢失**。

## 方案 2：改 `package.json`，重新构建镜像

更“永久”的做法：

1. 编辑你的 `package.json`，加上：

   ```
   "dependencies": {
     "axios": "^1.7.2"
   }
   ```

2. 重新构建镜像：

   ```
   docker build -f ./dev.Dockerfile -t hello-front-dev .
   ```

这样 Dockerfile 里的 `npm ci` 或 `npm install` 会重新安装所有依赖，包括新加的 `axios`。

👉 优点：镜像变成新的、可重复的开发环境
 👉 缺点：每次加依赖都要重新 build（稍微慢一些）

## 方案3: 通过yml，自动挂载本地node_modules 或通过 npm install 自动同步依赖

```pgsql
project-root/
├── src/
├── package.json
├── package-lock.json
├── dev.Dockerfile
└── docker-compose.dev.yml
```

```Dockerfile
# dev.Dockerfile
FROM node:20-alpine

WORKDIR /usr/src/app

# 安装依赖（先复制 package.json）
COPY package*.json ./

RUN npm install

# 默认命令交给 compose 覆盖
CMD ["npm", "run", "dev"]

```

```yml
version: '3.9'
# docker-compose.dev.yml
services:
  todo-frontend:
    build:
      context: .
      dockerfile: dev.Dockerfile
    container_name: hello-front-dev
    ports:
      - "5173:5173"  # Vite 默认端口
    environment:
      - CHOKIDAR_USEPOLLING=true   # 让热更新在容器内也能工作
    volumes:
      - .:/usr/src/app              # 挂载代码
      - /usr/src/app/node_modules   # 保留容器内 node_modules，避免冲突
    command: npm run dev

```

```bash
docker compose -f docker-compose.dev.yml up
# 启动开发环境
```

dev.Dockerfile（热更新用）

test.Dockerfile（CI 测试用）

prod.Dockerfile（正式构建用）



# QA

## 1.如何script 创建文件

Step 3: Run curl http://helsinki.fi and save the output into a file. Save that file into your repository as file script-answers/exercise12_1.txt. The directory script-answers was created in the previous step. 用command 完成这件事情

你可以用下面这一条命令一步完成：

```
curl http://helsinki.fi -o script-answers/exercise12_1.txt
```

解释：

- `curl http://helsinki.fi`：请求这个网址的内容。
- `-o script-answers/exercise12_1.txt`：把输出保存到指定文件路径。

⚠️ 确保当前目录下 **已经存在** `script-answers/` 这个文件夹（如果是上一步创建的，就没问题）。
 若不存在，可以先执行：

```
mkdir -p script-answers
```

然后再运行上面的 `curl` 命令。

## 2.some command

会在容器内的 `script-answers/` 目录下得到一个 `exercise12_1.txt` 文件，里面是网页内容

```bash
mkdir -p script-answers
curl http://helsinki.fi -o script-answers/exercise12_1.txt
```

```bash
# 想查看文件内容
cat script-answers/exercise12_1.txt

# 想退出容器
exit

# 创建目录 `/usr/src/app` 的命令
mkdir -p /usr/src/app

# 查看文件夹是否存在
ls -l /usr/src

# 创建文件 `/usr/src/app/index.js`
# `touch` 命令会新建一个空文件（如果文件已存在，则更新其修改时间）
touch /usr/src/app/index.js

# 里面写内容
echo "console.log('Hello from index.js');" > /usr/src/app/index.js

# 查看内容
cat /usr/src/app/index.js

```

![image-20251025131141794](/Users/chenruo/Library/Application Support/typora-user-images/image-20251025131141794.png)

![image-20251025143906833](/Users/chenruo/Library/Application Support/typora-user-images/image-20251025143906833.png)

```bash
# 查看宿主机里想要存的文件的路径
pwd
# 复制容器文件到宿主机里
docker cp condescending_blackburn:/script-answers/exercise12_4.txt /Users/chenruo/Documents/GitHub/part12-containers-applications/script-answers

Successfully copied 689kB to /Users/chenruo/Documents/GitHub/part12-containers-applications/script-answers
```

```bash
# 镜像list
docker image ls 


# 从镜像 hello-node-world 启动一个新容器，并在其中打开一个交互式 Bash 终端
docker run -it hello-node-world bash
# or
docker run -it --name testtest hello-node-world bash

# 删除容器
docker container rm condescending_blackburn

# 只想看文件名
ls script-answers 

# 查看正在运行的容器
docker ps 

# 查看所有容器（包括已退出的）
docker ps -a 

# 保留修改并生成新的镜像
docker commit <container_name> my-node-app:latest

# <container_name> → 容器名字或 ID
# my-node-app:latest → 新镜像名字和标签
# 那就是我每提交一次就会有一个新的镜像？完全正确 ✅在 Docker 中，每次你执行 docker commit 都会生成 一个新的镜像，即使是基于同一个容器：
# cdb0180cb21d node:20 "docker-entrypoint.s…" 4 minutes ago Up 4 minutes hello-node 我要commit这次

docker commit cdb0180cb21d my-node-app:latest
```

![image-20251025150028791](/Users/chenruo/Library/Application Support/typora-user-images/image-20251025150028791.png)

## 3. 退出或删除容器，文件就会丢失

> 镜像是静态的、只读的；你永远在 **容器** 里做改动，然后用 `docker commit` 把改动保存成新镜像
>
> 拉取镜像 → 创建容器 → 安装包 → 新建文件 → commit 保存为新镜像

### 镜像

<mark>不能在镜像上直接安装包或写文件</mark>

1. **镜像（Image）**

- 镜像是静态的，只是文件系统的快照。
- 你 **不能直接在镜像里操作文件**。
- 所谓“在镜像里操作文件”，其实你一定是启动了一个 **容器**，然后在容器里做改动。

1. **容器（Container）**

- 容器是镜像的运行实例，你在里面安装软件、创建文件、修改内容，才是真正操作的文件系统。
- 容器停止后，除非 commit 或使用 volume，否则改动会丢失。

### 容器

And now we can run node /usr/src/app/index.js in the container. We can commit this as another new image 我复制了一了文件进container ，还需要commit?

你已经用 `docker cp` 把文件放到容器里，比如 `/usr/src/app/index.js`。

- 这时 **文件只在这个容器实例里存在**
- 如果你退出或删除容器，文件就会丢失

<mark>如果想保留修改需要commit生成新的镜像，下次可以从新的镜像中创建新的容器再修改内容。</mark>
<mark>但我印象中，commit之后，还可以重新进容器中，拥有上次的修改内容，然后再次commit也可以。</mark>

``` bash
# 用 docker commit 把当前容器的状态保存为一个新镜像
docker commit <container_name> my-node-app:latest
```

- `<container_name>` → 容器名字或 ID
- `my-node-app:latest` → 新/旧镜像名字和标签

之后，你可以用这个镜像直接启动新容器，里面已经有你修改过的 `/usr/src/app/index.js` 文件了。

- **如果只是临时在容器里运行** `node /usr/src/app/index.js` → 不必 commit
- **如果想保存修改、生成可复用镜像** → 必须 commit

### 操作步骤

```bash
# run 这是从镜像创建新容器进行修改
docker run -it fs-world-app bash

# or 直接进入容器，在容器上修改
docker start -ai objective_easley

# 进bash
docker start library-frontend-dev
docker exec -it library-reverse-proxy-prod bash

# modify sth && exit 

# commit command example
docker commit fs-hello-world-container-v2 fs-world-app:latest

# option 1 - find container id
docker commit <container id> fs-world-app:latest
# option 2 - name also ok
docker commit objective_easley fs-world-app:latest

docker compose -f docker-compose.yml logs -f library-frontend-prod
docker compose -f docker-compose.yml logs -f nginx
```

## 4. Dockerfile

想用 **Dockerfile** 来创建一个包含 “Hello, World!” 应用的新镜像，而不是每次手动修改容器。

在你的项目根目录（假设包含 `index.js`）新建一个文件：`Dockerfile`

然后写入以下内容：

```bash
# 使用 Node 官方镜像作为基础
FROM node:20

# 设置工作目录（容器内部路径）
WORKDIR /usr/src/app

# 将当前目录的所有文件复制到工作目录
COPY . .

# 安装依赖（假设 package.json 已经存在）
RUN npm install

# 暴露端口 3000 给宿主机映射
EXPOSE 3000

# 容器启动时运行 `node index.js`
CMD ["node", "index.js"]
```

在 Dockerfile 所在目录运行：

```
docker build -t hello-world-app .
```

- `-t hello-world-app` → 给镜像起个名字
- `.` → 当前目录作为 build 上下文

```bash
# 根据images 创建新容器，并在容器里修改内容，不可以直接在images里修改东西。给name是方便区别，不然全是id
docker run -it --name fs-hello-world fs-world-app bash

# docker start -ai fs-world-container
```

- 容器启动后会执行 `node index.js`
- 你会看到控制台输出 “Hello, World!”

### 优点

- 不需要手动修改容器或复制文件
- 镜像可以重复构建、版本化
- Dockerfile 记录了创建镜像的完整步骤，可复现

```bash
docker run -it --name fs-hello-world-container:v2 fs-world-app bash

rm index2.js index.js

exit

docker container ls
docker build -t fs-hello-world . 

# 想在宿主机访问容器 3000 端口，需要用 -p 映射：
docker run -p 3000:3000 <image-name>

# docker build -t express-server . && docker run -p 3123:3000 express-server ? 

# 从正在运行的container里进去交互
docker exec -it stupefied_ganguly bash
docker exec -it library-frontend-dev sh

# 使用 docker exec 进入mongo容器并打开 mongo-cli
docker exec -it todo-backend-mongo-1 mongosh -u root -p example

# 使用 docker exec 进入容器并打开 redis-cli
docker exec -it todo-backend-redis-1 redis-cli

# 进入bash
docker exec -it library-reverse-proxy-dev bash

# 查看reverse proxy 是否成功代理，进入reverse proxy 中，请求前后端接口
docker exec -it library-reverse-proxy-dev bash
curl http://library-backend-mongodb:4000
curl http://library-frontend:5173

```

![image-20251025193947080](/Users/chenruo/Library/Application Support/typora-user-images/image-20251025193947080.png)

![image-20251025203908503](/Users/chenruo/Library/Application Support/typora-user-images/image-20251025203908503.png)

![image-20251025203807437](/Users/chenruo/Library/Application Support/typora-user-images/image-20251025203807437.png)

The meaning of each line is explained as a comment. If you want to see the full specification see the [documentation](https://docs.docker.com/compose/compose-file/).

Now we can use *docker compose up* to build and run the application. If we want to rebuild the images we can use *docker compose up --build*.

You can also run the application in the background with *docker compose up -d* (*-d* for detached) and close it with *docker compose down*.

```bash
# cp /path/to/source.txt /path/to/destination.txt
# 完整复制文件，包括内容和文件名 在容器和宿主机之间复制文件
docker cp <container_name>:/path/in/container/file.txt /path/on/host/
# pwd 看host文件路径
cp script-answers/exercise12_3.txt script-answers/exercise12_3_copy.txt
```

```
REDIS_URL=redis://localhost:3490 MONGO_URL=mongodb://root:example@localhost:3456/the_database?authSource=admin npm run dev
```

## 5. script record

```bash
script script-answers/exercise12_3.txt

# 回到命令行后输入：

exit
```

## 6. 报错nginx tcp报错无法pull

```
[+] Building 1.9s (3/3) FINISHED                                                                                                                                                docker:desktop-linux
 => [internal] load build definition from Dockerfile                                                                                                                                            0.0s
 => => transferring dockerfile: 504B                                                                                                                                                            0.0s
 => ERROR [internal] load metadata for docker.io/library/nginx:1.25-alpine                                                                                                                      1.9s
 => [internal] load metadata for docker.io/library/node:20                                                                                                                                      0.4s
------
 > [internal] load metadata for docker.io/library/nginx:1.25-alpine:
------
Dockerfile:15
--------------------
  13 |     # This is a new stage, everything before this is gone, except for the files that we want to COPY
  14 |     
  15 | >>> FROM nginx:1.25-alpine
  16 |     
  17 |     # COPY the directory dist from the build-stage to /usr/share/nginx/html
--------------------
ERROR: failed to build: failed to solve: nginx:1.25-alpine: failed to resolve source metadata for docker.io/library/nginx:1.25-alpine: encountered unknown type text/html; children may not be fetched

View build details: docker-desktop://dashboard/build/desktop-linux/desktop-linux/21qjd7c5tc9ue95vey65g5u3y
```

切换镜像缘：

| 环境                               | 配置文件路径                                     |
| ---------------------------------- | ------------------------------------------------ |
| 🖥️ macOS / Windows (Docker Desktop) | 在 Docker Desktop → **Settings → Docker Engine** |
| 🐧 Linux (systemd 版 Docker)        | `/etc/docker/daemon.json`                        |

```json
{
  "builder": {
    "gc": {
      "defaultKeepStorage": "20GB",
      "enabled": true
    }
  },
  "experimental": false,
  "registry-mirrors": ["https://docker.m.daocloud.io"]
}

// 修改如上
```

## 7.

➜  library git:(main) ✗ docker compose -f docker-compose.yml logs -f library-frontend-prod docker volume inspect frontend_build ^C ➜  library git:(main) ✗ docker compose build library-frontend-prod 这两个命令有啥区别

###### ChatGPT 说：

明白，我来详细解释一下这两个命令的区别和作用，尤其是在你现在 **生产模式前端容器** 的场景下。

------

## 1️⃣ `docker compose -f docker-compose.yml logs -f library-frontend-prod`

- **作用**：查看已经启动的 `library-frontend-prod` 容器的日志，并持续跟踪 (`-f`)。
- **特点**：
  - 只能看到 **容器正在运行时的输出**。
  - 如果容器已经退出（export-stage 容器在生产模式下通常立即退出），**logs 会空**。
  - 不会触发 build 或运行过程，只是显示已有容器的 stdout/stderr。

> 这就是为什么你看不到任何输出——你的前端容器只是用来生成静态文件，并没有持续进程，所以容器启动后立即退出，没有日志。

------

## 2️⃣ `docker compose build library-frontend-prod`

- **作用**：强制 **重新构建前端镜像**（build 阶段）。
- **特点**：
  - 会执行 Dockerfile 中的所有指令，包括 `RUN npm install`、`RUN npm run build` 等。
  - 可以看到 build 阶段的输出，例如编译进度、警告、报错。
  - **不会启动容器**，只是生成镜像。
  - 对生产模式的前端来说，这是查看 build 输出的正确方式。

> 所以如果你想看打包过程或 debug build 阶段的问题，用 `docker compose build`。

------

## 3️⃣ 总结对比

| 命令                                           | 是否运行容器       | 是否显示 build 输出 | 是否显示容器日志    | 使用场景                                 |
| ---------------------------------------------- | ------------------ | ------------------- | ------------------- | ---------------------------------------- |
| `docker compose logs -f library-frontend-prod` | 不会运行新的 build | ❌                   | ✅（容器运行时输出） | 查看容器 stdout/stderr，调试运行中的服务 |
| `docker compose build library-frontend-prod`   | 不会启动容器       | ✅                   | ❌                   | 查看构建过程输出，debug build 阶段问题   |

------

### 💡 生产模式前端容器

- 容器启动后 **没有 CMD/ENTRYPOINT** → 容器立即退出 → logs 空。
- 如果你想确认 build 是否成功 → 用 `docker compose build` 或查看 volume 里的静态文件：

```
docker run --rm -v frontend_build:/export alpine ls /export
```

#### A. 启动前端 build 阶段生成静态文件

```
docker compose build library-frontend-prod
docker compose up library-frontend-prod
```

- 这个过程中，Docker 会自动创建 `frontend_build` volume。

- **注意**：前端容器启动后可能立即退出（export-stage），只要 build 成功，volume 就有静态文件。

- #### . 查看 volume 是否存在

  ```
  docker volume ls
  ```
