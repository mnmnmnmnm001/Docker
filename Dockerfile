# FROM mcr.microsoft.com/dotnet/sdk:9.0 AS builder
# WORKDIR /app

# COPY . .

# RUN dotnet restore
# RUN dotnet publish -c Release -o /app/publish

# FROM mcr.microsoft.com/dotnet/aspnet:9.0
# WORKDIR /app

# COPY --from=builder /app/publish .

# EXPOSE 80

# ENTRYPOINT ["dotnet", "SchoolMangement.dll"]

#V2
# FROM mcr.microsoft.com/dotnet/sdk:8.0 AS builder
# WORKDIR /app

# COPY SchoolManagement/ .

# RUN dotnet restore
# RUN dotnet publish -c Release -o /app/publish

# FROM mcr.microsoft.com/dotnet/aspnet:8.0
# WORKDIR /app

# COPY --from=builder /app/publish .

# EXPOSE 80

# ENTRYPOINT ["dotnet", "SchoolMangement.dll"]


#V3

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["SchoolManagement/SchoolManagement.csproj", "SchoolManagement/"]
RUN dotnet restore "SchoolManagement/SchoolManagement.csproj"

COPY . .
WORKDIR "/src/SchoolManagement"
RUN dotnet build "SchoolManagement.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "SchoolManagement.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SchoolManagement.dll"]
