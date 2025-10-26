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
docker build -t fs-hello-world .  # a simple dot will mean to copy Dockerfile is in this directory
```

不是每个docker都有dockerfile。当你 **自己构建镜像** 时，才会有一个 `Dockerfile。`

#### 没有 Dockerfile 的情况

- 如果你是从 **Docker Hub 拉取现成的镜像**（比如 `node:20`、`ubuntu`、`hello-world`），
   你本地并不会自动拥有对应的 `Dockerfile`。
- 它们的 Dockerfile 是由镜像作者（官方或第三方）在构建时使用的，但不会被带到你的系统。

### 🧱 举个例子：

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

```
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

### 💡 但是！

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

### 🔁 总结一下区别：

| 情况                                   | 执行的命令                                      |
| -------------------------------------- | ----------------------------------------------- |
| `docker run hello-node`                | 执行 Dockerfile 里的 `CMD ["node", "index.js"]` |
| `docker run hello-node bash`           | 忽略 CMD，执行 `bash`                           |
| `docker run hello-node node --version` | 忽略 CMD，执行 `node --version`                 |

------

### 🧠 延伸：

`CMD` 是给镜像提供一个**默认行为**，方便别人使用时不必记住复杂的命令。
 但它并不强制执行 —— 用户运行容器时始终可以手动指定新命令来覆盖它。

| 特性                   | CMD                    | ENTRYPOINT                    | ENTRYPOINT + CMD                       |
| ---------------------- | ---------------------- | ----------------------------- | -------------------------------------- |
| 默认命令               | ✅                      | ✅                             | ✅                                      |
| 可被 `docker run` 覆盖 | ✅（容易）              | 🚫（不容易）                   | ✅（只覆盖参数）                        |
| 常见用途               | 提供默认行为           | 保证固定执行程序              | 同时有固定命令和默认参数               |
| 例子                   | `CMD ["npm", "start"]` | `ENTRYPOINT ["npm", "start"]` | `ENTRYPOINT ["npm"]` + `CMD ["start"]` |

```bash
docker run -p 3123:3000 express-server # The -p flag in the run command will inform Docker that a port from the host machine should be opened and directed to a port in the container. The format is -p host-port:application-port.
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

apt update && apt install -y nano
安装完再验证一次：

bash
复制代码
nano --version



```
docker compose -f docker-compose.dev.yml up -d
```

start the MongoDB with *docker compose -f docker-compose.dev.yml up -d*. With *-d* it will run it in the background. You can view the output logs with *docker compose -f docker-compose.dev.yml logs -f*. There the *-f* will ensure we *follow* the logs.

Bind mount is the act of binding a file (or directory) on the host machine to a file (or directory) in the container. A bind mount is done by adding a *-v* flag with *container run*. The syntax is *-v FILE-IN-HOST:FILE-IN-CONTAINER*. Since we already learned about Docker Compose let's skip that. The bind mount is declared under key *volumes* in *docker-compose.dev.yml*. Otherwise the format is the same, first host and then container:

```yml
  services:
    mongo:
      image: mongo
      ports:
       - 3456:27017
      environment:
        MONGO_INITDB_ROOT_USERNAME: root
        MONGO_INITDB_ROOT_PASSWORD: example
        MONGO_INITDB_DATABASE: the_database
      volumes:       
				- ./mongo/mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js
```

Run *docker compose -f docker-compose.dev.yml down --volumes* to ensure that nothing is left and start from a clean slate with *docker compose -f docker-compose.dev.yml up* to initialize the database.

```
MONGO_URL=mongodb://root:example@localhost:3456/the_database?authSource=admin npm run dev
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

```
REDIS_URL=redis://localhost:3490 MONGO_URL=mongodb://root:example@localhost:3456/the_database?authSource=admin npm run dev
```





# QA

## 1

Step 3: Run curl http://helsinki.fi and save the output into a file. Save that file into your repository as file script-answers/exercise12_1.txt. The directory script-answers was created in the previous step. 用command 完成这件事情

###### ChatGPT 说：

你可以用下面这一条命令一步完成：

```
curl http://helsinki.fi -o script-answers/exercise12_1.txt
```

### 解释：

- `curl http://helsinki.fi`：请求这个网址的内容。
- `-o script-answers/exercise12_1.txt`：把输出保存到指定文件路径。

⚠️ 确保当前目录下 **已经存在** `script-answers/` 这个文件夹（如果是上一步创建的，就没问题）。
 若不存在，可以先执行：

```
mkdir -p script-answers
```

然后再运行上面的 `curl` 命令。

## 2

