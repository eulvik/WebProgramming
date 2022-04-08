FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["NewContainerApi/NewContainerApi.csproj", "NewContainerApi/"]
RUN dotnet restore "NewContainerApi/NewContainerApi.csproj"
COPY . .
WORKDIR "/src/NewContainerApi"
RUN dotnet build "NewContainerApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "NewContainerApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "NewContainerApi.dll"]
