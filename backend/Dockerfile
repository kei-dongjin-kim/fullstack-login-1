FROM gradle:8.7.0-jdk21 as build
WORKDIR /app
COPY . .
RUN gradle clean build --no-daemon -x test --warning-mode all

FROM eclipse-temurin:21
RUN mkdir /opt/app
COPY --from=build /app/build/libs/myproject-0.0.1-SNAPSHOT.jar /opt/app
CMD ["java", "-jar", "/opt/app/myproject-0.0.1-SNAPSHOT.jar"]
