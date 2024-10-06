FROM debian:bullseye-20230411-slim
ARG NODE_VERSION=node_20.x
ARG PNPM_VERSION=8.15.7
RUN apt-get update -y && \
    apt-get install -y curl git unzip gnupg2 && \
    # 日本語化
    apt-get install -y locales && \
    sed -i -E 's/# (ja_JP.UTF-8)/\1/' /etc/locale.gen && \
    locale-gen
ENV LC_ALL ja_JP.UTF-8
    # jqインストール
RUN apt-get install -y jq
    # nodejsインストール
ENV NODE_VERSION="${NODE_VERSION}"
ENV NODE_KEYRING=/usr/share/keyrings/nodesource.gpg
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource.gpg.key | gpg --dearmor | tee "${NODE_KEYRING}" >/dev/null
RUN gpg --no-default-keyring --keyring "${NODE_KEYRING}" --list-keys
RUN chmod a+r "${NODE_KEYRING}"
RUN . /etc/os-release && \
    DISTRO="${VERSION_CODENAME}" && \
    echo "deb [signed-by=${NODE_KEYRING}] https://deb.nodesource.com/${NODE_VERSION} ${DISTRO} main" | tee /etc/apt/sources.list.d/nodesource.list && \
    echo "deb-src [signed-by=${NODE_KEYRING}] https://deb.nodesource.com/${NODE_VERSION} ${DISTRO} main" | tee -a /etc/apt/sources.list.d/nodesource.list
RUN apt-get update -y && \
    apt-get install -y nodejs
    # pnpmインストール
ENV PNPM_HOME=/opt/pnpm
ENV PATH="${PNPM_HOME}:${PATH}"
ENV PNPM_VERSION="${PNPM_VERSION}"
RUN mkdir -p "${PNPM_HOME}" && \
    curl -fsSL https://get.pnpm.io/install.sh | ENV="$HOME/.bashrc" SHELL="$(which bash)" bash -
