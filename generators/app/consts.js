const ENUMS = require('./enums');

module.exports = {
    // Repos
    REPO_MS_DOTNET_SIX: 'https://github.com/zeroslope-arch/zeroslope-dotnet-6',
    REPO_MS_DOTNET_CORE: 'https://github.com/zeroslope-arch/zeroslope-dotnet-6',
    REPO_SL_DOTNET_CORE: 'https://github.com/zeroslope-arch/zeroslope-dotnet-serverless',
    REPO_MS_NODE: 'https://github.com/zeroslope-arch/zeroslope-node',
    REPO_MS_GOLANG: 'https://github.com/zeroslope-arch/zeroslope-golang',
    REPO_MS_JAVA: 'https://github.com/zeroslope-arch/zeroslope-java',
    REPO_SL_NODE: 'https://github.com/zeroslope-arch/zeroslope-node-serverless',
    REPO_FE_NEXTJS: 'https://github.com/zeroslope-arch/zeroslope-nextjs-react-typescript-scss',
    REPO_FE_REACT: 'https://github.com/zeroslope-arch/zeroslope-react',
    REPO_FE_ANGULAR: 'https://github.com/zeroslope-arch/zeroslope-angular',
    // Options
    OPTIONS_BACKEND: [
        ENUMS.NODE, 
        ENUMS.DOTNET_SIX, 
        ENUMS.DOTNET_CORE, 
        ENUMS.GOLANG, 
        ENUMS.JAVA, 
        ENUMS.NONE
    ],
    OPTIONS_FRONTEND: [
        ENUMS.NEXTJS, 
        ENUMS.REACT, 
        ENUMS.ANGULAR, 
        ENUMS.NONE
    ],
    OPTIONS_CLOUDPROVIDER: [
        ENUMS.AWS, 
        ENUMS.AZURE, 
        ENUMS.GCP, 
        ENUMS.NONE
    ],
    OPTIONS_MONOREPO: [
        ENUMS.MONOREPO, 
        ENUMS.REPOPERPROJECT
    ],
    OPTIONS_ARCHITECTURE: [
        ENUMS.SERVERLESS, 
        ENUMS.MICROSERVICES
    ],
    // Defaults
    DEFAULT_PROJECTNAME: 'Sample Project',
    DEFAULT_BACKEND: ENUMS.DOTNET,
    DEFAULT_FRONTEND: ENUMS.NEXTJS,
    DEFAULT_MONOREPO: ENUMS.MONOREPO,
    DEFAULT_CLOUDPROVIDER: ENUMS.AWS,
    DEFAULT_ARCHITECTURE: ENUMS.MICROSERVICES,
    
}