FROM node:argon

# Create backbone directory
RUN mkdir -p /backbone
WORKDIR /backbone
EXPOSE 8082
