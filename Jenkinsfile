if(version != "latest") {
    currentBuild.displayName = version
}
currentBuild.description = "docker tag ${version} build ${currentBuild.number}"
pipeline {
    agent any
    parameters {
        string(name: 'version', defaultValue: 'latest', description: '')
    }
    stages {
        stage('Build') {
            steps {
                sshPublisher(publishers: [sshPublisherDesc(configName: '192.168.1.9', transfers: [sshTransfer(excludes: '', execCommand: '''
                   echo version $version
                   cd /jenkins/workspace/客户中心网站/vuejs
                   cnpm i
                   npm run build

                   cd /jenkins/workspace/客户中心网站/web
                   cnpm i

                   docker build -t 119.84.60.141:5000/crm-web:latest .
                   docker build -t 119.84.60.141:5000/crm-web:$SVN_REVISION_1-$SVN_REVISION_2 .

                   docker push 119.84.60.141:5000/crm-web:latest
                   docker push 119.84.60.141:5000crm-web:$SVN_REVISION_1-$SVN_REVISION_2

                   docker rmi 119.84.60.141:5000/crm-web:latest
                   docker rmi 119.84.60.141:5000/crm-web:$SVN_REVISION_1-$SVN_REVISION_2

                   echo 'ok'

''', execTimeout: 1200000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])

            }
        }
    }
}