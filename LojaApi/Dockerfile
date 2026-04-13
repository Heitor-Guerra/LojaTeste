FROM openjdk:25-ea-jdk-oracle AS build

COPY target/*.jar /app/app.jar

WORKDIR /app

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