Unable to find image 'ubuntu:latest' locally latest: Pulling from library/ubuntu b8a35db46e38: Pull complete  Digest: sha256:66460d557b25769b102175144d538d88219c077c678a49af4afca6fbfc1b5252 Status: Downloaded newer image for ubuntu:latest root@b7b95f6b3de0:/ 最后一行是需要我干啥

###### ChatGPT 说：

你看到的这行：

```
root@b7b95f6b3de0:/#
```

表示你**已经进入了一个 Ubuntu 容器的命令行环境**。
 现在你在这个容器的根目录 `/` 下，拥有 root 权限。

也就是说——Docker 的 Ubuntu 镜像已经下载并启动成功，现在可以在这个环境里执行命令了。

------

✅ **下一步你要做的事情：**
 在这个提示符下（`root@...:/#` 后面），执行刚才的命令：

```
mkdir -p script-answers
curl http://helsinki.fi -o script-answers/exercise12_1.txt
```

然后你就会在容器内的 `script-answers/` 目录下得到一个 `exercise12_1.txt` 文件，里面是网页内容。

------

💡**小贴士：**

- 想查看文件内容，可以运行：

  ```
  cat script-answers/exercise12_1.txt
  ```

- 想退出容器，输入：

  ```
  exit
  ```

## 3

Create directory /usr/src/app 的 command

###### ChatGPT 说：

在你当前的 Ubuntu 容器中，创建目录 `/usr/src/app` 的命令是：

```
mkdir -p /usr/src/app
```

### 解释：

- `mkdir`：创建目录
- `-p`：如果上层目录不存在（比如 `/usr/src`），会自动一并创建，不报错

✅ 执行完后，你可以用下面的命令确认是否创建成功：

```
ls -l /usr/src
```

应该能看到一个名为 `app` 的文件夹。

## 4

Create a file /usr/src/app/index.js

###### ChatGPT 说：

你可以在 Ubuntu 容器中用以下命令创建文件 `/usr/src/app/index.js`：

```
touch /usr/src/app/index.js
```

✅ 说明：

- `touch` 命令会新建一个空文件（如果文件已存在，则更新其修改时间）。

------

💡 如果你想直接往里面写内容（例如测试一下），可以用：

```
echo "console.log('Hello from index.js');" > /usr/src/app/index.js
```

然后查看文件内容：

```
cat /usr/src/app/index.js
```

![image-20251025131141794](/Users/chenruo/Library/Application Support/typora-user-images/image-20251025131141794.png)

![image-20251025143906833](/Users/chenruo/Library/Application Support/typora-user-images/image-20251025143906833.png)

```
docker cp condescending_blackburn:/script-answers/exercise12_4.txt /Users/chenruo/Documents/GitHub/part12-containers-applications/script-answers 
Successfully copied 689kB to /Users/chenruo/Documents/GitHub/part12-containers-applications/script-answers
```

```bash
docker image ls 

docker run -it hello-node-world bash

docker container rm condescending_blackburn

ls script-answers # 只想看文件名

docker ps # 查看正在运行的容器

docker ps -a # 查看所有容器（包括已退出的）

# 保留修改并生成新的镜像
docker commit <container_name> my-node-app:latest
# <container_name> → 容器名字或 ID
# my-node-app:latest → 新镜像名字和标签
那就是我每提交一次就会有一个新的镜像？完全正确 ✅在 Docker 中，每次你执行 docker commit 都会生成 一个新的镜像，即使是基于同一个容器：

cdb0180cb21d node:20 "docker-entrypoint.s…" 4 minutes ago Up 4 minutes hello-node 我要commit这次

docker commit cdb0180cb21d my-node-app:latest

docker images
```

![image-20251025150028791](/Users/chenruo/Library/Application Support/typora-user-images/image-20251025150028791.png)

## 5

And now we can run node /usr/src/app/index.js in the container. We can commit this as another new image 我复制了一了文件进container ，还需要commit?

###### ChatGPT 说：

对，你理解得基本正确，但这里需要区分两件事情：

------

### 1️⃣ 复制文件到容器

你已经用 `docker cp` 把文件放到容器里，比如 `/usr/src/app/index.js`。

- 这时 **文件只在这个容器实例里存在**
- 如果你退出或删除容器，文件就会丢失

------

### 2️⃣ 如果想保留修改并生成新的镜像

- 这时就需要用 **`docker commit`** 把当前容器的状态保存为一个新镜像

示例：

```
docker commit <container_name> my-node-app:latest
```

- `<container_name>` → 容器名字或 ID
- `my-node-app:latest` → 新镜像名字和标签

