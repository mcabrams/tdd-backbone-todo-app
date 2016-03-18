FROM node:argon

# Create app directory
RUN mkdir -p /app

# Add node modules to path
ENV PATH $PATH:/backbone/node_modules/.bin

RUN \
      apt-get update && \
      apt-get install -y python python-pip

# Install python dependencies
RUN pip install -r /app/requirements.txt

WORKDIR /backbone
CMD ["node", "app.js"]
