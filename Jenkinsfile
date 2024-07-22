pipeline {
    agent any
    environment {
        REGISTRY = 'registry.ekbana.net'
        HARBOR_NAMESPACE = "avalon"
        HARBOR_CREDENTIAL = credentials('avalon')
        APP_NAME = "avalon-frontend-cms"
        DIR_NAME = getDirName(env.BRANCH_NAME)
        SERVER_IP = getServerIp(env.BRANCH_NAME)
    }
    stages {
        stage('get_commit_msg') {
            steps {
              script {
                notifyStarted()
                passedBuilds = []
                lastSuccessfulBuild(passedBuilds, currentBuild);
                env.changeLog = getChangeLog(passedBuilds)
                echo "changeLog \n${env.changeLog}"
              }
            }
        }
        stage("Checkout code") {
            steps {
                checkout scm
            }
        }
        stage("Build image") {
            steps {
                sh 'docker build -t $REGISTRY/$HARBOR_NAMESPACE/$APP_NAME:SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER .'
            }
        }
        stage("Harbor login & Push image") {
            steps {
                sh '''echo $HARBOR_CREDENTIAL_PSW | docker login $REGISTRY -u 'robot$avalon' --password-stdin'''
                sh 'docker push  $REGISTRY/$HARBOR_NAMESPACE/$APP_NAME:SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER'
                sh 'docker rmi $REGISTRY/$HARBOR_NAMESPACE/$APP_NAME:SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER'
            }
        }
        stage('Deploy to live server') {
            steps{
              script {
                sshagent(['72c3455a-de8d-4b39-9f02-771ddb2fdf00']) {
                sh '''
                ssh -tt -o StrictHostKeyChecking=no root@$SERVER_IP -p 3030 << EOF
                cd $DIR_NAME; \
                echo "$HARBOR_CREDENTIAL_PSW" | docker login $REGISTRY -u 'robot$avalon' --password-stdin; \
                docker pull $REGISTRY/$HARBOR_NAMESPACE/$APP_NAME:SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER
                BUILD_NUMBER=$BUILD_NUMBER docker-compose -f docker-compose.yml up -d --build; \
                docker image prune -a -f; \
                exit
            EOF '''
              }
            }
          }    
        }
      }

    post{
      success{
        //script {
          //if (env.BRANCH_NAME == 'dev' || env.BRANCH_NAME == 'qa' || env.BRANCH_NAME == 'uat' )
            notifySuccessful()
        //}
      }
      failure{
        notifyFailed()
      }
    }
}

def notifyStarted() {
mattermostSend (
  color: "#2A42EE",
  channel: 'avalon-jenkins',
  endpoint: 'https://ekbana.letsperk.com/hooks/pmtfnk3agtd89yo3juq3nnojby',
  message: "Build STARTED: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>)"
  )
}


def notifySuccessful() {
mattermostSend (
  color: "#00f514",
  channel: 'avalon-jenkins',
  endpoint: 'https://ekbana.letsperk.com/hooks/pmtfnk3agtd89yo3juq3nnojby',
  message: "Build SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>):\n${changeLog}"
  )
}

def notifyFailed() {
mattermostSend (
  color: "#e00707",
  channel: 'avalon-jenkins',
  endpoint: 'https://ekbana.letsperk.com/hooks/pmtfnk3agtd89yo3juq3nnojby',
  message: "Build FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>)"
  )
}
def lastSuccessfulBuild(passedBuilds, build) {
  if ((build != null) && (build.result != 'SUCCESS')) {
      passedBuilds.add(build)
      lastSuccessfulBuild(passedBuilds, build.getPreviousBuild())
   }
}

@NonCPS
def getChangeLog(passedBuilds) {
    def log = ""
    for (int x = 0; x < passedBuilds.size(); x++) {
        def currentBuild = passedBuilds[x];
        def changeLogSets = currentBuild.changeSets
        for (int i = 0; i < changeLogSets.size(); i++) {
            def entries = changeLogSets[i].items
            for (int j = 0; j < entries.length; j++) {
                def entry = entries[j]
                log += "* ${entry.msg} by ${entry.author} \n"
            }
        }
    }
    return log;
  }

//Getting branch name for respective branches
def getDirName(branchName) {
    if("dev".equals(branchName)) {
        return "/var/www/avalon-dev/fe-cms/";
    } else if ("qa".equals(branchName)) {
        return "/var/www/avalon-qa/fe-cms/";
    } else if ("uat".equals(branchName)) {
        return "/var/www/avalon-uat/fe-cms/";
    } else {
        return "/var/www/avalon-live/live/";
    }
}

def getServerIp(branchName) {
    if("dev".equals(branchName)) {
        return "167.172.138.22";
    } else if("qa".equals(branchName)) {
        return "184.72.206.160";
    } else if("uat".equals(branchName)) {
        return "34.207.13.34";
    } else {
        return "34.207.13.34";
    }
}