之后，你可以用这个镜像直接启动新容器，里面已经有你修改过的 `/usr/src/app/index.js` 文件了。

------

### ✅ 小结：

- **如果只是临时在容器里运行** `node /usr/src/app/index.js` → 不必 commit
- **如果想保存修改、生成可复用镜像** → 必须 commit

------

我可以帮你写一条完整命令，让你 **运行 node、测试文件，然后生成新镜像**。你希望我写吗？

## 6

docker commit 157d8af44e4f express-server:latest Error response from daemon: No such container: 157d8af44e4f

###### ChatGPT 说：

明白了，这个错误很关键：

> `docker commit` 只能提交 **容器** 的更改，不能直接提交 **镜像 ID**。

你现在用的是：

```
docker commit 157d8af44e4f express-server:latest
```

而 `157d8af44e4f` 是 **镜像 ID**，不是容器 ID，所以报错 **No such container**。

------

### ✅ 正确做法

1. **找出你修改后的容器 ID 或名字**

```
docker ps -a
```

输出示例：

```
CONTAINER ID   IMAGE             STATUS         NAMES
a357683b7c9e   express-server    Exited (0)     my-container
```

这里的 `a357683b7c9e` 才是容器 ID。

------

1. **使用容器 ID 进行 commit**

```
docker commit a357683b7c9e express-server:latest
```

- 这条命令会把容器当前的状态（你在里面安装的包、创建的文件等）保存为 **新的镜像**
- 用同名 tag `express-server:latest` 会 **覆盖原镜像**

------

### 💡 总结

| 错误用法                           | 正确用法 |
| ---------------------------------- | -------- |
| `docker commit <IMAGE_ID> ...`     | ❌ 报错   |
| `docker commit <CONTAINER_ID> ...` | ✅ 成功   |

## 7

我不是在容器里操作的，我是在镜像里操作的文件

###### ChatGPT 说：

啊，明白了，你的误区就在这里了 😅

------

## 关键概念澄清

1. **镜像（Image）**

- 镜像是静态的，只是文件系统的快照。
- 你 **不能直接在镜像里操作文件**。
- 所谓“在镜像里操作文件”，其实你一定是启动了一个 **容器**，然后在容器里做改动。

1. **容器（Container）**

- 容器是镜像的运行实例，你在里面安装软件、创建文件、修改内容，才是真正操作的文件系统。
- 容器停止后，除非 commit 或使用 volume，否则改动会丢失。

------

### 🔑 正确思路

- 你不能在镜像上直接安装包或写文件。

- 正确流程是：

  1. 从镜像创建一个容器：

     ```
     docker run -it express-server bash
     ```

  2. 在容器里操作文件/安装包：

     ```
     apt update
     apt install nano
     echo "console.log('Hello World')" > /usr/src/app/index.js
     ```

  3. **退出容器**（`exit`）

  4. **在宿主机 commit 容器** 保存为新镜像：

     ```
     docker commit <container_id> express-server:latest
     ```

> 注意：commit 是针对 **容器**，不是镜像。你在宿主机上执行即可。

------

### ⚡ 总结一句话

> 镜像是静态的、只读的；你永远在 **容器** 里做改动，然后用 `docker commit` 把改动保存成新镜像。

------

如果你愿意，我可以帮你写一个 **完整操作流程命令**：
 从拉取镜像 → 创建容器 → 安装包 → 新建文件 → commit 保存为新镜像，保证你退出后再进，所有改动都存在。

## 8



## ✅ 修改文件的正确流程

### 1️⃣ 基于镜像创建容器（启动交互式终端）

假设你想修改 `my-node-app:v2` 镜像里的文件：

```
docker run -it --name my-node-container my-node-app:v2 bash
```

- `-it` → 进入交互式终端
- `--name` → 给容器取个名字，方便管理
- 容器启动后，你就可以修改文件了

------

### 2️⃣ 在容器里修改文件

```
nano /usr/src/app/index.js
# 或者直接 echo 新内容
echo "console.log('Updated!');" > /usr/src/app/index.js
```

安装包、修改文件都可以在这里进行。

------

### 3️⃣ 退出容器

```
exit
```

- 容器停止，但改动还在容器层。

------

### 4️⃣ 保存改动为新镜像

```
docker commit my-node-container my-node-app:v3
```

- 新镜像 `my-node-app:v3` 包含你在容器里修改的文件和安装的包
- 下次运行这个镜像就能看到改动

```
docker run -it my-node-app:v3 bash
```

------

### ⚡ 总结

- **不能直接修改镜像**
- **修改文件必须在容器里进行**
- **修改完成后 commit 为新镜像**，才能永久保存

