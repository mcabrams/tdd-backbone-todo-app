FROM node:argon

# Create backbone directory
RUN mkdir -p /backbone
WORKDIR /backbone
EXPOSE 8082

# Add node modules to path
ENV PATH $PATH:/backbone/node_modules/.bin
