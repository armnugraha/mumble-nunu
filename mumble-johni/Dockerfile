FROM alpine:3.14

# Install dependencies and create user directories
RUN apk add --no-cache git tini python3 python3-dev curl && \
    apk add --no-cache --virtual .build-deps build-base && \
    adduser -D -g 1001 -u 1001 -h /home/node node && \
    mkdir -p /home/node && \
    mkdir -p /home/node/.npm-global && \
    mkdir -p /home/node/app && \
    chown -R node: /home/node

# Install Node.js and npm from Alpine repositories
RUN apk add --no-cache nodejs npm && \
    npm install -g npm@6.14.15

# Install websockify using pip
RUN python3 -m ensurepip && \
    pip3 install --no-cache --upgrade pip && \
    pip3 install websockify

# Create the symbolic link with root permissions
RUN ln -sf /usr/bin/python3 /usr/bin/python

USER node
WORKDIR /home/node/app

# Copy the application files
COPY . .

# Set npm to use the global directory
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

# Install npm dependencies and build the application
RUN npm install && \
    npm run build

# Expose the port for websockify
EXPOSE 8080

# Set environment variable for Mumble server
ENV MUMBLE_SERVER=mumble.aventer.biz:64738

# Entry point command
ENTRYPOINT ["/sbin/tini", "--"]

# Command to start websockify
CMD ["websockify", "8080", "mumble.aventer.biz:64738"]