## 9

想用 **Dockerfile** 来创建一个包含 “Hello, World!” 应用的新镜像，而不是每次手动修改容器。下面我帮你一步步操作。

------

## 1️⃣ 创建 Dockerfile

在你的项目根目录（假设包含 `index.js`）新建一个文件：

```
Dockerfile
```

然后写入以下内容：

```
# 使用 Node 官方镜像作为基础
FROM node:20

# 设置工作目录（容器内部路径）
WORKDIR /usr/src/app

# 将当前目录的所有文件复制到工作目录
COPY . .

# 安装依赖（假设 package.json 已经存在）
RUN npm install

# 暴露端口（可选，如果应用监听端口）
EXPOSE 3000

# 容器启动时执行命令
CMD ["node", "index.js"]
```

------

### 🔹 解释

| 指令                       | 作用                                     |
| -------------------------- | ---------------------------------------- |
| `FROM node:20`             | 选择基础镜像 Node 20                     |
| `WORKDIR /usr/src/app`     | 设置工作目录，后续命令都在这个路径下执行 |
| `COPY . .`                 | 将当前项目目录所有文件复制到容器中       |
| `RUN npm install`          | 安装 Node.js 依赖                        |
| `EXPOSE 3000`              | 暴露端口 3000 给宿主机映射               |
| `CMD ["node", "index.js"]` | 容器启动时运行 `node index.js`           |

------

## 2️⃣ 构建镜像

在 Dockerfile 所在目录运行：

```
docker build -t hello-world-app .
```

- `-t hello-world-app` → 给镜像起个名字
- `.` → 当前目录作为 build 上下文

------

## 3️⃣ 运行容器

```bash
# 根据images 创建新容器，并在容器里修改内容，不可以直接在images里修改东西。给name是方便区别，不然全是id
docker run -it --name fs-hello-world fs-world-app bash

# docker start -ai fs-world-container
```

- 容器启动后会执行 `node index.js`
- 你会看到控制台输出 “Hello, World!”

------

## ✅ 优点

- 不需要手动修改容器或复制文件
- 镜像可以重复构建、版本化
- Dockerfile 记录了创建镜像的完整步骤，可复现

```bash
docker run -it --name fs-hello-world-container:v2 fs-world-app bash

rm index2.js index.js

exit

docker commit fs-hello-world-container-v2 fs-world-app:latest
# or

docker run -it fs-world-app bash

# modify

exit 

# or 在容器上修改，并commit到images里
docker start -ai objective_easley

# find container id
docker commit <container id> fs-world-app:latest
# name also ok
docker commit objective_easley fs-world-app:latest

# 
docker container ls
docker build -t fs-hello-world . 

# 想在宿主机访问容器 3000 端口，需要用 -p 映射：
docker run -p 3000:3000 <image-name>

# docker build -t express-server . && docker run -p 3123:3000 express-server ? 

# 从正在运行的container里进去交互
docker exec -it stupefied_ganguly bash

# 使用 docker exec 进入mongo容器并打开 mongo-cli
docker exec -it todo-backend-mongo-1 mongosh -u root -p example

# 使用 docker exec 进入容器并打开 redis-cli
docker exec -it todo-backend-redis-1 redis-cli

```

![image-20251025193947080](/Users/chenruo/Library/Application Support/typora-user-images/image-20251025193947080.png)

![image-20251025203908503](/Users/chenruo/Library/Application Support/typora-user-images/image-20251025203908503.png)

![image-20251025203807437](/Users/chenruo/Library/Application Support/typora-user-images/image-20251025203807437.png)

The meaning of each line is explained as a comment. If you want to see the full specification see the [documentation](https://docs.docker.com/compose/compose-file/).

Now we can use *docker compose up* to build and run the application. If we want to rebuild the images we can use *docker compose up --build*.

You can also run the application in the background with *docker compose up -d* (*-d* for detached) and close it with *docker compose down*.

```
cp /path/to/source.txt /path/to/destination.txt
完整复制文件，包括内容和文件名 在容器和宿主机之间复制文件
docker cp <container_name>:/path/in/container/file.txt /path/on/host/
pwd 看host文件路径
例如：

cp script-answers/exercise12_3.txt script-answers/exercise12_3_copy.txt
```

```
3️⃣ 启动 script 来录制你的操作
script script-answers/exercise12_3.txt

回到命令行后输入：

exit
```

```
REDIS_URL=redis://localhost:3490 MONGO_URL=mongodb://root:example@localhost:3456/the_database?authSource=admin npm run dev
```

