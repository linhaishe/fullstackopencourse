#  CI/CD 

Continuous Integration / Continuous Delivery systems

# Introduction to CI/CD

## What is CI?

The strict definition of CI (Continuous Integration) and the way the term is used in the industry may sometimes be different. One influential but quite early (written already in 2006) discussion of the topic is in [Martin Fowler's blog](https://www.martinfowler.com/articles/continuousIntegration.html).

Strictly speaking, CI refers to [merging developer changes to the main branch](https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment) often, Wikipedia even helpfully suggests: "several times a day". This is usually true but when we refer to CI in industry, we're quite often talking about what happens after the actual merge happens.

We'd likely want to do some of these steps:

- Lint: to keep our code clean, maintainable, and merge compatible
- Build: put all of our code together into runnable software bundle
- Test: to ensure we don't break existing features
- Package: Put it all together in an easily movable batch
- Deploy: Make it available to the world

We'll discuss each of these steps (and when they're suitable) in more detail later. What is important to remember is that this process should be strictly defined.

Usually, strict definitions act as a constraint on creativity/development speed. This, however, should usually not be true for CI. This strictness should be set up in such a way as to allow for easier development and working together. Using a good CI system (such as GitHub Actions that we'll cover in this part) will allow us to do this all automagically.

It may be worthwhile to note that packaging and especially deployment are sometimes not considered to fall under the umbrella of CI. We'll add them in here because in the real world it makes sense to lump it all together. 

### Is this CD thing related?

The terms *Continuous Delivery* and *Continuous Deployment* (both of which have the acronym CD) are often used when one talks about CI that also takes care of deployments. We won't bore you with the exact definition (you can use e.g. [Wikipedia](https://en.wikipedia.org/wiki/Continuous_delivery) or [another Martin Fowler blog post](https://martinfowler.com/bliki/ContinuousDelivery.html)) but in general, we refer to CD as the practice where the main branch is kept deployable at all times. In general, this is also frequently coupled with automated deployments triggered from merges into the main branch.

What about the murky area between CI and CD? If we, for example, have tests that must be run before any new code can be merged to the main branch, is this CI because we're making frequent merges to the main branch, or is it CD because we're making sure that the main branch is always deployable?

So, some concepts frequently cross the line between CI and CD and, as we discussed above, deployment sometimes makes sense to consider CD as part of CI. This is why you'll often see references to CI/CD to describe the entire process. We'll use the terms "CI" and "CI/CD" interchangeably in this part.

There even exists scientific evidence on the numerous benefits the usage of CI/CD has. According to a large study reported in the book Accelerate: The Science of Lean Software and DevOps: Building and Scaling High Performing Technology Organizations, the use of CI/CD correlate heavily with organizational success (e.g. improves profitability and product quality, increases market share, shortens the time to market). CI/CD even makes developers happier by reducing their burnout rate. The results summarized in the book are also reported in scientific articles such as this.

## Why pick one over the other

In general, if you have a small to medium software project that doesn't have any special requirements (e.g. a need for a graphics card to run tests), a cloud-based solution is probably best. The configuration is simple and you don't need to go to the hassle or expense of setting up your own system. For smaller projects especially, this should be cheaper.

For larger projects where more resources are needed or in larger companies where there are multiple teams and projects to take advantage of it, a self-hosted CI setup is probably the way to go.

----

*exercise1*

1. I picked up JavaScript / TypeScript (Node.js ecosystem) for my CI language. Linting can use tools which is ESLint and prettier. Testing with Jest, Building with Vite
2. CircleCI / Travis CI / TeamCity / Bamboo /Spinnaker etc.
3. use GitHub Actions, because we dont have any special requirements,and also a small project,its easy and convineence for team to use. 

# GitHub Actions

GitHub Actions work on a basis of [workflows](https://docs.github.com/en/free-pro-team@latest/actions/learn-github-actions/introduction-to-github-actions#workflows). A workflow is a series of [jobs](https://docs.github.com/en/free-pro-team@latest/actions/learn-github-actions/introduction-to-github-actions#jobs) that are run when a certain triggering [event](https://docs.github.com/en/free-pro-team@latest/actions/learn-github-actions/introduction-to-github-actions#events) happens. The jobs that are run then themselves contain instructions for what GitHub Actions should do.

A typical execution of a workflow looks like this:

- Triggering event happens (for example, there is a push to the main branch).
- The workflow with that trigger is executed.
- Cleanup

In contrast to most projects in this course, the frontend code *does not use* Vite but it has a relatively simple [Webpack](https://fullstackopen.com/en/part7/webpack) configuration that takes care of creating the development environment and creating the production bundle.

For GitHub to recognize your workflows, they must be specified in `.github/workflows` folder in your repository. Each Workflow is its own separate file which needs to be configured using the `YAML` data-serialization language.

YAML is a recursive acronym for "YAML Ain't Markup Language". As the name might hint its goal is to be human-readable and it is commonly used for configuration files. You will notice below that it is indeed very easy to understand!

Notice that indentations are important in YAML. You can learn more about the syntax [here](https://docs.ansible.com/ansible/latest/reference_appendices/YAMLSyntax.html).

A basic workflow contains three elements in a YAML document. These three elements are:

- name: Yep, you guessed it, the name of the workflow
- (on) triggers: The events that trigger the workflow to be executed
- jobs: The separate jobs that the workflow will execute (a basic workflow might contain only one job).

A simple workflow definition looks like this:

```yaml
name: Hello World!

on:
  push:
    branches:
      - main

jobs:
  hello_world_job:
    runs-on: ubuntu-latest
    steps:
      - name: Say hello
        run: |
          echo "Hello World!"
```

---

git config --local --get http.proxy
git config --local --get https.proxy
（两行结果告诉我仓库里有没有特殊代理配置）

您说：
这两没有返回任何内容


ChatGPT 说：
完美 ✅
这说明——

🔹 仓库没有设置任何代理（http.proxy / https.proxy）
🔹 远程地址配置也正确
🔹 只有这个 repo push 会报 “Could not resolve host: github.com”

所以问题非常具体：

Git 在访问这个远程仓库时，系统 DNS 临时无法解析 github.com（或解析超时）。

✅ 一步步解决方案（按推荐顺序）
🥇 方案 1：刷新系统 DNS 缓存（最常见修复）
你之前说 ping github.com 不通，这说明系统层 DNS 出问题。
执行以下命令刷新 DNS：

macOS：
bash
复制代码
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder
Linux：
bash
复制代码
sudo systemd-resolve --flush-caches
刷新后再试：

bash
复制代码
ping github.com
如果能通（显示 IP 地址），再执行：

bash
复制代码
git push
🥈 方案 2：修改 DNS 服务器（彻底修复）
如果刷新仍旧不通，可以直接改成 Google / Cloudflare 的 DNS。

macOS：
系统设置 → 网络 → Wi-Fi → 详情 → DNS → 添加：

复制代码
8.8.8.8
1.1.1.1
保存后重新连接网络，再测试：

bash
复制代码
ping github.com
🥉 方案 3：用 SSH 替代 HTTPS（绕过 DNS 解析异常）
有时候 Git 对 HTTPS 的 DNS 查询缓存有 bug。
可以直接改成 SSH 推送：

bash
复制代码
git remote set-url origin git@github.com:linhaishe/full-stack-open-pokedex.git
再测试：

bash
复制代码
ssh -T git@github.com
出现：

rust
复制代码
Hi linhaishe! You've successfully authenticated...
说明连接成功。

然后你就可以：

bash
复制代码
git push
🪄 可选方案 4：确认不是 LFS（大文件）引起
有些课程仓库（像 full-stack-open）启用了 Git LFS。
可以暂时禁用 LFS：

bash
复制代码
git lfs uninstall
再试一次 push。

🔍 最后说明
你提到：

其他仓库可以正常 push。

这其实符合一个典型场景：

某次网络断开时 push 失败，Git 的 curl DNS 缓存坏了。

之后同一 URL（linhaishe/full-stack-open-pokedex.git）继续访问都超时。

通过 刷新 DNS 或 切换 SSH 通常能立刻恢复。

如果你希望我帮你挑最稳妥的一步（比如不用动系统设置），可以告诉我你当前的系统类型（macOS / Windows / Linux），我给你写一组“只执行这一条就修好”的命令。
👉 你现在是在哪个系统上操作的？

### What does a good deployment system do?

Defining definitive rules or requirements for a deployment system is difficult, let's try anyway:

- Our deployment system should be able to fail gracefully at **any** step of the deployment.
- Our deployment system should **never** leave our software in a broken state.
- Our deployment system should let us know when a failure has happened. It's more important to notify about failure than about success.
- Our deployment system should allow us to roll back to a previous deployment
  - Preferably this rollback should be easier to do and less prone to failure than a full deployment
  - Of course, the best option would be an automatic rollback in case of deployment failures
- Our deployment system should handle the situation where a user makes an HTTP request just before/during a deployment.
- Our deployment system should make sure that the software we are deploying meets the requirements we have set for this (e.g. don't deploy if tests haven't been run).

**Deployment with custom action**

Go to GitHub Actions [marketplace](https://github.com/marketplace) and search for action for our purposes. You might search with *render deploy*. There are several actions to choose from. You can pick any. Quite often the best choice is the one with the most stars. It is also a good idea to look if the action is actively maintained (time of the last release) and does it have many open issues or pull requests.

**Warning**: for some reason, the most starred option [render-action](https://github.com/Bounceapp/render-action) was very unreliable when the part was updated (16th Jan 2024), so better avoid that. If you end up with too much problems, the deploy hook might be a better option!

Set up the action to your workflow and ensure that every commit that passes all the checks results in a new deployment. Note that you need Render API key and the app service id for the deployment. See [here](https://render.com/docs/api) how the API key is generated. You can get the service id from the URL of the Render dashboard of your app. The end of the URL (starting with *srv-*) is the id:

## [Working with Pull Requests](https://fullstackopen.com/en/part11/keeping_green#working-with-pull-requests)

So let us change events that [trigger](https://docs.github.com/en/free-pro-team@latest/actions/reference/events-that-trigger-workflows) of the workflow as follows:

```yml
on:
  push:
    branches:
      - main
  pull_request:    branches: [main]    types: [opened, synchronize]copy
```

All the workflows we looked at so far were triggered by commits to the main branch. To make the workflow run for each pull request we would have to update the trigger part of the workflow. We use the "pull_request" trigger for branch "main" (our main branch) and limit the trigger to events "opened" and "synchronize". Basically, this means, that the workflow will run when a PR into the main branch is opened or updated.


All looks good, but there is actually a pretty serious problem with the current workflow. All the steps, including the deployment, are run also for pull requests. This is surely something we do not want!

Fortunately, there is an easy solution for the problem! We can add an [if](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepsif) condition to the deployment step, which ensures that the step is executed only when the code is being merged or pushed to the main branch.

The workflow [context](https://docs.github.com/en/free-pro-team@latest/actions/reference/context-and-expression-syntax-for-github-actions#contexts) gives various kinds of information about the code the workflow is run.

The relevant information is found in [GitHub context](https://docs.github.com/en/actions/learn-github-actions/contexts#github-context), the field *event_name* tells us what is the "name" of the event that triggered the workflow. When a pull request is merged, the name of the event is somehow paradoxically *push*, the same event that happens when pushing the code to the repository. Thus, we get the desired behavior by adding the following condition to the step that deploys the code:

```js
if: ${{ github.event_name == 'push' }}
```

我已经设置github的secrets了      # ✅ Render deployment — only when pushing to main      - name: Check secrets presence        run: |          if [ -z "${{ secrets.RENDER_SERVICE_ID }}" ]; then            echo "❌ Missing RENDER_SERVICE_ID"            exit 1          fi          if [ -z "${{ secrets.RENDER_API_KEY }}" ]; then            echo "❌ Missing RENDER_API_KEY"            exit 1          fi          echo "✅ All secrets present." 还是报错missing

###### ChatGPT 说：

啊，这种情况说明 **GitHub Actions 里访问 secrets 的方式出了问题**，通常原因有几个常见点：

------

## 1️⃣ Secrets 名称不匹配

- GitHub Actions 对 secret 名称是 **严格大小写敏感**的。
- 你的 workflow 用的是 `${{ secrets.RENDER_SERVICE_ID }}` 和 `${{ secrets.RENDER_API_KEY }}`。
- 去 **Settings → Secrets and variables → Actions** 检查：
  - 名称必须完全一致；
  - 没有多余空格或隐藏字符；
  - 例如不要写成 `RENDER_SERVICEID` 或 `render_service_id`。

------

## 2️⃣ Secrets 作用域不对

- 如果你的 workflow 在 **fork 的仓库**或 PR 上跑，**默认情况下 secrets 是不可用的**。
- 例如：
  - PR 来源 fork 的仓库 → secrets **不可用**（安全策略）。
  - 直接 push 到 main 分支 → secrets 可用。
- 解决：
  - 在测试阶段直接 push 到你的仓库 main 分支或者临时分支。

------

## 3️⃣ shell 的展开方式

你的写法：

```
if [ -z "${{ secrets.RENDER_SERVICE_ID }}" ]; then
```

在 GitHub Actions 中是正确的，一般不会出问题，但可以尝试 **用 `echo` 打印长度** 做调试（注意不要泄露真实 secret）：

```
- name: Check secrets presence
  run: |
    echo "Length of serviceId secret: ${#{{ secrets.RENDER_SERVICE_ID }}}"
    echo "Length of apiKey secret: ${#{{ secrets.RENDER_API_KEY }}}"
```

⚠️ 这个只是调试长度，不打印实际值。

------

## 4️⃣ 建议排查步骤

1. 确认仓库 Secrets 名称完全匹配；
2. 确认 workflow 是在 **同一个仓库的 push** 触发，而不是 fork PR；
3. 确认 workflow 没有拼写错误，缩进正确；
4. 如果仍然报错，可以临时测试用一个 dummy secret 验证 `${{ secrets.TEST_SECRET }}` 能否被访问。

------

💡 总结：

> “missing” 错误几乎总是 **secret 根本没在当前 workflow 环境里可用**，不是脚本问题。
>  所以主要排查 **名称和触发事件（push/PR/fork）**。

------

我可以帮你写一个 **最小可复现的测试步骤**，专门验证 GitHub Actions 能读取 Render secret，确认 workflow 正确。
 你希望我写吗？

### Versioning

The most important purpose of versioning is to uniquely identify the software we're running and the code associated with it.

The ordering of versions is also an important piece of information. For example, if the current release has broken critical functionality and we need to identify the *previous version* of the software so that we can roll back the release back to a stable state.

#### Semantic Versioning and Hash Versioning

How an application is versioned is sometimes called a versioning strategy. We'll look at and compare two such strategies.

The first one is [semantic versioning](https://semver.org/), where a version is in the form `{major}.{minor}.{patch}`. For example, if the version is `1.2.3`, it has `1` as the major version, `2` is the minor version, and `3` is the patch version.

In general, changes that fix the functionality without changing how the application works from the outside are `patch` changes, changes that make small changes to functionality (as viewed from the outside) are `minor` changes and changes that completely change the application (or major functionality changes) are `major` changes. The definitions of each of these terms can vary from project to project.

For example, npm-libraries are following the semantic versioning. At the time of writing this text (16th March 2023) the most recent version of React is [18.2.0](https://reactjs.org/versions/), so the major version is 18 and the minor version is 2.

*Hash versioning* (also sometimes known as SHA versioning) is quite different. The version "number" in hash versioning is a hash (that looks like a random string) derived from the contents of the repository and the changes introduced in the commit that created the version. In Git, this is already done for you as the commit hash that is unique for any change set.

Hash versioning is almost always used in conjunction with automation. It's a pain (and error-prone) to copy 32 character long version numbers around to make sure that everything is correctly deployed.

#### But what does the version point to?

Determining what code belongs to a given version is important and the way this is achieved is again quite different between semantic and hash versioning. In hash versioning (at least in Git) it's as simple as looking up the commit based on the hash. This will let us know exactly what code is deployed with a specific version.

It's a little more complicated when using semantic versioning and there are several ways to approach the problem. These boil down to three possible approaches: something in the code itself, something in the repo or repo metadata, something completely outside the repo.

While we won't cover the last option on the list (since that's a rabbit hole all on its own), it's worth mentioning that this can be as simple as a spreadsheet that lists the Semantic Version and the commit it points to.

For the two repository based approaches, the approach with something in the code usually boils down to a version number in a file and the repo/metadata approach usually relies on [tags](https://www.atlassian.com/git/tutorials/inspecting-a-repository/git-tag) or (in the case of GitHub) releases. In the case of tags or releases, this is relatively simple, the tag or release points to a commit, the code in that commit is the code in the release.

#### Version order

In semantic versioning, even if we have version bumps of different types (major, minor, or patch) it's still quite easy to put the releases in order: 1.3.7 comes before 2.0.0 which itself comes before 2.1.5 which comes before 2.2.0. A list of releases (conveniently provided by a package manager or GitHub) is still needed to know what the last version is but it's easier to look at that list and discuss it: It's easier to say "We need to roll back to 3.2.4" than to try communicate a hash in person.

That's not to say that hashes are inconvenient: if you know which commit caused the particular problem, it's easy enough to look back through a Git history and get the hash of the previous commit. But if you have two hashes, say `d052aa41edfb4a7671c974c5901f4abe1c2db071` and `12c6f6738a18154cb1cef7cf0607a681f72eaff3`, you really can not say which came earlier in history, you need something more, such as the Git log that reveals the ordering.

#### Comparing the Two

We've already touched on some of the advantages and disadvantages of the two versioning methods discussed above but it's perhaps useful to address where they'd each likely be used.

Semantic Versioning works well when deploying services where the version number could be of significance or might actually be looked at. As an example, think of the JavaScript libraries that you're using. If you're using version 3.4.6 of a particular library, and there's an update available to 3.4.8, if the library uses semantic versioning, you could (hopefully) safely assume that you're ok to upgrade without breaking anything. If the version jumps to 4.0.1 then maybe it's not such a safe upgrade.

Hash versioning is very useful where most commits are being built into artifacts (e.g. runnable binaries or Docker images) that are themselves uploaded or stored. As an example, if your testing requires building your package into an artifact, uploading it to a server, and running tests against it, it would be convenient to have hash versioning as it would prevent accidents.

As an example think that you're working on version 3.2.2 and you have a failing test, you fix the failure and push the commit but as you're working in your branch, you're not going to update the version number. Without hash versioning, the artifact name may not change. If there's an error in uploading the artifact, maybe the tests run again with the older artifact (since it's still there and has the same name) and you get the wrong test results. If the artifact is versioned with the hash, then the version number *must* change on every commit and this means that if the upload fails, there will be an error since the artifact you told the tests to run against does not exist.

Having an error happen when something goes wrong is almost always preferable to having a problem silently ignored in CI.

#### Best of Both Worlds

From the comparison above, it would seem that the semantic versioning makes sense for releasing software while hash-based versioning (or artifact naming) makes more sense during development. This doesn't necessarily cause a conflict.

Think of it this way: versioning boils down to a technique that points to a specific commit and says "We'll give this point a name, it's name will be 3.5.5". Nothing is preventing us from also referring to the same commit by its hash.

There is a catch. We discussed at the beginning of this part that we always have to know exactly what is happening with our code, for example, we need to be sure that we have tested the code we want to deploy. Having two parallel versioning (or naming) conventions can make this a little more difficult.

For example, when we have a project that uses hash-based artifact builds for testing, it's always possible to track the result of every build, lint, and test to a specific commit and developers know the state their code is in. This is all automated and transparent to the developers. They never need to be aware of the fact that the CI system is using the commit hash underneath to name build and test artifacts. When the developers merge their code to the main branch, again the CI takes over. This time, it will build and test all the code and give it a semantic version number all in one go. It attaches the version number to the relevant commit with a Git tag.

In the case above, the software we release is tested because the CI system makes sure that tests are run on the code it is about to tag. It would not be incorrect to say that the project uses semantic versioning and simply ignore that the CI system tests individual developer branches/PRs with a hash-based naming system. We do this because the version we care about (the one that is released) is given a semantic version.

Let's extend our workflow so that it will automatically increase (bump) the version when a pull request is merged into the main branch and [tag](https://www.atlassian.com/git/tutorials/inspecting-a-repository/git-tag) the release with the version number. We will use an open source action developed by a third party: [anothrNick/github-tag-action](https://github.com/anothrNick/github-tag-action).

